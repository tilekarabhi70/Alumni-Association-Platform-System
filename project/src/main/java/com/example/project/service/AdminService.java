package com.example.project.service;

import com.example.project.model.User;
import com.example.project.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;

    public List<User> getAllAlumni(String batch, String role) {
        if (batch != null) {
            return adminRepository.findByBatch(batch);
        } else if (role != null) {
            return adminRepository.findByRole(role);
        }
        return adminRepository.findAll();
    }

    public Optional<User> getAlumniById(Long id) {
        return adminRepository.findById(id);
    }

    public User updateAlumni(Long id, User userDetails) {
        User user = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setBatch(userDetails.getBatch());
        user.setRole(userDetails.getRole());
        return adminRepository.save(user);
    }

    public void deleteAlumni(Long id) {
    	adminRepository.deleteById(id);
    }
    public List<User> searchAlumni(String name, String email, String batch) {
        return adminRepository.findByFilters(name, email, batch);
    }

}
