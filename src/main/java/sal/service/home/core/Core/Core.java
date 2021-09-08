package sal.service.home.core.Core;

import sal.service.home.models.request.RequestModel;
import sal.service.home.models.response.ResponseModel;

public abstract class Core {

    public abstract ResponseModel generateResponse(RequestModel requestModel);
}
