package com.example.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.example.model.User;
import java.util.Optional;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository<User, String> {

	
    Optional<User> findByUsername(String username);
	void deleteByUsername(String username);
	
} 
