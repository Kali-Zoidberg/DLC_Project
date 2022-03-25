package dlc.service.home.models.objects;

import java.util.Date;

public class GraphDataEntity {
    private int graphDataId;
    private int personId;
    private int totalPoints;
    private Date timestamp;

    public GraphDataEntity(int graphDataId, int personId, int totalPoints, Date timestamp) {
        this.graphDataId = graphDataId;
        this.personId = personId;
        this.totalPoints = totalPoints;
        this.timestamp = timestamp;
    }

    public int getGraphDataId() {
        return graphDataId;
    }

    public int getPersonId() {
        return personId;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setGraphDataId(int graphDataId) {
        this.graphDataId = graphDataId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
