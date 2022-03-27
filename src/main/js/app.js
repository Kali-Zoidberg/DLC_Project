import JeopardySquareComp from "./components/JeopardySquareComp";
import JeopardyBoardComp from "./components/JeopardyBoardComp";
import BarChartComp from "./components/charts/BarChartComp";
import BarChartRaceComp from "./components/charts/BarChartRaceComp";
const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            jeopardySquares: undefined,
            barChart: undefined
        };

        this.path = 'localhost:8080';
    }

    componentDidMount() {
        this.retrieveJeopardySquares();
        this.fetchRacingBarChart();

    }

    retrieveJeopardySquares() {
        let jeopardySquares = [];
        //Add database call here
        // GET request using fetch with error handling
        fetch('/getAllBoardSquares',
            {
                method: 'GET',
                'Content-Type': 'application/json'
            }).then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = 'Todo update error statement.';//(data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                let jeopardySquares = [];
                for (const boardSquare of Object.values(data.boardSquares)) {
                    jeopardySquares.push(<JeopardySquareComp jeopardyID={boardSquare.squareId}
                                                             description={boardSquare.squareDescriptionFull}
                                                             points={boardSquare.points}
                                                             key={boardSquare.squareId}
                    />);
                }
                this.setState({ jeopardySquares: jeopardySquares })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
        return jeopardySquares;
    }

    fetchRacingBarChart() {
        //Add database call here
        // GET request using fetch with error handling
        fetch('/getRacingBarChart',{
                method: 'GET',
                'Content-Type': 'application/json'
            }).then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = 'Todo update error statement.';//(data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            console.log(data);
            this.setState(
                { barChart: {
                        data : data.data,
                        names : data.names
                    }
                });
            }).catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        if (this.state.barChart === undefined) {
            return 'Loading....';
        }
        // console.log(this.state.barChart);
        //Get JeopardySquares from backend
        //Construct jeopardysquares
        return (
            <React.Fragment>
                <div className="row site-header">
                    <h1>
                    &Delta;&Lambda;&Chi; Sisterhood
                    </h1>
                </div>
                <div className="row">
                    <div className="col-2 gutter" id="gutter-left">
                    </div>
                    <div className="col-8 content-centered">
                        <div className="page even">
                            <JeopardyBoardComp jeopardySquares={this.state.jeopardySquares} squaresPerRow={3}/>
                        </div>
                        <div className="page odd">
                        <BarChartRaceComp data={this.state.barChart.data} names={this.state.barChart.names}/>
                        </div>
                    </div>
                    <div className="col-2 gutter" id="gutter-right">
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('react')
);

async function getData(url='', redirect='follow') {
    const response = await fetch(url,
        {
            method : 'GET',
            mode : 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers : {
                'Content-Type' : 'application/json'
            },
            redirect: redirect,
            referrerPolicy : 'no-referrer'
        });

    return response.json();
}