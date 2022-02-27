package dlc.service.home.models.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RequestInquiryRefinanceModel extends RequestModel {

    @JsonProperty("loanType")
    private String loanType;
    @JsonProperty("loanTerm")
    private double loanTerm;
    @JsonProperty("loanAmount")
    private double loanAmount;
    @JsonProperty("interestRate")
    private double interestRate;
    @JsonProperty("downPayment")
    private double downPayment;


    /**
     * Request for refinance inquiries
     * @param loanType loanType of refinance
     * @param loanTerm Length of loan
     * @param loanAmount The amount of the loan
     * @param interestRate interest rate of loan
     * @param downPayment amount put down for the loan.
     */
    public RequestInquiryRefinanceModel(String loanType, int loanTerm, double loanAmount, double interestRate, double downPayment) {
        this.loanType = loanType;
        this.loanTerm = loanTerm;
        this.loanAmount = loanAmount;
        this.interestRate = interestRate;
        this.downPayment = downPayment;
    }

    /**
     *
     * @return Returns loanType of refinance loan
     */
    public String getLoanType() {
        return loanType;
    }

    /**
     *
     * @return Returns length of loan
     */
    public double getLoanTerm() {
        return loanTerm;
    }

    /**
     *
     * @return Returns interest rate of the loan.
     */
    public double getInterestRate() {
        return interestRate;
    }

    /**
     *
     * @return Returns the amount paid upfront for the loan.
     */
    public double getDownPayment() {
        return downPayment;
    }

    /**
     *
     * @return Returns the loan's amount.
     */
    public double getLoanAmount() {
        return loanAmount;
    }

    /**
     * Set loan loanType.
     * @param loanType
     */
    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    /**
     *
     * @param loanTerm
     */
    public void setLoanTerm(double loanTerm) {
        this.loanTerm = loanTerm;
    }

    /**
     *
     * @param interestRate
     */
    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    /**
     *
     * @param downPayment
     */
    public void setDownPayment(double downPayment) {
        this.downPayment = downPayment;
    }

    /**
     * Sets the loan amount
     * @param loanAmount
     */
    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }
}
