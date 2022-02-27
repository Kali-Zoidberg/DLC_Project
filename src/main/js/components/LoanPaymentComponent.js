
class LoanPaymentComponent extends React.Component {

    render() {
        return (<div class="container-fluid">
            <div class="row">
                <h3>{this.props.principal}</h3>
            </div>
            <div class="row">
                <h3>{this.props.interestRate}</h3>
            </div>
            <div class="row">
                <h3>{this.props.monthlyPayment}</h3>
            </div>
        </div>);

    }
}
export default LoanPaymentComponent;
