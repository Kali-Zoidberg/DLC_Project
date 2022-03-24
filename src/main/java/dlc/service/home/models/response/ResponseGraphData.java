package dlc.service.home.models.response;

import java.util.List;

public class ResponseGraphData extends ResponseModel {
    private List<String> names;
    /**
     * @param responseCode mapped to a specified case scenario
     * @param message      message sent to frontend.
     */
    public ResponseGraphData(Integer responseCode, String message) {
        super(responseCode, message);
    }
}
