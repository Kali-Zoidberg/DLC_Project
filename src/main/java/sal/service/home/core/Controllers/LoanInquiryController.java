package sal.service.home.core.Controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sal.service.home.models.objects.Loan;
import sal.service.home.models.request.RequestInquiryRefinance;
import sal.service.home.models.response.ResponseInquiryRefinance;
import sal.service.home.objects.CashOutLoan;

@RestController
public class LoanInquiryController {

    @PostMapping(value="/inquiryRefinance", consumes = "application/json", produces = "application/json")
    public @ResponseBody ResponseInquiryRefinance getInquiryRefinance(@RequestBody RequestInquiryRefinance requestModel) {
        //Validate request Model
        //Make sure loanTerm is not < 0
        Loan loan = null;
        if (requestModel.getLoanType().equals("cash_out")) {
            loan = new CashOutLoan(requestModel.getLoanTerm(), requestModel.getLoanAmount(), requestModel.getInterestRate(),  requestModel.getDownPayment(), 10);
        }


        System.out.println(loan.calculate());

        ResponseInquiryRefinance responseModel = loan != null ? loan.calculate() : new ResponseInquiryRefinance(-1,-1,-1);

        return responseModel;
    }

}
