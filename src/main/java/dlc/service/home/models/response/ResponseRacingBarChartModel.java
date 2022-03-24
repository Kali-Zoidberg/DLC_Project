package dlc.service.home.models.response;

import java.util.List;

public class ResponseRacingBarChartModel extends ResponseModel {

    List<String> names;
    /**
     * @param responseCode mapped to a specified case scenario
     * @param message      message sent to frontend.
     */
    public ResponseRacingBarChartModel(Integer responseCode, String message) {
        super(responseCode, message);
    }


}
