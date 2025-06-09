import express from "express";
import {
  createComment,
  getCommentsByTweet,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

// Create a comment
router.route("/create").post(isAuthenticated, createComment);

// Get all comments for a specific tweet
router.route("/get/:tweetId").get( getCommentsByTweet);

// Update a comment
router.route("/update/:commentId").put(isAuthenticated, updateComment);

// Delete a comment
router.route("/delete/:commentId").delete(isAuthenticated, deleteComment);

export default router;
