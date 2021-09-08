package sal.service.home.core.Controllers;

import org.springframework.web.bind.annotation.*;
import sal.service.home.models.objects.Loan;
import sal.service.home.models.request.RequestInquiryRefinanceModel;
import sal.service.home.models.response.ResponseInquiryRefinanceModel;
import sal.service.home.models.objects.CashOutLoan;

@RestController
public class LoanInquiryController {

    @PostMapping(value="/inquiryRefinance", consumes = "application/json", produces = "application/json")
    public @ResponseBody
    ResponseInquiryRefinanceModel getInquiryRefinance(@RequestBody RequestInquiryRefinanceModel requestModel) {
        //Validate request Model
        //Make sure loanTerm is not < 0
        Loan loan = null;
        if (requestModel.getLoanType().equals("cash_out")) {
            loan = new CashOutLoan(requestModel.getLoanTerm(), requestModel.getLoanAmount(), requestModel.getInterestRate(),  requestModel.getDownPayment(), 10);
        }
        System.out.println("loan amount " + requestModel.getLoanAmount());


        System.out.println(loan.calculate());

        ResponseInquiryRefinanceModel responseModel = loan != null ? loan.calculate() : new ResponseInquiryRefinanceModel(-1,-1,-1);

        return responseModel;
    }

}
