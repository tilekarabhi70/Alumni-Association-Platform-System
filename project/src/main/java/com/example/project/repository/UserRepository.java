package com.example.project.repository;
import com.example.project.model.Role;
import com.example.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
  
    List<User> findByRole(Role role);

	User getUserByEmail(String email);

	Optional<User> findById(Long userId);
}

