// controllers/followController.js
import Follow from '../models/followingSchema.js';
import User from '../models/userSchema.js';

// Follow a user
export const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  if (followerId === followingId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  try {
    const follow = await Follow.findOne({ follower: followerId, following: followingId });

    if (follow) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    const newFollow = new Follow({ follower: followerId, following: followingId });
    await newFollow.save();

    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to follow user', error });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    const deleted = await Follow.findOneAndDelete({ follower: followerId, following: followingId });

    if (!deleted) {
      return res.status(404).json({ message: 'Follow relationship not found' });
    }

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unfollow user', error });
  }
};

// Get users I follow
export const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const following = await Follow.find({ follower: userId }).populate('following', 'username email');
    res.status(200).json(following.map(f => f.following));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch following', error });
  }
};

// Get my followers
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const followers = await Follow.find({ following: userId }).populate('follower', 'username email');
    res.status(200).json(followers.map(f => f.follower));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch followers', error });
  }
};
