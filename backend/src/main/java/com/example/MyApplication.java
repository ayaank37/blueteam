
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.GroceryItem;
import com.example.repository.ItemRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;



@RestController
@SpringBootApplication
@EnableMongoRepositories
public class MyApplication implements CommandLineRunner{
    
    @Autowired
	ItemRepository groceryItemRepo;

	
	
	List<GroceryItem> itemList = new ArrayList<GroceryItem>();

	// @RequestMapping("/")
	// String home() {
	// 	return "Hello World!";
	// }

	public static void main(String[] args) {
		SpringApplication.run(MyApplication.class, args);
	}

    public void run(String... args) {
        System.out.println("ServerStarted");
        System.out.println("-------------CREATE GROCERY ITEMS-------------------------------\n");
		
		createGroceryItems();
		
		System.out.println("\n----------------SHOW ALL GROCERY ITEMS---------------------------\n");
		
    }
    void createGroceryItems() {
		System.out.println("Data creation started...");

		groceryItemRepo.save(new GroceryItem("Whole Wheat Biscuit", "Whole Wheat Biscuit", 5, "snacks"));
		groceryItemRepo.save(new GroceryItem("Kodo Millet", "XYZ Kodo Millet healthy", 2, "millets"));
		groceryItemRepo.save(new GroceryItem("Dried Red Chilli", "Dried Whole Red Chilli", 2, "spices"));
		groceryItemRepo.save(new GroceryItem("Pearl Millet", "Healthy Pearl Millet", 1, "millets"));
		groceryItemRepo.save(new GroceryItem("Cheese Crackers", "Bonny Cheese Crackers Plain", 6, "snacks"));
		
		System.out.println("Data creation complete...");
	}

}
    
