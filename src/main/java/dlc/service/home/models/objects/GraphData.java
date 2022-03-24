package dlc.service.home.models.objects;

import java.util.Date;

public class GraphData<T> {
    private T value;
    private String name;
    private Date timestamp;

    public GraphData(T value, String name, Date timestamp) {
        this.value = value;
        this.name = name;
        this.timestamp = timestamp;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public T getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
