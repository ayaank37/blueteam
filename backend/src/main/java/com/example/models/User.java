package com.example.models;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class User {

    @Id
    private Integer userId;

    private String username;
    private String password;
    private Integer level = 0;
    
    public User() {

    }
    public User(String username, String password) {
        this.username = username;
        this.password = password;

    }

    public User(String username, String password, Integer level) {
        this.level = level;
        this.username = username;
        this.password = password;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId( Integer userId) {
        this.userId = userId;
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

    public void setPasssword(String password) {
        this.password = password;
    }
   public void increaseLevel( ) {
    level ++;

   }



}