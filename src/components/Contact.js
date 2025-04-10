import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaImage,
  FaCalendarAlt,
  FaPaperPlane,
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaTachometerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [feed, setFeed] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [profileRole, setProfileRole] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFeed, setFilteredFeed] = useState([]);

  const navigate = useNavigate();

  // Fetch logged-in user details on component mount
  useEffect(() => {
    fetchLoggedInUserProfile();
    fetchAllEvents();
    fetchPosts();
  }, []);

  // Fetch logged-in user profile details
  const fetchLoggedInUserProfile = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      console.error("No email found in localStorage.");
      return;
    } 
    try {
      const response = await axios.get(`http://localhost:8787/api/auth/profile?email=${email}`);
      const user = response.data;
      if (user) {
        setProfileName(user.name);
        setProfileRole(user.role);
       // setProfileImage(user.profileImageUrl);
      } else {
        console.error("User not found in the database.");
        setProfileName("Guest"); // Set default values
        setProfileRole("No Role");
        setProfileImage(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("User not found in the database.");
        setProfileName("Guest"); // Set default values
        setProfileRole("No Role");
        setProfileImage(null);
      } else {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  // Fetch all events from the API
  const fetchAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8787/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8787/api/posts");
      if (response.data && response.data.success) {
        setFeed(response.data.posts);
        setFilteredFeed(response.data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Handle search functionality
  useEffect(() => {
    const filtered = feed.filter((item) => {
      if (item.type === "text") {
        return item.text.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (item.type === "image") {
        return item.text.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (item.type === "event") {
        return (
          item.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return false;
    });
    setFilteredFeed(filtered);
  }, [searchQuery, feed]);

  // Handle profile image click
  const handleProfileImageClick = () => {
    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(URL.createObjectURL(file));
      }
    };
    photoInput.click();
  };

  // Handle photo upload
  const handlePhotoUpload = () => {
    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
        setSelectedEvent(null);
      }
    };
    photoInput.click();
  };

  // Handle event creation modal
  const handleEventCreation = () => {
    setShowEventModal(true);
  };

  // Handle saving an event
  const handleEventSave = async () => {
    const eventTitle = document.getElementById("eventTitle").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventDateInput = document.getElementById("eventDate").value;
    const eventLocation = document.getElementById("eventLocation").value;

    if (eventTitle && eventDescription && eventDateInput && eventLocation) {
      const eventData = {
        title: eventTitle,
        description: eventDescription,
        eventDate: eventDateInput,
        location: eventLocation,
      };

      try {
        const response = await axios.post("http://localhost:8787/api/events", eventData);
        setEvents((prevEvents) => [...prevEvents, response.data]);
        setSelectedEvent(response.data);
        setShowEventModal(false);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    } else {
      alert("Please fill in all the details.");
    }
  };

  // Handle closing the event modal
  const handleCloseModal = () => {
    setShowEventModal(false);
  };

  // Handle posting to the feed
  const handlePost = async () => {
    if (!postText && !selectedImage && !selectedEvent) {
      alert("Please write something or select a media/event to post.");
      return;
    }

    const newPost = {
      type: selectedImage ? "image" : selectedEvent ? "event" : "text",
      content: selectedImage || selectedEvent || null,
      text: postText,
    };

    try {
      const response = await axios.post("http://localhost:8787/api/posts", newPost);
      if (response.data && response.data.success) {
        setFeed([response.data.post, ...feed]);
        setPostText("");
        setSelectedImage(null);
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Handle event click to show details
  const handleEventClick = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:8787/api/events/${eventId}`);
      setSelectedEventDetails(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8787/api/events/${eventId}/delete`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      setSelectedEventDetails(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Handle editing a post
  const handleEditPost = async (id) => {
    const post = feed.find((p) => p.id === id);
    if (post) {
      const updatedText = prompt("Edit your post:", post.text);
      if (updatedText !== null) {
        try {
          const response = await axios.put(`http://localhost:8787/api/posts/${id}/update`, {
            text: updatedText,
          });
          if (response.data && response.data.success) {
            const updatedFeed = feed.map((p) =>
              p.id === id ? { ...p, text: updatedText } : p
            );
            setFeed(updatedFeed);
          }
        } catch (error) {
          console.error("Error updating post:", error);
        }
      }
    }
  };

  // Handle deleting a post
  const handleDeletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8787/api/posts/${id}/delete`);
      if (response.data && response.data.success) {
        const updatedFeed = feed.filter((p) => p.id !== id);
        setFeed(updatedFeed);

        const deletedPost = feed.find((p) => p.id === id);
        if (deletedPost && deletedPost.type === "event") {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.title !== deletedPost.content.title)
          );
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Navigation handlers
  const handleMessageClick = () => navigate("/messages/Abhijeet");
  const handleJobs = () => navigate("/jobs");
  const handleNetwok = () => navigate("/myNetwork");
  const handleNotifiaction = () => navigate("/notification");
  const handleHome = () => navigate("/home");
  const handleLogout = () => navigate("/login");

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <div className="logo">
        <img src="images/images.jpeg" alt="Logo" height="40" />
        </div>
        <div className="search-bar d-flex align-items-center w-50">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-light">
            <FaSearch />
          </button>
        </div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleHome}>
                  <FaHome /> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleNetwok}>
                  <FaUserFriends /> My Network
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleJobs}>
                  <FaBriefcase /> Jobs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleMessageClick}>
                  <FaEnvelope /> Messaging
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleNotifiaction}>
                  <FaBell /> Notifications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Dashboard */}
      <div className="row mt-4">
        {/* Sidebar */}
        <aside className="col-md-3 col-12 mb-4">
          <div className="card">
                     <div
                       className="d-flex justify-content-center align-items-center position-relative"
                       style={{
                         width: "150px",
                         height: "150px",
                         backgroundColor: "#f0f0f0",
                         borderRadius: "50%",
                         overflow: "hidden",
                         margin: "0 auto",
                       }}
                     >
                       <FaUserCircle size={80} color="gray" />
                     </div>
                     <div className="card-body text-center">
                       <h5 className="card-title">Abhijeet Sawant</h5>
                       <p className="card-text">Software Developer</p>
                     </div>
                   </div>
          <div className="list-group mt-3">
            <a href="#" className="list-group-item list-group-item-action">
              <FaTachometerAlt /> Dashboard
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <FaCalendarAlt /> Events
              <ul>
                {events.length > 0 ? (
                  events.map((event) => (
                    <li key={event.id} onClick={() => handleEventClick(event.id)}>
                      {event.title} - {event.eventDate}
                    </li>
                  ))
                ) : (
                  <li>No upcoming events</li>
                )}
              </ul>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-md-9 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <textarea
                className="form-control mb-3"
                placeholder="Start a post..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              ></textarea>
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-primary" onClick={handlePhotoUpload}>
                  <FaImage /> Photo
                </button>
                <button className="btn btn-outline-primary" onClick={handleEventCreation}>
                  <FaCalendarAlt /> Event
                </button>
                <button className="btn btn-primary" onClick={handlePost}>
                  <FaPaperPlane /> Post
                </button>
              </div>

              {/* Post Preview */}
              <div className="mt-3">
                {selectedImage && (
                  <div className="d-flex align-items-center">
                    <img src={selectedImage} alt="Preview" className="img-thumbnail w-25 me-3" />
                    <p>{postText}</p>
                  </div>
                )}
                {selectedEvent && (
                  <div>
                    <h5>{selectedEvent.title}</h5>
                    <p>{selectedEvent.description}</p>
                    <p><strong>Date:</strong> {selectedEvent.eventDate}</p>
                    <p><strong>Location:</strong> {selectedEvent.location}</p>
                    {selectedEvent.isPastEvent && <span className="badge bg-danger">Past Event</span>}
                  </div>
                )}
                {(selectedImage || selectedEvent) && (
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => {
                      setSelectedImage(null);
                      setSelectedEvent(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="feed">
            {filteredFeed.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  {item.type === "image" && (
                    <div className="d-flex align-items-center">
                      <img src={item.content} alt="Post" className="img-thumbnail w-25 me-3" />
                      <p>{item.text}</p>
                    </div>
                  )}
                  {item.type === "event" && (
                    <div className="d-flex flex-column">
                      <h5>{item.content.title}</h5>
                      <p>{item.content.description}</p>
                      <p><strong>Date:</strong> {item.content.eventDate}</p>
                      <p><strong>Location:</strong> {item.content.location}</p>
                      {item.content.isPastEvent && (
                        <span className="badge bg-danger">Past Event</span>
                      )}
                    </div>
                  )}

                  {/* Edit and Delete Buttons */}
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-outline-warning me-2"
                      onClick={() => handleEditPost(item.id)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeletePost(item.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Details Modal */}
          {selectedEventDetails && (
            <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedEventDetails.title}</h5>
                    <button type="button" className="btn-close" onClick={() => setSelectedEventDetails(null)}></button>
                  </div>
                  <div className="modal-body">
                    <p>{selectedEventDetails.description}</p>
                    <p><strong>Date:</strong> {selectedEventDetails.eventDate}</p>
                    <p><strong>Location:</strong> {selectedEventDetails.location}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedEventDetails(null)}>
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteEvent(selectedEventDetails.id)}
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Event Details Modal */}
          {selectedEventDetails && (
            <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedEventDetails.title}</h5>
                    <button type="button" className="btn-close" onClick={() => setSelectedEventDetails(null)}></button>
                  </div>
                  <div className="modal-body">
                    <p>{selectedEventDetails.description}</p>
                    <p><strong>Date:</strong> {selectedEventDetails.eventDate}</p>
                    <p><strong>Location:</strong> {selectedEventDetails.location}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedEventDetails(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Event Modal */}
          {showEventModal && (
            <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create Event</h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="eventTitle" className="form-label">
                        Event Title
                      </label>
                      <input type="text" className="form-control" id="eventTitle" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="eventDescription" className="form-label">
                        Event Description
                      </label>
                      <textarea
                        className="form-control"
                        id="eventDescription"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="eventDate" className="form-label">
                        Event Date
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="eventDate"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="eventLocation" className="form-label">
                        Event Location
                      </label>
                      <input type="text" className="form-control" id="eventLocation" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleEventSave}>
                      Save Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Contact;