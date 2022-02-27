import React from 'react';

class TestComponent extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div> hello : {this.props.content}</div>
        )
    }
}

export default TestComponent;