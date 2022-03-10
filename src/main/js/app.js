import JeopardySquareComp from "./components/JeopardySquareComp";
import JeopardyBoardComp from "./components/JeopardyBoardComp";
import BarChartComp from "./components/charts/BarChartComp";
const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: []};
    }

    componentDidMount() {

        fetch('/greeting?name=helloworld',
            {
                method: 'GET',
                headers: {'content-type': 'application/json'}
            }).then(response => response.json()).then( data =>{
                this.setState({content: data.content})
        });
    }
    retrieveJeopardySquares() {
        let jeopardySquares = [];

        return jeopardySquares;
    }

    render() {
        //Get JeopardySquares from backend
        const jeopardySquares = [
        <JeopardySquareComp jeopardySquareID ={999}
                            description={"Hello World."}
                            points={9001}/>,

            <JeopardySquareComp jeopardySquareID ={999}
                                description={"Hello World."}
                                points={23}/>,
            <JeopardySquareComp jeopardySquareID ={999}
                                description={"Hello World."}
                                points={43}/>,

            <JeopardySquareComp jeopardySquareID ={999}
                                description={"Hello World."}
                                points={4324}/>,
            <JeopardySquareComp jeopardySquareID ={999}
                                description={"Hello World."}
                                points={545}/>,

            <JeopardySquareComp jeopardySquareID ={999}
                                description={"Hello asdfasdfWorld."}
                                points={34}/>,
            <JeopardySquareComp jeopardySquareID ={999}
                                description={"Hello World."}
                                points={55}/>,

            <JeopardySquareComp jeopardySquareID ={999}
                                description={"Hellodasfas World."}
                                points={33}/>
        ];

        //Construct jeopardysquares
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-2 gutter" id="gutter-left">
                    </div>
                    <div className="col-8 content-centered">
                        <JeopardyBoardComp jeopardySquares={jeopardySquares} squaresPerRow={4}/>
                        <BarChartComp/>

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