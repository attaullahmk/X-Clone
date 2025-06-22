// import express from "express";
// import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from "../controllers/tweetController.js";
// import isAuthenticated from "../config/auth.js";

// const router = express.Router();
 
// // router.route("/create").post(isAuthenticated,createTweet);
// router.route("/create").post(isAuthenticated,createTweet);
// router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
// router.route("/like/:id").put(isAuthenticated,likeOrDislike);
// router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
// router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);
// export default router;



import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getFollowingTweets,
  likeOrDislike,
  getAllTweetUser,
  getTrendingTweets
} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";
import { upload } from "../middlewares/multer.js"; // ✅ Import multer setup

const router = express.Router();

// ✅ Upload multiple images with authentication
router.route("/create").post(
  isAuthenticated,
  upload.array("images", 5), // Accept up to 5 image files
  createTweet
);

router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/alltweetuser/:id").get(isAuthenticated, getAllTweetUser);
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);
router.route("/trending").get(isAuthenticated, getTrendingTweets);
export default router;
