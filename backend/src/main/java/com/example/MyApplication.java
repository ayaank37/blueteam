package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class MyApplication {


	public static void main(String[] args) {
		SpringApplication.run(MyApplication.class, args);
	}

	@Component
	class Runner implements CommandLineRunner {
		private final MongoTemplate mongo;

		Runner(MongoTemplate mongo) {
			this.mongo = mongo;
		}

		public void run(String... arg) {
			try {
				mongo.executeCommand("{ \"ping\": 1 }");
				System.out.println(" connected to MongoDB Atlas!");
			} catch (Exception e) {
				System.err.println(" Connection failed: " + e.getMessage());
			}
		}
	}
}