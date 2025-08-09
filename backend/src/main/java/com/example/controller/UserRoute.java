//example (add more later)
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/users")
public class UserRoute {

    // Dummy in-memory user list
    private List<User> users = new ArrayList<>(Arrays.asList(
        new User(1L, "Alice", "alice@example.com"),
        new User(2L, "Bob", "bob@example.com")
    ));

    // GET /users
    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }

    // GET /users/{id}
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return users.stream()
            .filter(user -> user.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    // POST /users
    @PostMapping
    public User createUser(@RequestBody User newUser) {
        users.add(newUser);
        return newUser;
    }

    // PUT /users/{id}
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                user.setName(updatedUser.getName());
                user.setEmail(updatedUser.getEmail());
                return user;
            }
        }
        return null;
    }

    // DELETE /users/{id}
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        users.removeIf(user -> user.getId().equals(id));
    }
}
