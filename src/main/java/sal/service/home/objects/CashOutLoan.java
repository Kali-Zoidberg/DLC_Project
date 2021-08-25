package sal.service.home.objects;

import sal.service.home.models.objects.Loan;
import sal.service.home.models.response.ResponseInquiryRefinance;

/**
 *
 */
public class CashOutLoan extends Loan {


    private double downPayment;
    protected double amountPaidOff;
    /**
     *
     * @param loanTerm
     * @param loanAmount
     * @param interestRate
     * @param downPayment
     */
    public CashOutLoan(double loanTerm, double loanAmount, double interestRate, double downPayment, double amountPaidOff) {
        super(loanTerm, loanAmount, interestRate);
        this.amountPaidOff = amountPaidOff;
        this.downPayment = downPayment;
    }

    public ResponseInquiryRefinance calculate() {
        double amountBorrowed = this.loanAmount - amountPaidOff;
        double interest = amountBorrowed * (this.loanTermInMonths / 12) * interestRate;
        double monthlyPayment = (amountBorrowed + interest) / (this.loanTermInMonths);
        ResponseInquiryRefinance response = new ResponseInquiryRefinance(amountBorrowed, interest, monthlyPayment);

        return response;
    }

    public double getAmountPaidOff() {
        return amountPaidOff;
    }

    /**
     *
     * @return
     */
    public double getDownPayment() {
        return downPayment;
    }

    /**
     * Gets the downpayment
     * @param downPayment
     */
    public void setDownPayment(double downPayment) {
        this.downPayment = downPayment;
    }

    public void setAmountPaidOff(double amountPaidOff) {
        this.amountPaidOff = amountPaidOff;
    }
}
