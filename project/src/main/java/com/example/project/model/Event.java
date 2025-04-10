package com.example.project.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    private String title;
    @Column
    private String description;
    @Column
    private LocalDateTime eventDate;
    @Column
    private String location;
    @Column
    private boolean isPastEvent;

    // Constructors
    public Event() {}

    public Event(String title, String description, LocalDateTime eventDate, String location) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.location = location;
        this.isPastEvent = eventDate.isBefore(LocalDateTime.now());
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public boolean isPastEvent() { return isPastEvent; }
    public void setPastEvent(boolean pastEvent) { isPastEvent = pastEvent; }
}

