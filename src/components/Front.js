import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { FaHome } from 'react-icons/fa'; // Icon for the navbar

const Front = () => {
  return (
    <div className="front-page" style={{
      position: 'relative',
      height: '100vh',
      backgroundImage: 'url(/images/jonatan-pie-h8nxGssjQXs-unsplash.jpg)', // Replace with your image path
      backgroundSize: 'cover', // Makes sure the image covers the entire screen
      backgroundPosition: 'center', // Centers the image
      backgroundAttachment: 'fixed', // Keeps the image fixed during scrolling (optional)
    }}>
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top shadow-lg p-3">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            <FaHome size={30} /> Home
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about" style={{ fontSize: '18px', transition: 'all 0.3s ease' }}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login" style={{ fontSize: '18px', transition: 'all 0.3s ease' }}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="container-fluid d-flex justify-content-center align-items-center text-center" style={{ height: '100%' }}>
        <div className="content-overlay text-white">
          <h1 className="display-3 mb-4 fade-in">Welcome to Our Platform</h1>
          <p className="lead fade-in" style={{ animationDelay: '0.5s' }}>
            Discover new opportunities, connect with people, and expand your network.
          </p>
          <Link to="/about" className="btn btn-primary btn-lg me-3 fade-in" style={{ animationDelay: '1s' }}>
            Learn More
          </Link>
          <Link to="/login" className="btn btn-light btn-lg fade-in" style={{ animationDelay: '1.2s' }}>
            Login
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-white">
        <p>&copy; 2025 AIT-YCP | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Front;
