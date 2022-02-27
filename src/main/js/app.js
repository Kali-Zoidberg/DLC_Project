import JeopardySquareComp from "./components/JeopardySquareComp";

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

        //Construct jeopardysquares
        return (
            <React.Fragment>
                <JeopardySquareComp jeopardySquareID ={999}
                                    description={"Hello World."}
                                    points={9001}/>
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