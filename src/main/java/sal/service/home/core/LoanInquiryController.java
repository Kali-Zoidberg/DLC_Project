package sal.service.home.core;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sal.service.home.models.request.RequestInquiryRefinance;
import sal.service.home.models.response.ResponseInquiryRefinance;

@RestController
public class LoanInquiryController {

    @PostMapping(value="/inquiryRefinance", consumes = "application/json", produces = "application/json")
    public @ResponseBody ResponseInquiryRefinance getInquiryRefinance(@RequestBody RequestInquiryRefinance requestModel) {
        ResponseInquiryRefinance responseModel = new ResponseInquiryRefinance(10,10,10);

        return responseModel;
    }

}
