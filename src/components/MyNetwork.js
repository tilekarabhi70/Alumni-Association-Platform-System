import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserFriends,
  FaUserCircle,
  FaSearch,
  FaHome,
  FaBriefcase,
  FaEnvelope,
  FaBell,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const MyNetwork = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("Abhijeet Sawant");
  const [profileTitle, setProfileTitle] = useState("Alumni");
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "John Doe",
      title: "Software Engineer",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Product Manager",
      image: "https://via.placeholder.com/150",
    },
  ]);
  const [pendingConnections, setPendingConnections] = useState([
    {
      id: 3,
      name: "Alice Johnson",
      title: "Data Scientist",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Bob Brown",
      title: "UX Designer",
      image: "https://via.placeholder.com/150",
    },
  ]);
  const [suggestedConnections, setSuggestedConnections] = useState([
    {
      id: 5,
      name: "Charlie Davis",
      title: "DevOps Engineer",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Eve White",
      title: "Frontend Developer",
      image: "https://via.placeholder.com/150",
    },
  ]);
  const [activeTab, setActiveTab] = useState("suggested");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Fetch profile and connections (API code remains unchanged)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get("/api/user/profile");
        const connectionsResponse = await axios.get("/api/connections");
        const pendingResponse = await axios.get("/api/pending-connections");
        const suggestedResponse = await axios.get("/api/suggested-connections");

        if (profileResponse.data) {
          setProfileImage(profileResponse.data.profileImage || null);
          setProfileName(profileResponse.data.profileName || "Unknown User");
          setProfileTitle(profileResponse.data.profileTitle || "Alumni");
        }
        if (connectionsResponse.data) {
          setConnections(connectionsResponse.data.connections);
        }
        if (pendingResponse.data) {
          setPendingConnections(pendingResponse.data.pendingConnections);
        }
        if (suggestedResponse.data) {
          setSuggestedConnections(suggestedResponse.data.suggestedConnections);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Real-time updates with WebSocket (API code remains unchanged)
  useEffect(() => {
    const socket = new WebSocket("ws://your-backend-url/ws");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_CONNECTION") {
        setConnections((prev) => [...prev, data.connection]);
      } else if (data.type === "CONNECTION_REQUEST") {
        setPendingConnections((prev) => [...prev, data.request]);
      }
    };

    return () => socket.close();
  }, []);

  // Dummy logic for adding a connection (for testing purposes)
  const handleAddConnection = async (id) => {
    try {
      // Simulate API call for testing
      console.log("Simulating API call to add connection...");

      // Find the user in suggestedConnections
      const user = suggestedConnections.find((user) => user.id === id);
      if (user) {
        // Move the user to pendingConnections
        setPendingConnections((prev) => [...prev, { ...user, isPending: true }]);
        // Remove the user from suggestedConnections
        setSuggestedConnections((prev) => prev.filter((user) => user.id !== id));
        alert("Connection request sent!");
      }
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  // Dummy logic for confirming a connection (for testing purposes)
  const handleConfirmConnection = async (id) => {
    try {
      // Simulate API call for testing
      console.log("Simulating API call to confirm connection...");

      // Find the user in pendingConnections
      const user = pendingConnections.find((user) => user.id === id);
      if (user) {
        // Move the user to connections
        setConnections((prev) => [...prev, { ...user, isConnected: true }]);
        // Remove the user from pendingConnections
        setPendingConnections((prev) => prev.filter((user) => user.id !== id));
        alert(`${user.name} is now connected.`);
      }
    } catch (error) {
      console.error("Error confirming connection:", error);
    }
  };

  const filteredConnections = connections.filter((connection) =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestedConnections = suggestedConnections.filter((connection) =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid">
      {/* Header and Search Bar */}
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
                <a className="nav-link text-white" href="#" onClick={() => navigate("/home")}>
                  <FaHome /> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={() => navigate("/myNetwork")}>
                  <FaUserFriends /> My Network
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={() => navigate("/jobs")}>
                  <FaBriefcase /> Jobs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={() => navigate("/messages/Abhijeet")}>
                  <FaEnvelope /> Messaging
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={() => navigate("/notification")}>
                  <FaBell /> Notifications
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white" onClick={() => navigate("/dashboard")}>
                  <FaUserCircle /> Profile
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Dashboard */}
      <div className="row mt-4">
        {/* Left Sidebar */}
        <aside className="col-md-3 col-12 mb-4">
          <div className="card">
            <div
              onClick={() => {
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
              }}
              className="d-flex justify-content-center align-items-center position-relative"
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: profileImage ? "transparent" : "#f0f0f0",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                margin: "0 auto",
              }}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-100 h-100 object-fit-cover"
                />
              ) : (
                <FaUserCircle size={80} color="gray" />
              )}
            </div>
            <div className="card-body text-center">
              <h5 className="card-title">{profileName}</h5>
              <p className="card-text">{profileTitle}</p>
            </div>
          </div>
          <div className="list-group mt-3">
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                activeTab === "connections" ? "active" : ""
              }`}
              onClick={() => setActiveTab("connections")}
            >
              Connections
            </a>
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                activeTab === "pending" ? "active" : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Connections
            </a>
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                activeTab === "suggested" ? "active" : ""
              }`}
              onClick={() => setActiveTab("suggested")}
            >
              People You May Know
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-md-6 col-12">
          {activeTab === "connections" && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Your Connections</h5>
                <div className="list-group">
                  {filteredConnections.map((connection) => (
                    <div
                      key={connection.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div
                        className="d-flex align-items-center"
                        onClick={() => navigate(`/profile/${connection.id}`)}
                      >
                        <img
                          src={connection.image}
                          alt="Profile"
                          className="rounded-circle me-3"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div>
                          <h6 className="mb-0">{connection.name}</h6>
                          <p className="text-muted mb-0">{connection.title}</p>
                        </div>
                      </div>
                      <button className="btn btn-success btn-sm" disabled>
                        Connected
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "pending" && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Pending Connections</h5>
                <div className="list-group">
                  {pendingConnections.map((connection) => (
                    <div
                      key={connection.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div
                        className="d-flex align-items-center"
                        onClick={() => navigate(`/profile/${connection.id}`)}
                      >
                        <img
                          src={connection.image}
                          alt="Profile"
                          className="rounded-circle me-3"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div>
                          <h6 className="mb-0">{connection.name}</h6>
                          <p className="text-muted mb-0">{connection.title}</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleConfirmConnection(connection.id)}
                      >
                        Confirm
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "suggested" && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">People You May Know</h5>
                <div className="list-group">
                  {filteredSuggestedConnections.map((connection) => (
                    <div
                      key={connection.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div
                        className="d-flex align-items-center"
                        onClick={() => navigate(`/profile/${connection.id}`)}
                      >
                        <img
                          src={connection.image}
                          alt="Profile"
                          className="rounded-circle me-3"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div>
                          <h6 className="mb-0">{connection.name}</h6>
                          <p className="text-muted mb-0">{connection.title}</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddConnection(connection.id)}
                        disabled={connection.isPending || connection.isConnected}
                      >
                        {connection.isPending ? "Pending" : connection.isConnected ? "Connected" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 bg-light mt-4">
        <p>&copy; 2025 AIT-YCP | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default MyNetwork;