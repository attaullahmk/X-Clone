import Bookmark from "../models/bookmarkSchema.js";

// Toggle bookmark (add if not exists, remove if exists)
// import Bookmark from "../models/bookmarkSchema.js";

// Toggle bookmark (add if not exists, remove if exists)
export const toggleBookmark = async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
    const existing = await Bookmark.findOne({ userId, postId });

    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Post unbookmarked" });
    } else {
      await Bookmark.create({ userId, postId });
      return res.status(201).json({ message: "Post bookmarked" });
    }
  } catch (error) {
    console.error("Toggle Bookmark Error:", error); // 👈 add this for debugging
    return res.status(500).json({ error: "Server error" });
  }
};



// Get all bookmarks for a user
// export const getBookmarks = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const bookmarks = await Bookmark.find({ userId }).populate("postId");
//     return res.status(200).json(bookmarks);
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// import { Bookmark } from "../models/Bookmark.js";

export const getBookmarks = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookmarks = await Bookmark.find({ userId })
      .populate({
        path: "postId",
        populate: {
          path: "userId", // This gets user details inside each tweet
          model: "User",
          select: "username name email" // You can add profilePic if needed
        }
      });
      console.log(bookmarks);

    // Only return valid posts (e.g., skip deleted tweets)
    const bookmarkedTweets = bookmarks
      .filter(bookmark => bookmark.postId)
      .map(bookmark => bookmark.postId);

    return res.status(200).json(bookmarkedTweets);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return res.status(500).json({ error: "Server error" });
  }
};





// Check if user bookmarked a specific post
export const checkBookmark = async (req, res) => {
  const { userId } = req.query;
  const { postId } = req.params;

  try {
    const existing = await Bookmark.findOne({ userId, postId });
    return res.status(200).json({ bookmarked: !!existing });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
