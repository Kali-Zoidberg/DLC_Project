import React from 'react';
import * as d3 from 'd3';
class BarChartRaceComp extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.data = require('../resources/data.json');
        this.names = require('../resources/names.json');
        this.n=12;
        this.k=10;
        this.keyframes = require('../resources/keyframes.json');
        this.datevalues = Array.from(d3.rollup(this.dataset, ([d]) => d.value, d => +d.date, d => d.name))
            .map(([date, data]) => [new Date(date), data])
            .sort(([a], [b]) => d3.ascending(a, b));
        console.log(this.datevalues);
        this.nameframes = d3.groups(this.keyframes.flatMap(([, data]) => data), d => d.name);
        this.prev = new Map(this.nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
        this.next = new Map(this.nameframes.flatMap(([, data]) => d3.pairs(data)));
        console.log(this.nameframes);
        this.barSize = 48;
        this.margin = ({top: 16, right: 6, bottom: 6, left: 0});
        this.height = this.margin.top + this.barSize * this.n + this.margin.bottom;
        this.x = d3.scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right])
        this.y = d3.scaleBand()
            .domain(d3.range(n + 1))
            .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
            .padding(0.1);
    }

    rank(value) {
        const data = Array.from(this.names, name => ({name, value: value(name)}));
        data.sort((a, b) => d3.descending(a.value, b.value));
        for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i);
        return data;
    }

    keyframes() {
        const keyframes = [];
        let ka, a, kb, b;
        for ([[ka, a], [kb, b]] of d3.pairs(this.datevalues)) {
            for (let i = 0; i < this.k; ++i) {
                const t = i / this.k;
                keyframes.push([
                    new Date(ka * (1 - t) + kb * t),
                    rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
                ]);
            }
        }
        keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
        return keyframes;
    }

    async *Chart() {

        const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

        const updateBars = bars(svg);
        const updateAxis = axis(svg);
        const updateLabels = labels(svg);
        const updateTicker = ticker(svg);

        yield svg.node();

        for (const keyframe of keyframes) {
            const transition = svg.transition()
                .duration(duration)
                .ease(d3.easeLinear);

            // Extract the top bar’s value.
            x.domain([0, keyframe[1][0].value]);

            updateAxis(keyframe, transition);
            updateBars(keyframe, transition);
            updateLabels(keyframe, transition);
            updateTicker(keyframe, transition);

            invalidation.then(() => svg.interrupt());
            await transition.end();

        }

    }

    bars(svg) {
        let bar = svg.append("g")
            .attr("fill-opacity", 0.6)
            .selectAll("rect");

        return ([date, data], transition) => bar = bar
            .data(data.slice(0, this.n), d => d.name)
            .join(
                enter => enter.append("rect")
                    .attr("fill", this.color)
                    .attr("height", this.y.bandwidth())
                    .attr("x", this.x(0))
                    .attr("y", d => this.y((this.prev.get(d) || d).rank))
                    .attr("width", d => this.x((this.prev.get(d) || d).value) - this.x(0)),
                update => update,
                exit => exit.transition(transition).remove()
                    .attr("y", d => this.y((this.next.get(d) || d).rank))
                    .attr("width", d => this.x((this.next.get(d) || d).value) - this.x(0))
            )
            .call(bar => bar.transition(transition)
                .attr("y", d => this.y(d.rank))
                .attr("width", d => this.x(d.value) - this.x(0)));
    }

    labels(svg) {
        let label = svg.append("g")
            .style("font", "bold 12px var(--sans-serif)")
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .selectAll("text");

        return ([date, data], transition) => label = label
            .data(data.slice(0, n), d => d.name)
            .join(
                enter => enter.append("text")
                    .attr("transform", d => `translate(${this.x((this.prev.get(d) || d).value)},${this.y((this.prev.get(d) || d).rank)})`)
                    .attr("y", this.y.bandwidth() / 2)
                    .attr("x", -6)
                    .attr("dy", "-0.25em")
                    .text(d => d.name)
                    .call(text => text.append("tspan")
                        .attr("fill-opacity", 0.7)
                        .attr("font-weight", "normal")
                        .attr("x", -6)
                        .attr("dy", "1.15em")),
                update => update,
                exit => exit.transition(transition).remove()
                    .attr("transform", d => `translate(${this.x((this.next.get(d) || d).value)},${this.y((this.next.get(d) || d).rank)})`)
                    .call(g => g.select("tspan").tween("text", d => this.textTween(d.value, (this.next.get(d) || d).value)))
            )
            .call(bar => bar.transition(transition)
                .attr("transform", d => `translate(${this.x(d.value)},${this.y(d.rank)})`)
                .call(g => g.select("tspan").tween("text", d => this.textTween((this.prev.get(d) || d).value, d.value))));
    }

    axis(svg) {
        const g = svg.append("g")
            .attr("transform", `translate(0,${this.margin.top})`);

        const axis = d3.axisTop(x)
            .ticks(width / 160)
            .tickSizeOuter(0)
            .tickSizeInner(-this.barSize * (this.n + this.y.padding()));

        return (_, transition) => {
            g.transition(transition).call(axis);
            g.select(".tick:first-of-type text").remove();
            g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
            g.select(".domain").remove();
        };
    }

    ticker(svg) {
        const _this = this;
        const now = svg.append("text")
            .style("font", `bold ${this.barSize}px var(--sans-serif)`)
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .attr("x", this.width - 6)
            .attr("y", this.margin.top + this.barSize * (this.n - 0.45))
            .attr("dy", "0.32em")
            .text(_this.formatDate(_this.keyframes[0][0]));

        return ([date], transition) => {
            transition.end().then(() => now.text(_this.formatDate(date)));
        };
    }

    color() {
        const scale = d3.scaleOrdinal(d3.schemeTableau10);
        if (data.some(d => d.category !== undefined)) {
            const categoryByName = new Map(data.map(d => [d.name, d.category]))
            scale.domain(Array.from(categoryByName.values()));
            return d => scale(categoryByName.get(d.name));
        }
        return d => scale(d.name);
    }


    formatDate() {

        return d3.utcFormat("%Y")
    }
    formatNumber() {
        return d3.format(",d");
    }

    textTween(a, b) {
        const _this = this;
        const i = d3.interpolateNumber(a, b);
        return function(t) {
            this.textContent = _this.formatNumber(i(t));
        };
    }



    componentDidMount() {
        let size = 500;
        // d3.select(this.myRef.current)
        //     .append('p')
        //     .text("Hello World");
    }

    render() {
        const alphabet = [{"letter": "A", "frequency": 0.08167}, {"letter": "B", "frequency": 0.01492}, {
            "letter": "C",
            "frequency": 0.02782
        }, {"letter": "D", "frequency": 0.04253}, {"letter": "E", "frequency": 0.12702}, {
            "letter": "F",
            "frequency": 0.02288
        }, {"letter": "G", "frequency": 0.02015}, {"letter": "H", "frequency": 0.06094}, {
            "letter": "I",
            "frequency": 0.06966
        }, {"letter": "J", "frequency": 0.00153}, {"letter": "K", "frequency": 0.00772}, {
            "letter": "L",
            "frequency": 0.04025
        }, {"letter": "M", "frequency": 0.02406}, {"letter": "N", "frequency": 0.06749}, {
            "letter": "O",
            "frequency": 0.07507
        }, {"letter": "P", "frequency": 0.01929}, {"letter": "Q", "frequency": 0.00095}, {
            "letter": "R",
            "frequency": 0.05987
        }, {"letter": "S", "frequency": 0.06327}, {"letter": "T", "frequency": 0.09056}, {
            "letter": "U",
            "frequency": 0.02758
        }, {"letter": "V", "frequency": 0.00978}, {"letter": "W", "frequency": 0.0236}, {
            "letter": "X",
            "frequency": 0.0015
        }, {"letter": "Y", "frequency": 0.01974}, {"letter": "Z", "frequency": 0.00074}];

        //Ideally, we want to return the chart without the svg and append it manually.
        const chart = this.BarChart(alphabet, {
            x: d => d.letter,
            y: d => d.frequency,
            yFormat: "%",
            yLabel: "↑ Frequency",
            width: 1000,
            height: 500,
            color: "steelblue",
            duration: 750 // slow transition for demonstration
        });

        return (
            <div ref={this.myRef}>
            </div>
        )
    }
}
export default BarChartComp;