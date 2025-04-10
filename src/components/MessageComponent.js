import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPaperPlane,
  FaEllipsisH,
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MessageComponent.css";

const MessageComponent = () => {
  // Initialize messages with two dummy entries
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ABHIJEET",
      recipient: "You",
      message: "Hey, how are you doing?",
      time: "2 mins ago",
    },
    {
      id: 2,
      sender: "AIT YCP",
      recipient: "You",
      message: "I saw your project, it's amazing!",
      time: "1 hour ago",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState("ABHIJEET"); // Set initial active conversation
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Log initial state for debugging
  useEffect(() => {
    console.log("Initial messages:", messages);
    console.log("Active conversation:", activeConversation);
  }, []);

  // Fetch connections from API (or use dummy data if API is not available)
  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      try {
        // Simulate API call
        // const response = await axios.get("/api/connections");
        // if (response.data) {
        //   setConnections(response.data);
        // }

        // Use dummy connections if API is not available
        const dummyConnections = [
          { id: "ABHIJEET", name: "Abhijeet" },
          { id: "AIT_YCP", name: "AIT YCP" },
          { id: "ADITY", name: "Adity" },
        ];
        setConnections(dummyConnections);
      } catch (error) {
        setError("Error fetching connections. Please try again.");
        console.error("Error fetching connections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  // Fetch messages for the active conversation (or use dummy data if API is not available)
  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          // Simulate API call
          // const response = await axios.get(`/api/messages?recipient=${activeConversation}`);
          // if (response.data) {
          //   setMessages((prevMessages) => [...prevMessages, ...response.data]); // Append API messages to existing messages
          // }

          // Use dummy messages if API is not available
          const dummyMessages = [
            {
              id: 3,
              sender: activeConversation,
              recipient: "You",
              message: "This is a dummy message.",
              time: "Just now",
            },
            {
              id: 4,
              sender: activeConversation,
              recipient: "You",
              message: "Another dummy message.",
              time: "2 mins ago",
            },
          ];
          setMessages((prevMessages) => [...prevMessages, ...dummyMessages]);
        } catch (error) {
          setError("Error fetching messages. Please try again.");
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [activeConversation]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    const newMessageObj = {
      id: messages.length + 1, // Generate a unique ID for the new message
      sender: "You",
      recipient: activeConversation,
      message: newMessage,
      time: new Date().toLocaleTimeString(),
    };

    try {
      // Simulate API call
      // const response = await axios.post("/api/messages", newMessageObj);
      // if (response.data) {
      //   setMessages((prevMessages) => [...prevMessages, response.data]); // Add the new message to the messages state
      // }

      // Add the new message to the state directly
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");
    } catch (error) {
      setError("Error sending message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  // Handle search for connections
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle selecting a connection
  const handleSelectConnection = (connection) => {
    setActiveConversation(connection.id);
  };

  // Navigation handlers
  const handleProfileClick = () => navigate("/dashboard");
  const handleMessageClick = () => navigate("/messages/Abhijeet");
  const handleJobs = () => navigate("/jobs");
  const handleNetwork = () => navigate("/myNetwork");
  const handleNotification = () => navigate("/notification");
  const handleHome = () => navigate("/home");

  // Filter connections based on search query
  const filteredConnections = connections.filter((connection) =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter messages for the active conversation
  const filteredMessages = activeConversation
    ? messages.filter(
        (message) =>
          (message.sender === activeConversation && message.recipient === "You") ||
          (message.recipient === activeConversation && message.sender === "You")
      )
    : [];

  // Log filtered messages for debugging
  useEffect(() => {
    console.log("Filtered messages:", filteredMessages);
  }, [filteredMessages]);

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
            placeholder="Search connections..."
            value={searchQuery}
            onChange={handleSearchChange}
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
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleNotification}>
                  <FaBell /> Notifications
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

      <div className="row mt-4">
        {/* Sidebar */}
        <aside className="col-md-3 col-12 mb-4">
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action">
              <FaEllipsisH /> My Connections
            </a>

            {/* List of connections */}
            {loading ? (
              <p>Loading connections...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              filteredConnections.map((connection) => (
                <a
                  key={connection.id}
                  href="#"
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectConnection(connection)}
                >
                  {connection.name}
                </a>
              ))
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-md-9 col-12">
          <div className="card mb-4">
            <div className="card-body">
              {/* Message List */}
              <div className="message-list">
                {loading ? (
                  <p>Loading messages...</p>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : filteredMessages.length === 0 ? (
                  <p>Select a connection to start chatting.</p>
                ) : (
                  filteredMessages.map((message) => (
                    <div key={message.id} className="d-flex justify-content-between mb-3">
                      <div>
                        <strong>{message.sender}</strong>
                        <p>{message.message}</p>
                      </div>
                      <span className="text-muted">{message.time}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              {activeConversation && (
                <div className="message-input mt-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleSendMessage}
                  >
                    <FaPaperPlane /> Send
                  </button>
                </div>
              )}
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

export default MessageComponent;