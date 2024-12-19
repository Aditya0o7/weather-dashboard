import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./authStyle.css"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification"

const Login = ({ regLogin }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!regLogin || !regLogin.email || !regLogin.password) {
      setNotification({
        message: "User not found! Please register before logging in.",
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
        navigate("/register");
      }, 1000);
    } else if (regLogin.email === email && regLogin.password === password) {
      setNotification({ message: "Login Successful!", type: "success" });
      setTimeout(() => {
        setNotification(null);
        navigate("/dashboard");
      }, 1000);
    } else {
      setNotification({
        message: "Login Failed! Please check your credentials.",
        type: "error",
      });
      
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Welcome Back!</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control auth-input"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control auth-input"
              id="pwd"
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleLogin} className="btn auth-btn">
            Login
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

export default Login;
