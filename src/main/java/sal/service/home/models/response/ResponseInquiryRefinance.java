package sal.service.home.models.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseInquiryRefinance {
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
    public ResponseInquiryRefinance(double principal, double interest, double monthlyPayment) {
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
