package com.example.controller;


import java.util.*;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;

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
public ResponseEntity<?> createUser(@RequestBody User newUser) {
    try {
        // Optional: check before save to provide early feedback
        if (database.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Username already exists");
        }
        User savedUser = database.save(newUser);
        return ResponseEntity.ok(savedUser);
    } catch (DuplicateKeyException e) {
        // This handles the rare race condition if two requests try to save same username simultaneously
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body("Username already exists");
    }
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
    try {
        Optional<User> optionalUser = database.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println("Deleting user with ID: " + user.getId());
            database.deleteById(user.getId());
            return ResponseEntity.noContent().build();
        } else {
            System.out.println("User not found: " + username);
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).build();
    }
}
}

