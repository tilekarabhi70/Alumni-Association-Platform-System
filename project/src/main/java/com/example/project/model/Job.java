package com.example.project.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column
    private String company;
    @Column
    private String location;
    @Column
    private String type; // Full-time, Part-time, Internship
    @Column
    private String description;
    @Column
    private String postedBy; // Alumni/Admin
    @ElementCollection
    private Set<String> appliedUsers = new HashSet<>();

    // Track users who saved this job
    @ElementCollection
    private Set<String> savedUsers = new HashSet<>();
    

    public Set<String> getAppliedUsers() {
        return appliedUsers;
    }

    public void setAppliedUsers(Set<String> appliedUsers) {
        this.appliedUsers = appliedUsers;
    }

    public Set<String> getSavedUsers() {
        return savedUsers;
    }

    public void setSavedUsers(Set<String> savedUsers) {
        this.savedUsers = savedUsers;
    }

	// Default Constructor
    public Job() {
    }

    // Parameterized Constructor
    public Job(Long id, String title, String company, String location, String type, String description, String postedBy ,String savedUsers,String appliedUsers  ) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.type = type;
        this.description = description;
        this.postedBy = postedBy;
//        this.appliedUsers=appliedUsers;
//        this.savedUsers=savedUsers;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }
}

