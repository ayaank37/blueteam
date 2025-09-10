package com.example.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class User {

    @Id
    private String id;  


    private String username;
    private String password;
    private Integer level = 0;
    private Integer gamebucks = 0;
    
    public User() {

    }
    public User(String username, String password)  {
        this.username = username;
        this.password = password;

    }

    public User(String username, String password, Integer level) {
        this.level = level;
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

     public void setUsername( String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public Integer getLevel() {
    return level;
}

    public void setLevel(Integer level) {
        this.level = level;
    }
    public void increaseLevel( ) {
        level ++;

   } 
  public void setGamebucks(Integer gamebucks) {
        this.gamebucks = gamebucks;
    }

    public Integer getGamebucks() {
    return gamebucks;
}
  

}