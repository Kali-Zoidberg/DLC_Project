package dlc.service.home.models.objects;

public class Person {
    private int personId;
    private String firstName;
    private String lastName;
    private int points;

    public Person(int personId, String firstName, String lastName, int points) {
        this.personId = personId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.points = points;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getPersonId() {
        return personId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getPoints() {
        return points;
    }
}
