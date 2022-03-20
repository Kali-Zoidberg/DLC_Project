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

        //Return empty board if there are no defined jeopardy squares.
        if (this.props.jeopardySquares.length === undefined || this.props.jeopardySquares.length < 1)
            return (
                <div className="container-fluid jeopardyBoard" onClick={this.flipJeopardySquare}>
                </div>
            );

        let row = [];
        let index = 0;
        for (const jeopardySquare of this.props.jeopardySquares) {
            ++index;
            if (counter < this.props.squaresPerRow) {
                row.push(jeopardySquare);
                ++counter;
            }
            else {
                counter = 0;
                rows.push(<JeopardyBoardRow key={index} jeopardySquares={row} squaresPerRow={this.props.squaresPerRow}/>);
                row = [];
            }
        }
        if (row.length > 0)
            rows.push(<JeopardyBoardRow key={index} jeopardySquares={row} squaresPerRow={this.props.squaresPerRow}/>);

        return (
            <div className="container-fluid jeopardyBoard" onClick={this.flipJeopardySquare}>
                {rows}
            </div>
        );

    }
}
export default JeopardyBoardComp;