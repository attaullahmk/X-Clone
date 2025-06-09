import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);

// Create a unique index on userId + postId to avoid duplicates
bookmarkSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
