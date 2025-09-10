package com.example.controller;

import java.util.*;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserRoute {

    
    @Autowired
    private UserRepository database;
    
    // GET /users
    @GetMapping
    public List<User> getAllUsers() {
        return database.findAll();
    }
 
    // POST /users
    @PostMapping
    public User createUser(@RequestBody User newUser) {
        return database.save(newUser);
    }

   
@PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User updatedUser) {
        Optional<User> optionalUser = database.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(updatedUser.getPassword());  // You can update more fields here if needed
            return ResponseEntity.ok(database.save(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
  @PutMapping("/{username}/levelup")
    public ResponseEntity<User> levelUpUser(@PathVariable String username) {
        Optional<User> optionalUser = database.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.increaseLevel();  // Custom method in User model
            return ResponseEntity.ok(database.save(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
      

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        Optional<User> optionalUser = database.findByUsername(username);
        if (optionalUser.isPresent()) {
            database.deleteByUsername(username);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}