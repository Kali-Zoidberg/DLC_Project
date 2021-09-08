import InquiryFormComponent from "./components/InquiryFormComponent";

const React = require('react');
const ReactDOM = require('react-dom');
import TestComponent from './components/TestComponent.js';
import * as ALL from './components';

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

    render() {
        return (
            <React.Fragment>
            Time server recieved request: <TestComponent content = {this.state.content}></TestComponent>
                asdf
            <InquiryFormComponent />
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