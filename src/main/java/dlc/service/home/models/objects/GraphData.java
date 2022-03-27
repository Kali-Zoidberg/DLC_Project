package dlc.service.home.models.objects;

import java.sql.Date;

public class GraphData<T> {
    private T value;
    private String name;
    private Date date;

    public GraphData(T value, String name, Date date) {
        this.value = value;
        this.name = name;
        this.date = date;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public T getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

    public Date getDate() {
        return date;
    }
}
