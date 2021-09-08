
class InquiryFormComponent extends React.Component {
    constructor(props) {
    super(props)
        this.state = {
            loanType : {value: 'cash_out'},
            loanAmount : 150000,
            interestRate: 0.034,
            downPayment: 30000

        }
    }
    handleInputChange(event) {1 q
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const requestOptions = {
            method : 'POSt',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({})
        }
        //make POST

    }
    render() {
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        Loan Type
                        <select value={this.state.loanType.value} name="loanType">
                            <option value="cash_out">Cash Out</option>
                            <option value="rate_and_term">Rate and Term</option>
                        </select>
                    </div>
                    <div className="row">
                        Loan Term
                        <select name="loanTerm">
                            <option value="30">30 Year</option>
                            <option value="15">15 Year</option>
                        </select>
                    </div>
                    <div className="row">
                        Loan Amount
                        <input onChange={this.handleInputChange} loanType="number" name="loanAmount" value={this.state.loanAmount}></input>
                    </div>
                    <div className="row">
                        Interest Rate
                        <input onChange={this.handleInputChange} loanType="number" name="interestRate" value="{this.state.interestRate * 100}%"></input>
                    </div>
                    <div className="row">
                        Down Payment
                        <input onChange={this.handleInputChange} loanType="number" name="downPayment" value={this.state.downPayment}></input>
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