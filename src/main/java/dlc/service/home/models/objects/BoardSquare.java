package dlc.service.home.models.objects;

public class BoardSquare {
    private int squareId;
    private int points;
    private String squareDescriptionBrief;
    private String squareDescriptionFull;

    public BoardSquare(int squareId, int points, String squareDescriptionBrief, String squareDescriptionFull) {
        this.squareId = squareId;
        this.points = points;
        this.squareDescriptionBrief = squareDescriptionBrief;
        this.squareDescriptionFull = squareDescriptionFull;
    }

    public void setSquareId(int squareId) {
        this.squareId = squareId;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public void setSquareDescriptionBrief(String squareDescriptionBrief) {
        this.squareDescriptionBrief = squareDescriptionBrief;
    }

    public void setSquareDescriptionFull(String squareDescriptionFull) {
        this.squareDescriptionFull = squareDescriptionFull;
    }

    public int getSquareId() {
        return squareId;
    }

    public int getPoints() {
        return points;
    }

    public String getSquareDescriptionBrief() {
        return squareDescriptionBrief;
    }

    public String getSquareDescriptionFull() {
        return squareDescriptionFull;
    }
}
