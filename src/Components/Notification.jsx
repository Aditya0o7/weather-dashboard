
import React from "react";
import "./notificationStyle.css";

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
};

export default Notification;
