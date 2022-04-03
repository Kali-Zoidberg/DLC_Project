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
import java.time.LocalDate;
import java.time.ZoneId;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BarChartController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/getRacingBarChart")
    public ResponseGraphData getRacingBarChart() throws ParseException {
        LocalDate currentDate =  LocalDate.of(2022, 2, 1);
        List<GraphData<Integer>> graphData = this.generateGraphData(currentDate);
        List<String> names = this.getAllNames();

        return new ResponseGraphData(201, "Success!", names, graphData);
    }

    /**
     * Generates a list of graph data points from startDate to endDate.
     * @return
     */
    public List<GraphData<Integer>> generateGraphData(LocalDate startDate) {

        String sql = "SELECT * FROM dlc_db.persons LEFT JOIN dlc_db.graph_data ON graph_data.person_id = persons.person_id" +
                " WHERE graph_data.active=1 AND persons.active=1;";

        List<GraphData<Integer>> graphDataEntities =
                jdbcTemplate.query(sql, (rs, rowNum) -> (new GraphData<>(
                        rs.getInt("total_points"),
                        rs.getString("first_name") + " " + rs.getString("last_name"),
                        rs.getDate("datetime_recorded")
                )));

        //Get the first date
        //Map person -> {
        Map<String, Map<LocalDate, Integer>> complicatedMapForFillingData = new HashMap<>();
        Date earliestDate = null;
        Date latestDate = null;
        Map<String, Integer> personsMappedToTotalPoints = new HashMap<>();
        for (GraphData<Integer> graphData : graphDataEntities) {
            int points = graphData.getValue();
            String fullName = graphData.getName();
            Date currentDate = graphData.getDate();

            //Update earliest and latest dates.
            if (earliestDate == null || graphData.getDate().before(earliestDate)) {
                earliestDate = graphData.getDate();
            }

            if (latestDate == null || graphData.getDate().after(latestDate))
                latestDate = graphData.getDate();

            Map<LocalDate, Integer> dateWithPoints = new HashMap<>();
            dateWithPoints.put(currentDate.toLocalDate(), points);
            if (!complicatedMapForFillingData.containsKey(fullName))
                complicatedMapForFillingData.put(fullName, dateWithPoints);
            else {
                complicatedMapForFillingData.get(fullName).put(currentDate.toLocalDate(), points);
            }
        }

        for (String fullName : complicatedMapForFillingData.keySet()) {
            int currentPoints = 100; // default amount for everyone.
            //Iterate over each date.
            for (LocalDate date = earliestDate.toLocalDate();
                 date.isBefore(latestDate.toLocalDate()) || date.isEqual(latestDate.toLocalDate());
                 date = date.plusDays(1)
            ) {
                if (!complicatedMapForFillingData.get(fullName).containsKey(date)) {
                    //Person doesnt have points for this date. What do we do?
                    complicatedMapForFillingData.get(fullName).put(date, currentPoints);
                } else {
                    currentPoints = complicatedMapForFillingData.get(fullName).get(date);
                }
            }
        }

        List<GraphData<Integer>> finalGraphDataEntities = new ArrayList<>();

        for (String fullName : complicatedMapForFillingData.keySet()) {
            for (LocalDate date : complicatedMapForFillingData.get(fullName).keySet()) {
                int points = complicatedMapForFillingData.get(fullName).get(date);
                finalGraphDataEntities.add(new GraphData<Integer>(points, fullName, Date.valueOf(date)));
            }
        }


        return finalGraphDataEntities;
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
