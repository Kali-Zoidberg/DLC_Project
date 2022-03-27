package dlc.service.home.core.Controllers;

import dlc.service.home.core.Core.GraphDataCore;
import dlc.service.home.models.objects.GraphData;
import dlc.service.home.models.objects.Person;
import dlc.service.home.models.response.ResponseGraphData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class BarChartController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/getRacingBarChart")
    public ResponseGraphData getRacingBarChart() throws ParseException {
        Date currentDate = new SimpleDateFormat("YYYY-mm-dd").parse("2022-02-01");
        List<GraphData<Integer>> graphData = this.generateGraphData(currentDate);
        List<String> names = this.getAllNames();

        return new ResponseGraphData(201, "Success!", names, graphData);
    }

    /**
     * Generates a list of graph data points from startDate to endDate.
     * @return
     */
    public List<GraphData<Integer>> generateGraphData(java.util.Date startDate) {

        String sql = "SELECT * FROM dlc_db.persons LEFT JOIN dlc_db.graph_data ON graph_data.person_id = persons.person_id" +
                " WHERE datetime_recorded >= ? AND graph_data.active=1 AND persons.active=1;";

        List<GraphData<Integer>> graphDataEntities =
                jdbcTemplate.query(sql, (rs, rowNum) -> (new GraphData<>(
                        rs.getInt("total_points"),
                        rs.getString("first_name") + rs.getString("last_name"),
                        rs.getDate("datetime_recorded")
                )), startDate);


        return graphDataEntities;
    }

    public List<String> getAllNames() {
        String sql = "SELECT * FROM dlc_db.persons WHERE active=1;";


        List<String> names = jdbcTemplate.query(
                sql,
                (rs, rowNum) ->
                        new String(rs.getString("first_name") + " " + rs.getString("last_name")));
        //Retrieve all names
        return names;
    }

    public void insertDummyData() {

        List<Person> person = new ArrayList<>();

    }
}
