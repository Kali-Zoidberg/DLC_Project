package dlc.service.home.core.Controllers;

import dlc.service.home.models.objects.BoardSquare;
import dlc.service.home.models.response.ResponseGetAllBoardSquaresModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BoardSquaresController {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @GetMapping("/getAllBoardSquares")
    public ResponseGetAllBoardSquaresModel getAllBoardSquares() {


        String sql = "SELECT * FROM dlc_db.board_squares WHERE completed=0 ORDER BY points;";



        List<BoardSquare> boardSquares = jdbcTemplate.query(
                sql,
                (rs, rowNum) ->
                        new BoardSquare(
                                rs.getInt("square_id"),
                                rs.getInt("points"),
                                rs.getString("square_description_brief"),
                                rs.getString("square_description_full")
                        ));
        return new ResponseGetAllBoardSquaresModel(boardSquares, 100, "success!");
    }

}
