package sal.service.home.core;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sal.service.home.models.request.RequestInquiryRefinance;
import sal.service.home.models.response.ResponseInquiryRefinance;

@RestController
public class LoanInquiryController {

    @PostMapping(value="/inquiryRefinance", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseInquiryRefinance getInquiryRefinance(@RequestBody RequestInquiryRefinance requestModel) {
        ResponseInquiryRefinance responseModel = new ResponseInquiryRefinance(10,10,10);

        return responseModel;
    }

}
