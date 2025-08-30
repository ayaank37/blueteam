//example (add more later)
import org.springframework.web.bind.annotation.*;
import java.util.*;
<<<<<<< Updated upstream
import com.example.models.User;
=======
import com.example.model.User;
>>>>>>> Stashed changes

@RestController
@RequestMapping("/users")
public class UserRoute {
<<<<<<< Updated upstream
    // GET /users
    @GetMapping
    public List<User> getAllUsers() {
        System.out.print("helloooo Worlddddd");
        return null;
    }
}
=======

    // Dummy in-memory user list
    private List<User> users = new ArrayList<>(Arrays.asList(
        new User( "Alice", "alicepassword"),
        new User( "Bob", "bobpassword")
    ));

    // GET /users
    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }

    // POST /users
    @PostMapping
    public User createUser(@RequestBody User newUser) {
        users.add(newUser);
        return newUser;
    }

    // PUT /users/
    @PutMapping("/{username}")
    public User updateUser(@PathVariable String username, @RequestBody User updatedUser) {
     for (User user : users) {
            if (user.getUsername().equals(username)) {
                user.setPassword(updatedUser.getPassword());
                return user;
           }
     }
    return null;
}

    // DELETE /users/
    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        users.removeIf(user -> user.getUsername().equals(username));
    }
}
>>>>>>> Stashed changes
