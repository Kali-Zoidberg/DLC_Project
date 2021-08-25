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
            }).then(response => {
            this.setState({content: response.content})
        });
    }

    render() {
        return (<TestComponent test = {this.state.content}/>
        );
    }
}

class TestComponent extends React.Component {
    render() {
        return (
            <div> Hello! </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);