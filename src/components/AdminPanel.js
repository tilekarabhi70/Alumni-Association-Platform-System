import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaChartBar, FaUserCog, FaTrashAlt, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [batchQuery, setBatchQuery] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    blockedUsers: 0,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const navigate = useNavigate();

  // Fetch all users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Fetch all users from the API
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8787/api/alumni");
      setUsers(response.data);
      setFilteredUsers(response.data);
      setStats((prevStats) => ({
        ...prevStats,
        totalUsers: response.data.length,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle search button click
  const handleSearchClick = async () => {
    try {
      const response = await axios.get("http://localhost:8787/api/alumni/search", {
        params: {
          name: searchQuery,
          batch: batchQuery,
        },
      });
      console.log("API Response:", response.data); // Log the response
      const users = Array.isArray(response.data) ? response.data : [];
      setFilteredUsers(users);
    } catch (error) {
      console.error("Error filtering users:", error);
      setFilteredUsers([]); // Set to empty array on error
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8787/api/alumni/${id}/delete`);
      // Update local state after deletion
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setStats((prevStats) => ({
        totalUsers: prevStats.totalUsers - 1,
        blockedUsers: prevStats.blockedUsers + 1,
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle user update
  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUser(null);
  };

  const handleUpdateSubmit = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:8787/api/alumni/${updatedUser.id}/update`, updatedUser);
      const updatedUsers = users.map((user) => 
        user.id === updatedUser.id ? response.data : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Navigation handlers
  const handleDashboard = () => navigate("/admin-dashboard");
  const handleUserManagement = () => navigate("/admin-users");
  const handleSettings = () => navigate("/admin-settings");

  // Handle logout
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <div className="logo">
          <img src="images/images.jpeg" alt="Logo" height="40" />
        </div>
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
                <a className="nav-link text-white" href="#" onClick={handleDashboard}>
                  <FaChartBar /> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleUserManagement}>
                  <FaUsers /> Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={handleSettings}>
                  <FaUserCog /> Settings
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

      {/* Main Content */}
      <div className="row mt-4">
        {/* Sidebar */}
        <aside className="col-md-3 col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Admin Panel</h5>
              <ul className="list-group">
                <li className="list-group-item" onClick={handleDashboard}>
                  <FaChartBar /> Dashboard
                </li>
                <li className="list-group-item" onClick={handleUserManagement}>
                  <FaUsers /> Users Management
                </li>
                <li className="list-group-item" onClick={handleSettings}>
                  <FaUserCog /> Settings
                </li>
                <li className="list-group-item" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-md-9 col-12">
          {/* Dashboard Overview */}
          <div className="row">
            <div className="col-md-3 col-12 mb-4">
              <div className="card text-white bg-info">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-12 mb-4">
              <div className="card text-white bg-danger">
                <div className="card-body">
                  <h5 className="card-title">Blocked Users</h5>
                  <p className="card-text">{stats.blockedUsers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="input-group mb-2">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="input-group mb-2">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by batch (Month-Year)"
                value={batchQuery}
                onChange={(e) => setBatchQuery(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSearchClick}
            >
              <FaSearch /> Search
            </button>
          </div>

          {/* User Management */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Batch</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.batch}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleUpdateUser(user)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Update User Modal */}
      {showUpdateModal && selectedUser && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button type="button" className="btn-close" onClick={handleCloseUpdateModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateSubmit(selectedUser);
                }}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="batch" className="form-label">Batch</label>
                    <input
                      type="text"
                      className="form-control"
                      id="batch"
                      value={selectedUser.batch}
                      onChange={(e) => setSelectedUser({ ...selectedUser, batch: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleCloseUpdateModal}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-3 bg-light mt-4">
        <p>&copy; 2025 AIT-YCP | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default AdminPanel;