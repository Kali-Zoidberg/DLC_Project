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

    openChallengeSubmissionLink() {
        window.location.href = "https://l.facebook.com/l.php?u=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSfCMFlN01tkal3MpjreGdEtQEcwT5rD0N7IXsGnsdvAjNSyzg%2Fviewform%3Ffbclid%3DIwAR0fKUavJIIxwi5rgZTxcPdcfD1rlcOtfJ5QupVi0MONVcsPuEBvLyGIKqE&h=AT0EqTqkTi_RWElti3i8rZ--osQoHE6YangpO24dPN8BfCBhjFLh0VzC4nDCLA-YbDUvpz2JDohPezknHNjFTK2hc4T-NZM65meqIFhYdw6pZ_BaBOLx7h-HjKNFDWOUATTRXypRTSc0xQUJEuA";
    }

    render() {
        if (this.state.barChart === undefined) {
            return '<div className="content-centered"> <h1>Loading....</h1> </div>';
        }
        // console.log(this.state.barChart);
        //Get JeopardySquares from backend
        //Construct jeopardysquares
        return (
            <React.Fragment>

                <div className="row">
                    <div className="col-2 gutter" id="gutter-left">
                    </div>
                    <div className="col-8 content-centered">
                        <div className="row site-header rounded">
                            <h1>
                                Delta Lambda Chi - Sisterhood
                            </h1>
                        </div>

                        <div className="page even py-3">
                            <JeopardyBoardComp jeopardySquares={this.state.jeopardySquares} squaresPerRow={4}/>
                            <div className="challengeSubmissionDiv">
                                <button type="button" className="btn btn-light btn-lg submitChallengeButton border border-dark" onClick={this.openChallengeSubmissionLink}>
                                    Submit Challenge
                                </button>
                            </div>
                        </div>

                        <div className="page odd mt-4">
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