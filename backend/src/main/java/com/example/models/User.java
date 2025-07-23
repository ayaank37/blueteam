package com.example.models;


@Entity
public class User {

    @Id
    private Integer userId;

    private String username;
    private String password;
    private Integer level;

    

}