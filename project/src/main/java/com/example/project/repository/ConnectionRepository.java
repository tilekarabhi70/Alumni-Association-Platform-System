package com.example.project.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.model.Connection;
import com.example.project.model.User;

import java.util.List;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    List<Connection> findByUserAndIsConnectedTrue(User user);
    List<Connection> findByUserAndIsPendingTrue(User user);
    List<Connection> findByUserAndIsConnectedFalseAndIsPendingFalse(User user);
}