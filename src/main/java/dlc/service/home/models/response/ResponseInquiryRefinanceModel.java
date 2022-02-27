package dlc.service.home.models.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseInquiryRefinanceModel extends ResponseModel {
    @JsonProperty("principal")
    private double principal;
    @JsonProperty("interest")
    private double interest;
    @JsonProperty("monthlyPayment")
    private double monthlyPayment;

    /**
     *
     * @param principal
     * @param interest
     * @param monthlyPayment
     */
    public ResponseInquiryRefinanceModel(double principal, double interest, double monthlyPayment) {
        super(0, "All is well.");
        this.principal = principal;
        this.interest = interest;
        this.monthlyPayment = monthlyPayment;
    }

    /**
     *
     * @return Prinicpal amount
     */
    public double getPrincipal() {
        return principal;
    }

    /**
     *
     * @return Interst accrued from loan
     */
    public double getInterest() {
        return interest;
    }

    /**
     *
     * @return monthly payment stretched over loanTerm
     */
    public double getMonthlyPayment() {
        return monthlyPayment;
    }

    /**
     * Set principal
     * @param principal
     */
    public void setPrincipal(double principal) {
        this.principal = principal;
    }

    /**
     * Set interest
     * @param interest
     */
    public void setInterest(double interest) {
        this.interest = interest;
    }

    /**
     * Set monthlyPayment
     * @param monthlyPayment
     */
    public void setMonthlyPayment(double monthlyPayment) {
        this.monthlyPayment = monthlyPayment;
    }
}
