package sal.service.home.core;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import sal.service.home.models.request.RequestInquiryRefinance;
import sal.service.home.models.response.ResponseInquiryRefinance;

public class LoanInquiryController {

    @PostMapping("/inquiryRefinance")
    public ResponseInquiryRefinance getInquiryRefinance(@RequestBody RequestInquiryRefinance requestModel) {
        ResponseInquiryRefinance responseModel = new ResponseInquiryRefinance(10,10,10);

        return responseModel;
    }

}
