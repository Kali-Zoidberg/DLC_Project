import React from 'react';
import Globals from "../globals/Globals.js"
class JeopardySquareComp extends React.Component {
    constructor(props) {
        super(props);

        /*
        props.jeopardySquareID
        props.points
        props.description
         */
        this.state = {
            orientation: 0, //degrees
            text: props.description
        };

        this.flipJeopardySquare = this.flipJeopardySquare.bind(this);
    }

    /**
     * Handles input event when the square is clicked.
     */
    flipJeopardySquare() {
        console.log("HI MOM");
        this.flipOrientation();

        //Change to the other side of the board.
        this.animateJeopardySquareFlip();

        //Change content.
        if (this.state.orientation >= 180)
            this.setState({
                    text: this.props.points
            });
        else
            this.setState( {
                text: this.props.description
            });
    }

    animateJeopardySquareFlip() {
        //Animation to flip the square
    }
    /**
     * Flip the orientation of the jeopardy square.
     * @param direction
     */
    flipOrientation() {
      this.state.orientation = ((this.state.orientation + 180) % 360) //Limit to 360 degrees
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="container-fluid jeopardySquare" onClick={this.flipJeopardySquare}>
                <div className="row">
                    <label className="text">
                        <h1>
                            {this.state.text}
                        </h1>
                    </label>
                </div>
            </div>);
    }
}

export default JeopardySquareComp;