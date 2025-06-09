// routes/bookmarkRoutes.js

import express from "express";
import { toggleBookmark, getBookmarks, checkBookmark } from "../controllers/bookmarkController.js";

const router = express.Router();

// Toggle bookmark (bookmark/unbookmark a post)
router.post("/:postId", toggleBookmark);

// Get all bookmarked posts for a user
router.get("/user/:userId", getBookmarks);

// Check if user bookmarked a specific post
router.get("/check/:postId", checkBookmark);

export default router;
