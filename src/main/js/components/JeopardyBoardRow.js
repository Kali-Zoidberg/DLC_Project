import React from 'react';
import Globals from "../globals/Globals.js"

class JeopardyBoardRow extends React.Component {
    constructor(props) {
        super(props);

        if (props.squaresPerRow <= 0)
            props.squaresPerRow = 4;
        /*
        props.jeopardySquares = [];
         */

        this.state = {
            orientation: 0, //degrees
            jeopardySquares : this.props.jeopardySquares
        };

    }
    render() {
        let squares = [];
        const col_portion = Math.round(12/ this.props.squaresPerRow) % 13;
        for (let jeopardySquare of this.state.jeopardySquares) {
            squares.push(<div className={"col-" + col_portion}>{jeopardySquare}</div>);

        }
        return (
            <div className="row jeopardyRow">
                {squares}
            </div>
        );
    }
}

export default JeopardyBoardRow;