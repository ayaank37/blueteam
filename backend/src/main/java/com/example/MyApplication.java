package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;



@RestController
@SpringBootApplication
public class MyApplication {

	// @RequestMapping("/")
	// String home() {
	// 	return "Hello World!";
	// }

	public static void main(String[] args) {
		SpringApplication.run(MyApplication.class, args);
	}

    @Bean
    public CommandLineRunner showMongoUri(@Value("${spring.data.mongodb.uri:NOT SET}") String mongoUri) {

        return args -> {
            System.out.println("MongoDB URI Loaded" + mongoUri);

        };
    }
}