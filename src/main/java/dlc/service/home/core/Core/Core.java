package dlc.service.home.core.Core;

import dlc.service.home.models.request.RequestModel;
import dlc.service.home.models.response.ResponseModel;

public abstract class Core {

    public abstract ResponseModel generateResponse(RequestModel requestModel);
}
