package com.example.project.controller;
import com.example.project.model.Event;
import com.example.project.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // 1. Create a new event
    @PostMapping
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event newEvent = eventService.createEvent(event);
        return ResponseEntity.ok(newEvent);
    }

    // 2. Fetch all events (upcoming + past)
    @GetMapping
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    // 3. Fetch upcoming events
    @GetMapping("/upcoming")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        return ResponseEntity.ok(eventService.getUpcomingEvents());
    }

    // 4. Fetch past events
    @GetMapping("/past")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<List<Event>> getPastEvents() {
        return ResponseEntity.ok(eventService.getPastEvents());
    }

    // 5. Fetch event details by ID
    @GetMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 6. Update event (admin-only)
    @PutMapping("/{id}/update")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Optional<Event> event = eventService.updateEvent(id, updatedEvent);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 7. Delete an event (admin-only)
    @DeleteMapping("/{id}/delete")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        boolean deleted = eventService.deleteEvent(id);
        return deleted ? ResponseEntity.ok("Event deleted successfully!") : ResponseEntity.notFound().build();
    }
}

