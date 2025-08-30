<<<<<<< Updated upstream:backend/src/main/java/com/example/models/User.java
package com.example.models;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
=======
package com.example.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
>>>>>>> Stashed changes:backend/src/main/java/com/example/model/User.java

@Document(collection = "users")
public class User {

    @Id
    private String id;  


    private String username;
    private String password;
    private Integer level = 0;
    
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

<<<<<<< Updated upstream:backend/src/main/java/com/example/models/User.java
    public Integer getUserId() {
        return userId;
    }

    public void setUserId( Integer userId) {
        this.userId = userId;
    }

=======

    public String getId() { 
    return id;}

    public void setId(String id) {
    this.id = id; 
    }

>>>>>>> Stashed changes:backend/src/main/java/com/example/model/User.java
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
   public void increaseLevel( ) {
    level ++;

   }



}