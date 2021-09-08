package sal.service.home.models.objects;

import sal.service.home.models.response.ResponseInquiryRefinanceModel;

public abstract class Loan {
    protected double loanTermInMonths;
    protected double loanAmount;
    protected double interestRate;

    /**
     * Constructs a loan with the three most simple terms.
     * @param loanTermInMonths
     * @param loanAmount
     * @param interestRate
     */
    public Loan(double loanTermInMonths, double loanAmount, double interestRate) {
        this.loanTermInMonths = loanTermInMonths;
        this.loanAmount = loanAmount;
        this.interestRate = interestRate;
    }

    /**
     *
     * @return
     */
    public double getLoanTermInMonths() {
        return loanTermInMonths;
    }

    /**
     *
     * @return
     */
    public double getLoanAmount() {
        return loanAmount;
    }

    /**
     *
     * @return
     */
    public double getInterestRate() {
        return interestRate;
    }


    /**
     * Sets loan term in months
     * @param loanTermInMonths
     */
    public void setLoanTermInMonths(double loanTermInMonths) {
        this.loanTermInMonths = loanTermInMonths;
    }

    /**
     * Sets the loan amount.
     * @param loanAmount
     */
    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    /**
     * SEts the interest rate
     * @param interestRate
     */
    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public abstract ResponseInquiryRefinanceModel calculate();
}
