package dlc.service.home.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;

import java.sql.PreparedStatement;

@SpringBootApplication
public class DbTest implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(DbTest.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        String sql = "SELECT * FROM dlc_db.board_squares";
        PreparedStatement preparedSql = new jdbcTemplate.conn(sql);


        int result = jdbcTemplate.update();

        if (result > 0) {
            System.out.println("A new row has been inserted.");
        }

    }

}
