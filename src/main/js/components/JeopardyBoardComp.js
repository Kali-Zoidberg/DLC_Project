import React from 'react';
import Globals from "../globals/Globals.js"
import JeopardySquareComp from "./JeopardySquareComp";
import JeopardyBoardRow from "./JeopardyBoardRow";
class JeopardyBoardComp extends React.Component {
    constructor(props) {
        super(props);

        if (props.squaresPerRow <= 0)
            props.squaresPerRow = 4;
        /*
        props.jeopardySquares = [];
         */

        this.state = {
            jeopardySquares : this.props.jeopardySquares
        };

    }


    render() {
        const rows = [];
        let counter = 0;

        let row = [];
        for (const jeopardySquare of this.props.jeopardySquares) {
            if (counter < this.props.squaresPerRow) {
                row.push(jeopardySquare);
                ++counter;
            }
            else {
                counter = 0;
                rows.push(<JeopardyBoardRow jeopardySquares={row} squaresPerRow={this.props.squaresPerRow}/>);
                row = [];
            }
        }
        if (row.length > 0)
            rows.push(<JeopardyBoardRow jeopardySquares={row} squaresPerRow={this.props.squaresPerRow}/>);
        console.log(rows);
        return (
            <div className="container-fluid jeopardyBoard" onClick={this.flipJeopardySquare}>
                {rows}
            </div>
        );

    }
}
export default JeopardyBoardComp;