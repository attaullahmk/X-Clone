import express from 'express';
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead
} from '../controllers/notificationController.js';

const router = express.Router();

// Create a new notification
router.post('/', createNotification);

// Get all notifications for a user
router.get('/:userId', getUserNotifications);

// Mark a specific notification as read
router.patch('/read/:id', markAsRead);

// Mark all notifications as read for a user
router.patch('/read-all/:userId', markAllAsRead);

export default router;
