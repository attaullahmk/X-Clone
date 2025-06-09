import { Comment } from "../models/commentSchema.js";
import { Tweet } from "../models/tweetSchema.js";

// Create a comment
export const createComment = async (req, res) => {
    try {
        const { tweetId, content } = req.body;

        const userId = req.body.userId;
console.log("req ", req.body);
console.log("REQUSERID", userId);

        const newComment = new Comment({ tweetId, userId, content });
        const savedComment = await newComment.save();

        // Add comment to the tweet
        await Tweet.findByIdAndUpdate(tweetId, {
            $push: { comments: savedComment._id }
        });

        // Populate the user for the returned comment
        const populatedComment = await Comment.findById(savedComment._id).populate("userId", "name username");

        res.status(201).json(populatedComment);
    } catch (err) {
        res.status(500).json({ error: "Failed to create comment", details: err.message });
    }
};


// Get all comments for a specific tweet
export const getCommentsByTweet = async (req, res) => {
    try {
        const { tweetId } = req.params;
        console.log("TWEETS", tweetId);

        const comments = await Comment.find({ tweetId })
            .populate("userId", "username")
            .sort({ createdAt: -1 }); // Sort newest first

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch comments", details: err.message });
    }
};


// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);

        if (!comment) return res.status(404).json({ error: "Comment not found" });
        if (comment.userId.toString() !== userId) return res.status(403).json({ error: "Unauthorized" });

        comment.content = req.body.content;
        const updatedComment = await comment.save();

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: "Failed to update comment", details: err.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);

        if (!comment) return res.status(404).json({ error: "Comment not found" });
        if (comment.userId.toString() !== userId) return res.status(403).json({ error: "Unauthorized" });

        await Comment.findByIdAndDelete(commentId);

        // Remove comment reference from tweet
        await Tweet.findByIdAndUpdate(comment.tweetId, {
            $pull: { comments: commentId }
        });

        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment", details: err.message });
    }
};
