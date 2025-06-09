// routes/followRoutes.js
import express from 'express';
import {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
} from '../controllers/followingController.js';

const router = express.Router();

// POST /api/follow - Follow a user
router.post('/', followUser);

// DELETE /api/follow - Unfollow a user
router.delete('/', unfollowUser);

// GET /api/follow/:userId/following - Get users I follow
router.get('/:userId/following', getFollowing);

// GET /api/follow/:userId/followers - Get my followers
router.get('/:userId/followers', getFollowers);

export default router;
