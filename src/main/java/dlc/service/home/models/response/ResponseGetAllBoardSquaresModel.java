package dlc.service.home.models.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import dlc.service.home.models.objects.BoardSquare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ResponseGetAllBoardSquaresModel extends ResponseModel{

    @JsonProperty("boardSquares")
    private List<BoardSquare> boardSquares;
    /**
     * @param responseCode mapped to a specified case scenario
     * @param message      message sent to frontend.
     */
    public ResponseGetAllBoardSquaresModel(List<BoardSquare> boardSquares, Integer responseCode, String message) {
        super(responseCode, message);
        this.boardSquares = boardSquares;

    }

    public void setBoardSquares(List<BoardSquare> boardSquares) {
        this.boardSquares = boardSquares;
    }

    public List<BoardSquare> getBoardSquares() {
        return boardSquares;
    }

}
