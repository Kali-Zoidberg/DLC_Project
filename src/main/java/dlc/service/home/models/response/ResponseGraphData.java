package dlc.service.home.models.response;

import dlc.service.home.models.objects.GraphData;

import java.util.List;

public class ResponseGraphData extends ResponseModel {
    private List<String> names;
    private List<GraphData<Integer>> data;

    /**
     *
     * @param responseCode
     * @param message
     * @param names
     * @param data
     */
    public ResponseGraphData(Integer responseCode, String message, List<String> names, List<GraphData<Integer>> data) {
        super(responseCode, message);
        this.names = names;
        this.data = data;
    }

    public List<String> getNames() {
        return names;
    }

    public List<GraphData<Integer>> getData() {
        return data;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }

    public void setData(List<GraphData<Integer>> data) {
        this.data = data;
    }
}
