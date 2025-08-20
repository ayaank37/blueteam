//example (add more later)
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.example.models.User;

@RestController
@RequestMapping("/users")
public class UserRoute {
    // GET /users
    @GetMapping
    public List<User> getAllUsers() {
        System.out.print("helloooo Worlddddd");
        return null;
    }
}