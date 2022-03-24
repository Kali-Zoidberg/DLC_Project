package dlc.service.home.core.Core;

import dlc.service.home.models.objects.BoardSquare;
import dlc.service.home.models.objects.GraphData;
import dlc.service.home.models.objects.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class GraphDataCore {
    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * Generates a list of graph data points from startDate to endDate.
     * @return
     */
    public List<GraphData> generateGraphData(Date startDate, Date endDate) {

        String sql = "SELECT * FROM dlc_db.graph_data" +
                "WHERE timestamp >= ? AND timestamp <= ?;";

        List<GraphData> graphData =
                jdbcTemplate.query(sql, (rs, rowNum) ->);
        //How do we do data points for each day?
        //Num of days
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);

        return null;
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
}
