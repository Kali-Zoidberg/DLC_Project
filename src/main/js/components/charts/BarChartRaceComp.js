import data from '../resources/data.js';
import names from '../resources/names.js';
import keyframes from '../resources/keyframes.js';
import 'regenerator-runtime/runtime';
import React from 'react';
import * as d3 from 'd3';

class BarChartRaceComp extends React.Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.width = 1000;
        this.myRef = React.createRef();
        this.data = data;
        this.names = names;
        this.n=12;
        this.k=10;
        this.duration = 30;
        this.keyframes = keyframes;
        console.log(this.keyframes);
        this.datevalues = Array.from(d3.rollup(this.data, ([d]) => d.value, d => +d.date, d => d.name))
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
            .domain(d3.range(this.n + 1))
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
                    this.rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
                ]);
            }
        }
        keyframes.push([new Date(kb), this.rank(name => b.get(name) || 0)]);
        return keyframes;
    }

    async animateChart(svg) {
        const updateBars = this.bars(svg);
        const updateAxis = this.axis(svg);
        const updateLabels = this.labels(svg);
        const updateTicker = this.ticker(svg);

        for (const keyframe of this.keyframes) {
            const transition = svg.transition()
                .duration(this.duration)
                .ease(d3.easeLinear);

            // Extract the top bar’s value.
            this.x.domain([0, keyframe[1][0].value]);

            updateAxis(keyframe, transition);
            updateBars(keyframe, transition);
            updateLabels(keyframe, transition);
            updateTicker(keyframe, transition);

            //
            // invalidation.then(() => svg.interrupt());
            await transition.end();

        }
    }

    chart() {

        console.log("hello world");
        console.log(this.width);
        console.log(this.height);
        const svg = d3.select(this.myRef.current).append("svg")
            .attr("viewBox", [0, 0, this.width, this.height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


        return svg;


    }

    bars(svg) {

        let bar = svg.append("g")
            .attr("fill-opacity", 0.6)
            .selectAll("rect");

        return ([date, data], transition) => bar = bar
            .data(data.slice(0, this.n), d => d.name)
            .join(
                enter => enter.append("rect")
                    .attr("fill", this.color(this.data))
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
            .data(data.slice(0, this.n), d => d.name)
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

        const axis = d3.axisTop(this.x)
            .ticks(this.width / 160)
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
        const now = svg.append("text")
            .style("font", `bold ${this.barSize}px var(--sans-serif)`)
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .attr("x", this.width - 6)
            .attr("y", this.margin.top + this.barSize * (this.n - 0.45))
            .attr("dy", "0.32em")
            .text(this.formatDate(this.keyframes[0][0]));

        return ([date], transition) => {
            transition.end().then(() => now.text(this.formatDate(date)));
        };
    }

    color(data) {
        const scale = d3.scaleOrdinal(d3.schemeTableau10);
        if (data.some(d => d.category !== undefined)) {
            const categoryByName = new Map(data.map(d => [d.name, d.category]))
            scale.domain(Array.from(categoryByName.values()));
            return d => scale(categoryByName.get(d.name));
        }
        return d => scale(d.name);
    }


    formatDate(val) {

        return d3.timeFormat('%Y')(new Date(val));
    }
    formatNumber(val) {
        return d3.format(",d")(val);
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
        console.log("component mounted");

        // d3.select(this.myRef.current)
        //     .append('p')
        //     .text("Hello World");
    }

    render() {
        const chart = this.chart();
        this.animateChart(chart);
        //Ideally, we want to return the chart without the svg and append it manually.
        console.log("hi world");
        return (
            <div ref={this.myRef}>
            </div>
        )
    }
}
export default BarChartRaceComp;