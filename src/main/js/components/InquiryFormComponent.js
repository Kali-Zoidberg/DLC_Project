import React from 'react';

class InquiryFormComponent extends React.Component {
    constructor(props) {
    super(props)
        this.state = {
            loanType : {value: 'cash_out'},
            loanAmount : 150000,
            interestRate: 0.034,
            downPayment: 30000,
            path: 'http://localhost:8080'

        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this);
        const requestOptions = {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json'},

            body : JSON.stringify({
                loanAmount : this.state.loanAmount,
                loanTerm : this.state.loanTerm,
                interestRate: this.state.interestRate,
                loanType : this.state.loanType.value

            }),
        };

        fetch(this.state.path + '/inquiryRefinance', requestOptions).then(
            response => {
                console.log(response);
                response.json()

            }
        ).then(data => console.log(data));

        //make POST

    }
    render() {
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        Loan Type
                        <select onChange={this.handleInputChange} value={this.state.loanType} name="loanType">
                            <option value="cash_out">Cash Out</option>
                            <option value="rate_and_term">Rate and Term</option>
                        </select>
                    </div>
                    <div className="row">
                        Loan Term
                        <select onChange={this.handleInputChange} name="loanTerm">
                            <option value="30">30 Year</option>
                            <option value="15">15 Year</option>
                        </select>
                    </div>
                    <div className="row">
                        Loan Amount
                        <input onChange={this.handleInputChange} loantype="number" name="loanAmount" value={this.state.loanAmount}></input>
                    </div>
                    <div className="row">
                        Interest Rate
                        <input onChange={this.handleInputChange} loantype="number" name="interestRate" value="0.034"></input>
                    </div>
                    <div className="row">
                        Down Payment
                        <input onChange={this.handleInputChange} loantype="number" name="downPayment" value={this.state.downPayment}></input>
                    </div>
                    <div className="row">
                        <button name="calculateFinance" onClick={this.handleSubmit}>Calculate</button>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default InquiryFormComponent;