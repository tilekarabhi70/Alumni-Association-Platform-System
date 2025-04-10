package com.example.project.repository;

import com.example.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<User, Long> {
    List<User> findByBatch(String batch);
    List<User> findByRole(String role);
    @Query("SELECT u FROM User u WHERE " +
            "(:name IS NULL OR u.name LIKE %:name%) AND " +
            "(:email IS NULL OR u.email LIKE %:email%) AND " +
            "(:batch IS NULL OR u.batch = :batch)")
     List<User> findByFilters(@Param("name") String name, 
                              @Param("email") String email, 
                              @Param("batch") String batch);
	
}

