import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./authStyle.css";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification"

const Register = ({ regData }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [notification, setNotification] = useState(null);
  const data = { name, email, password };
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setNotification({ message: "Register Successful!", type: "success" });
    regData(data);
    setTimeout(() => {
      setNotification(null);
      navigate("/login");
    }, 1000);
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Join Us!</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control auth-input"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control auth-input"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              className="form-control auth-input"
              id="pwd"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleRegister} className="btn auth-btn">
            Register
          </button>
        </form>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
