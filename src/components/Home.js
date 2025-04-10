import React, { useState, useEffect } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaSearch,
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [feed, setFeed] = useState([
    // Dummy data entry
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://via.placeholder.com/150",
      postText: "This is a dummy post to test the feed!",
      postType: "text",
      postMedia: null,
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [postLikes, setPostLikes] = useState({});
  const [postComments, setPostComments] = useState({});
  const [showShareOptions, setShowShareOptions] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [imagePreview, setImagePreview] = useState(null);
  const [profileName, setProfileName] = useState("Abhijeet Sawant");
  const [profileRole, setProfileRole] = useState("Student");

  const navigate = useNavigate();

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.get(`http://localhost:8787/api/auth/profile?email=${email}`);
        if (response.data && response.data.success) {
          setProfilePic(response.data.profileImage || "https://via.placeholder.com/150");
          setProfileName(response.data.profileName || "Unknown User");
          setProfileRole(response.data.profileRole || "No Role Assigned");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://api.example.com/posts");
        if (response.data && response.data.success) {
          setFeed(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePost = () => {
    if (!postText && !selectedImage && !selectedEvent) {
      alert("Please write something or select a media/event to post.");
      return;
    }

    const newPost = {
      id: feed.length + 1,
      name: profileName,
      profilePic: profilePic,
      postText: postText,
      postType: selectedImage ? "image" : selectedEvent ? "event" : "text",
      postMedia: selectedImage || selectedEvent || null,
    };

    setFeed([newPost, ...feed]);
    setPostText("");
    setSelectedImage(null);
    setSelectedEvent(null);
  };

  const handleLike = (postId) => {
    if (postLikes[postId]) {
      setPostLikes((prevLikes) => {
        const newLikes = { ...prevLikes };
        delete newLikes[postId];
        return newLikes;
      });
    } else {
      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: true,
      }));
    }
  };

  const handleComment = (postId) => {
    setShowCommentBox(postId);
  };

  const handleCommentSubmit = (postId) => {
    if (newComment[postId]) {
      setPostComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), { text: newComment[postId], user: profileName, time: new Date().toLocaleTimeString() }],
      }));
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      setShowCommentBox(null);
    }
  };

  const handleShare = (postId) => {
    setShowShareOptions(postId);
  };

  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  const handleMessageClick = () => {
    navigate("/messages/Abhijeet");
  };

  const handleJobs = () => {
    navigate("/jobs");
  };

  const handleNetwork = () => {
    navigate("/myNetwork");
  };

  const handleNotification = () => {
    navigate("/notification");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    document.getElementById("profile-pic-input").click();
  };

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

      {/* Main Content */}
      <div className="row mt-4">
        {/* Sidebar */}
        <aside className="col-md-3 col-12 mb-4">
          <div className="card">
            <div
              onClick={handleProfileImageClick}
              className="d-flex justify-content-center align-items-center position-relative"
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: imagePreview ? "transparent" : "#f0f0f0",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                margin: "0 auto",
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-100 h-100 object-fit-cover"
                />
              ) : (
                <FaUserCircle size={80} color="gray" />
              )}
            </div>
            <div className="card-body text-center">
              <h5 className="card-title">{profileName}</h5>
              <p className="card-text">{profileRole}</p>
            </div>
          </div>
          <input
            type="file"
            id="profile-pic-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
          />
        </aside>

        {/* Feed */}
        <main className="col-md-9 col-12">
          <div className="feed">
            {feed.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={item.profilePic}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      onClick={() => handleProfileClick(item.id)}
                    />
                    <div>
                      <h5 className="ms-2">{item.name}</h5>
                      <p className="text-muted ms-2">{profileRole}</p>
                    </div>
                  </div>
                  {item.postType === "text" && <p>{item.postText}</p>}
                  {item.postType === "image" && <img src={item.postMedia} alt="Post" className="img-fluid" />}
                  <div className="mt-3">
                    <button
                      className={`btn ${postLikes[item.id] ? "btn-primary" : "btn-outline-secondary"} me-2`}
                      onClick={() => handleLike(item.id)}
                    >
                      <FaThumbsUp /> Like
                    </button>
                    <button className="btn btn-outline-secondary me-2" onClick={() => handleComment(item.id)}>
                      <FaComment /> Comment
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => handleShare(item.id)}>
                      <FaShare /> Share
                    </button>
                  </div>

                  {/* Comment Box */}
                  {showCommentBox === item.id && (
                    <div className="mt-3 d-flex">
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Type your comment..."
                        value={newComment[item.id] || ""}
                        onChange={(e) => setNewComment({ ...newComment, [item.id]: e.target.value })}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCommentSubmit(item.id)}
                      >
                        Submit
                      </button>
                    </div>
                  )}

                  {/* Render Comments */}
                  {postComments[item.id] &&
                    postComments[item.id].map((comment, index) => (
                      <div key={index} className="mt-2">
                        <p>
                          <strong>{comment.user}</strong> ({comment.time}): {comment.text}
                        </p>
                      </div>
                    ))}

                  {/* Share Options */}
                  {showShareOptions === item.id && (
                    <div className="mt-3">
                      <p>Share via:</p>
                      <button className="btn btn-outline-primary">
                        <FaWhatsapp /> WhatsApp
                      </button>
                      <button className="btn btn-outline-primary">
                        <FaInstagram /> Instagram
                      </button>
                      <button className="btn btn-outline-primary">
                        <FaLinkedin /> LinkedIn
                      </button>
                      <button className="btn btn-outline-primary">
                        <FaFacebook /> Facebook
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
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

export default Home;