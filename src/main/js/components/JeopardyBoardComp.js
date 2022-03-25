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
            jeopardySquares : props.jeopardySquares
        };

    }


    render() {
        const rows = [];
        let counter = 0;

        //Return empty board if there are no defined jeopardy squares.
        if (this.state.jeopardySquares.length === undefined || this.state.jeopardySquares.length < 1)
            return('');

        let row = [];
        let collect_of_rows = [];
        let index = 0;
        for (const jeopardySquare of this.props.jeopardySquares) {
            ++index;
            if (counter < this.props.squaresPerRow) {
                row.push(jeopardySquare);
                collect_of_rows.push(jeopardySquare);
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

        console.log(collect_of_rows);
        debugger
        return (
            <div className="container-fluid jeopardyBoard" onClick={this.flipJeopardySquare}>
                {rows}
            </div>
        );

    }
}
export default JeopardyBoardComp;