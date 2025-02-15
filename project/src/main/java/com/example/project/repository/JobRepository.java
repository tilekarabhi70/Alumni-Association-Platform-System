package com.example.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
	Optional<Job> findById(Long id);
	
}

