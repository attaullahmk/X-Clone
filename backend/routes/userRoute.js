// import express from "express";
// import { Login, Register, bookmark, follow, getMyProfile, getOtherUsers, logout, unfollow } from "../controllers/userController.js";
// import isAuthenticated from "../config/auth.js";

// const router = express.Router();

// router.route("/register").post(Register);
// router.route("/login").post(Login);
// router.route("/logout").get(logout);
// router.route("/bookmark/:id").put(isAuthenticated, bookmark)
// router.route("/profile/:id").get(isAuthenticated, getMyProfile);
// router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
// router.route("/follow/:id").post(isAuthenticated, follow);
// router.route("/unfollow/:id").post(isAuthenticated, unfollow);

// export default router;  working
// import express from "express";
// import {
//     Login,
//     Register,
//     bookmark,
//     follow,
//     getMyProfile,
//     getOtherUsers,
//     logout,
//     unfollow,
//     updateProfile,
//     getUserActivity // ✅ New import added
// } from "../controllers/userController.js";

// import isAuthenticated from "../config/auth.js";
// import { upload } from "../middlewares/multer.js"; // adjust path

// const router = express.Router();

// // 🔐 Auth-related
// router.route("/register").post(Register);
// router.route("/login").post(Login);
// router.route("/logout").get(logout);

// // 📄 Profile
// router.route("/profile/:id").get(isAuthenticated, getMyProfile);
// router.route("/update/:id").put(isAuthenticated, updateProfile);

// // 👥 Users
// router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
// router.route("/follow/:id").post(isAuthenticated, follow);
// router.route("/unfollow/:id").post(isAuthenticated, unfollow);

// // 📌 Bookmark
// router.route("/bookmark/:id").put(isAuthenticated, bookmark);

// // 🧾 User Activity (posts, likes, comments)
// router.route("/activity/:id").get(isAuthenticated, getUserActivity); // ✅ New route added

// export default router;






import express from "express";
import {
  Login,
  Register,
  bookmark,
  follow,
  getMyProfile,
  getOtherUsers,
  logout,
  unfollow,
  updateProfile,
  getUserActivity
} from "../controllers/userController.js";

import isAuthenticated from "../config/auth.js";
import { upload } from "../middlewares/multer.js"; // ✅ Make sure this uses diskStorage if storing locally

const router = express.Router();

// 🔐 Auth
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);

// 📄 Profile
router.route("/profile/:id").get(isAuthenticated, getMyProfile);

// ✅ UPDATED: add multer middleware for profile + cover image
router
  .route("/update/:id")
  .put(
    isAuthenticated,
    upload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "coverPicture", maxCount: 1 }
    ]),
    updateProfile
  );

// 👥 Users
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);

// 📌 Bookmark
router.route("/bookmark/:id").put(isAuthenticated, bookmark);

// 🧾 User Activity
router.route("/activity/:id").get(isAuthenticated, getUserActivity);

export default router;
