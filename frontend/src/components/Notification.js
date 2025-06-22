// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector(store => store.user);

  console.log(user, "user in notification page");
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:3080/api/v1/notifications/${user._id}`);
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, []);
console.log(notifications, "notifications in notification page");
  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className="notification-card">
            <p> {notification.sender.username} {notification.type}  </p>
            <small>{new Date(notification.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
