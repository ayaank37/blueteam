package com.example.controller;

import java.util.*;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
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
            if (database.findByUsername(newUser.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Username already exists");
            }
            User savedUser = database.save(newUser);
            return ResponseEntity.ok(savedUser);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }
    }
   
@PostMapping("/login")
public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
    // Step 1: Find the user in the database
    System.out.println("Login attempt for user: " + loginRequest.getUsername());

        Optional<User> optionalUser = database.findByUsername(loginRequest.getUsername());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

    User existingUser = optionalUser.get();

    // Step 3: Validate the password
    if (!existingUser.getPassword().equals(loginRequest.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid password");
    }

    // Step 4: (Optional) Return a token or success message
    return ResponseEntity.ok("Login successful");
}



    // PUT /users/{username}
    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User updatedUser) {
        Optional<User> optionalUser = database.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(updatedUser.getPassword());
            return ResponseEntity.ok(database.save(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT /users/{username}/levelup
    @PutMapping("/{username}/levelup")
    public ResponseEntity<User> levelUpUser(@PathVariable String username) {
        Optional<User> optionalUser = database.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.increaseLevel();  // assumes you have this method
            return ResponseEntity.ok(database.save(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /users/{username}
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

    // DELETE /users/cleanup
    @DeleteMapping("/cleanup")
    public ResponseEntity<String> cleanup() {
        List<User> allUsers = database.findAll();
        Map<String, User> uniqueUserMap = new HashMap<>();
        List<User> usersToDelete = new ArrayList<>();

        for (User user : allUsers) {
            String username = user.getUsername();

            if (uniqueUserMap.containsKey(username)) {
                usersToDelete.add(user); // Duplicate — mark for deletion
            } else {
                uniqueUserMap.put(username, user); // First occurrence — keep
            }
        }

        database.deleteAll(usersToDelete);
        return ResponseEntity.ok("Deleted " + usersToDelete.size() + " duplicate user(s)");
    }
    

}
