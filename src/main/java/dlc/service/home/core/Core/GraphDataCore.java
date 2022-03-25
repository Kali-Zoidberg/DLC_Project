package dlc.service.home.core.Core;

import dlc.service.home.models.objects.GraphData;
import dlc.service.home.models.objects.GraphDataEntity;
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

        String sql = "SELECT * FROM dlc_db.graph_data LEFT JOIN dlc_db.persons ON graph_data.person_id = persons.person_id";

        List<GraphData> graphDataEntities =
                jdbcTemplate.query(sql, (rs, rowNum) -> (new GraphData(
                        rs.getInt("total_points"),
                        rs.getString("first_name") + rs.getString("last_name"),
                        rs.getDate("timestamp")
                )), startDate, endDate);


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
}
