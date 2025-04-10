import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBriefcase,
  FaHome,
  FaSearch,
  FaUserCircle,
  FaUserFriends,
  FaEnvelope,
  FaBell,
  FaPlusCircle,
  FaTrashAlt,
  FaEdit,
  FaBookmark,
  FaRegClipboard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    type: "Full-time",
    id: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [viewCreatedJobs, setViewCreatedJobs] = useState(false);
  const [viewAppliedJobs, setViewAppliedJobs] = useState(false);
  const [viewSavedJobs, setViewSavedJobs] = useState(false);
  const [profile, setProfile] = useState({
    name: "Abhijeet Sawant",
    role: "Software Developer",
    profilePicture: "",
  });
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:8787/api"; // Replace with your API base URL

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch my created jobs from the API
  const fetchMyJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`);
      setMyJobs(response.data);
    } catch (error) {
      console.error("Error fetching my jobs:", error);
    }
  };

  // Fetch applied jobs from the API
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applied-jobs`);
      setAppliedJobs(response.data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  // Fetch saved jobs from the API
  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/saved-jobs`);
      setSavedJobs(response.data);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  // Fetch user profile from the API
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchMyJobs();
    fetchAppliedJobs();
    fetchSavedJobs();
    fetchProfile();
  }, []);

  const handleJobSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateJob = () => {
    setShowCreateJobModal(true);
    setIsEditing(false);
    setNewJob({
      title: "",
      company: "",
      location: "",
      description: "",
      type: "Full-time",
      id: null,
    });
  };

  const handleCloseCreateJobModal = () => {
    setShowCreateJobModal(false);
  };

  const handlePostJob = async () => {
    try {
      if (isEditing) {
        // Update existing job
        await axios.put(`http://localhost:8787/api/jobs/${newJob.id}/update`, newJob);
        fetchJobs();
        fetchMyJobs();
      } else {
        // Create new job
        const jobToPost = {
          ...newJob,
          id: jobs.length + 1,
          date: new Date().toISOString().split("T")[0],
          createdByUser: true,
        };
        await axios.post(`${API_BASE_URL}/jobs`, jobToPost);
        fetchJobs();
        fetchMyJobs();
      }
      setShowCreateJobModal(false);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8787/api/jobs/${id}/delete`);
      fetchJobs();
      fetchMyJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEditJob = (id) => {
    const jobToEdit = myJobs.find((job) => job.id === id);
    setNewJob(jobToEdit);
    setIsEditing(true);
    setShowCreateJobModal(true);
  };

  const handleApplyJob = async (id) => {
    try {
      const jobToApply = jobs.find((job) => job.id === id);
      if (!appliedJobs.some((job) => job.id === id)) {
        await axios.post(`${API_BASE_URL}/applied-jobs`, jobToApply);
        fetchAppliedJobs();
      }
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };

  const handleSaveJob = async (id) => {
    try {
      const jobToSave = jobs.find((job) => job.id === id);
      if (!savedJobs.some((job) => job.id === id)) {
        await axios.post(`${API_BASE_URL}/saved-jobs`, jobToSave);
        fetchSavedJobs();
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleRemoveSavedJob = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/saved-jobs/${id}`);
      fetchSavedJobs();
    } catch (error) {
      console.error("Error removing saved job:", error);
    }
  };

  const handleViewCreatedJobs = () => {
    setViewCreatedJobs(true);
    setViewAppliedJobs(false);
    setViewSavedJobs(false);
  };

  const handleViewAppliedJobs = () => {
    setViewCreatedJobs(false);
    setViewAppliedJobs(true);
    setViewSavedJobs(false);
  };

  const handleViewSavedJobs = () => {
    setViewCreatedJobs(false);
    setViewAppliedJobs(false);
    setViewSavedJobs(true);
  };

  const handleViewAllJobs = () => {
    setViewCreatedJobs(false);
    setViewAppliedJobs(false);
    setViewSavedJobs(false);
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

  const handleNetwok = () => {
    navigate("/myNetwork");
  };

  const handleNotifiaction = () => {
    navigate("/notification");
  };

  const handlehome = () => {
    navigate("/Home");
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
            value={searchQuery}
            onChange={handleJobSearch}
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
                <a className="nav-link text-white" href="#" onClick={handlehome}>
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
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <FaUserCircle size={80} color="gray" />
              )}
            </div>
            <div className="card-body text-center">
              <h5 className="card-title">{profile.name}</h5>
              <p className="card-text">{profile.role}</p>
            </div>
          </div>
          <div className="list-group mt-3">
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={handleViewAllJobs}
            >
              All Jobs
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={handleViewCreatedJobs}
            >
              Created Jobs
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={handleViewAppliedJobs}
            >
              Applied Jobs
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={handleViewSavedJobs}
            >
              Saved Jobs
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Groups
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Events
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Courses
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={handleCreateJob}
            >
              <FaPlusCircle /> Create Job
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-md-9 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <h3>
                {viewCreatedJobs
                  ? "My Created Jobs"
                  : viewAppliedJobs
                  ? "My Applied Jobs"
                  : viewSavedJobs
                  ? "My Saved Jobs"
                  : "Job Listings"}
              </h3>
              {viewCreatedJobs ? (
                myJobs.length > 0 ? (
                  myJobs.map((job) => (
                    <div key={job.id} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {job.company}
                        </h6>
                        <p className="card-text">{job.description}</p>
                        <p className="card-text">
                          <strong>Location:</strong> {job.location}
                        </p>
                        <p className="card-text">
                          <strong>Job Type:</strong> {job.type}
                        </p>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEditJob(job.id)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>You haven't created any jobs yet.</p>
                )
              ) : viewAppliedJobs ? (
                appliedJobs.length > 0 ? (
                  appliedJobs.map((job) => (
                    <div key={job.id} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {job.company}
                        </h6>
                        <p className="card-text">{job.description}</p>
                        <p className="card-text">
                          <strong>Location:</strong> {job.location}
                        </p>
                        <p className="card-text">
                          <strong>Job Type:</strong> {job.type}
                        </p>
                        <p className="card-text">
                          <strong>Applied on:</strong> {job.date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>You haven't applied to any jobs yet.</p>
                )
              ) : viewSavedJobs ? (
                savedJobs.length > 0 ? (
                  savedJobs.map((job) => (
                    <div key={job.id} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {job.company}
                        </h6>
                        <p className="card-text">{job.description}</p>
                        <p className="card-text">
                          <strong>Location:</strong> {job.location}
                        </p>
                        <p className="card-text">
                          <strong>Job Type:</strong> {job.type}
                        </p>
                        <p className="card-text">
                          <strong>Saved on:</strong> {job.date}
                        </p>
                        <button
                          className="btn btn-info me-2"
                          onClick={() => handleApplyJob(job.id)}
                        >
                          <FaRegClipboard /> Apply
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoveSavedJob(job.id)}
                        >
                          <FaTrashAlt /> Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>You haven't saved any jobs yet.</p>
                )
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{job.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {job.company}
                      </h6>
                      <p className="card-text">{job.description}</p>
                      <p className="card-text">
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p className="card-text">
                        <strong>Job Type:</strong> {job.type}
                      </p>
                      <p className="card-text">
                        <strong>Posted on:</strong> {job.date}
                      </p>
                      <button
                        className="btn btn-info me-2"
                        onClick={() => handleApplyJob(job.id)}
                      >
                        <FaRegClipboard /> Apply
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleSaveJob(job.id)}
                      >
                        <FaBookmark /> Save
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No jobs found based on your search criteria.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create Job Modal */}
      {showCreateJobModal && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={handleCloseCreateJobModal}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Job" : "Create Job"}
                </h5>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    value={newJob.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={newJob.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Job Type</label>
                  <select
                    className="form-control"
                    id="type"
                    name="type"
                    value={newJob.type}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseCreateJobModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePostJob}
                >
                  {isEditing ? "Update Job" : "Post Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default JobPage;