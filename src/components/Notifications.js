import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBell,
  FaUserCircle,
  FaCheck,
  FaTimes,
  FaHome,
  FaSearch,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notifications.css"; // Create this CSS file for custom styles

const Notifications = () => {
  // Dummy notifications for testing
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "John Doe sent you a connection request.",
      type: "connection",
      isRead: false,
    },
    {
      id: 2,
      message: "Your job application for 'Software Engineer' has been reviewed.",
      type: "job",
      isRead: false,
    },
    {
      id: 3,
      message: "New message from Jane Smith: 'Hi, how are you?'",
      type: "message",
      isRead: false,
    },
    {
      id: 4,
      message: "Event reminder: Team meeting at 3 PM today.",
      type: "event",
      isRead: true,
    },
    {
      id: 5,
      message: "Alice Johnson accepted your connection request.",
      type: "connection",
      isRead: false,
    },
    {
      id: 6,
      message: "Your interview for 'Frontend Developer' is scheduled for tomorrow.",
      type: "job",
      isRead: false,
    },
  ]);

  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((notification) => !notification.isRead).length
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const navigate = useNavigate();

  // Handle search functionality
  useEffect(() => {
    const filtered = notifications.filter((notification) =>
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotifications(filtered);
  }, [searchQuery, notifications]);

  // Handle notification click (mark as read)
  const handleNotificationClick = async (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount((prev) => prev - 1); // Decrease unread count
  };

  // Handle notification deletion
  const handleDeleteNotification = async (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
    // Update unread count if the deleted notification was unread
    const deletedNotification = notifications.find(
      (notification) => notification.id === id
    );
    if (!deletedNotification.isRead) {
      setUnreadCount((prev) => prev - 1);
    }
  };

  // Handle profile click
  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  // Handle message click
  const handleMessageClick = () => {
    navigate("/messages/Abhijeet");
  };

  // Handle jobs click
  const handleJobs = () => {
    navigate("/jobs");
  };

  // Handle network click
  const handleNetwork = () => {
    navigate("/myNetwork");
  };

  // Handle notification click
  const handleNotification = () => {
    navigate("/notification");
  };

  // Handle home click
  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <div className="logo">
          <img src="/images/images.jpeg" alt="Logo" height="40" />
        </div>
        <div className="search-bar d-flex align-items-center w-50">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search notifications..."
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
                <a className="nav-link text-white" href="#" onClick={handleNetwork}>
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
                  {unreadCount > 0 && (
                    <span className="badge bg-danger ms-2">{unreadCount}</span>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleNotification}>
                  <FaBell /> Notifications
                  {unreadCount > 0 && (
                    <span className="badge bg-danger ms-2">{unreadCount}</span>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white" onClick={handleProfileClick}>
                  <FaUserCircle /> Profile
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
        </aside>

        {/* Main Content */}
        <main className="col-md-9 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <div className="list-group">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      notification.isRead ? "bg-light" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div>
                      <p className="mb-1">{notification.message}</p>
                      <small>
                        {notification.type === "connection" && "Connection Request"}
                        {notification.type === "message" && "New Message"}
                        {notification.type === "job" && "Job Update"}
                        {notification.type === "event" && "Event Reminder"}
                      </small>
                    </div>
                    <div>
                      {!notification.isRead && <FaCheck color="green" />}
                      {notification.isRead && <FaTimes color="gray" />}
                      <FaTrash
                        className="ms-2"
                        color="red"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the parent onClick
                          handleDeleteNotification(notification.id);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 bg-light mt-4">
        <p>&copy; 2025 AIT-YCP | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Notifications;