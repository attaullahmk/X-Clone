// import express from "express";
// import dotenv from "dotenv";
// import databaseConnection from "./config/database.js";
// import cookieParser from "cookie-parser";
// import userRoute from "./routes/userRoute.js";
// import tweetRoute from "./routes/tweetRoute.js";
// import commentRoutes from "./routes/commentRoutes.js"; // ✅ Uncommented and corrected filename
// import bookmarkRoutes from './routes/bookmarkRoutes.js';
// // import searchRoutes from  "./routes/searchRoutes.js";
// import cors from "cors";

// dotenv.config({
//     path: ".env"
// });

// databaseConnection();
// const app = express();

// // middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// const corsOptions = {
//     origin: "http://localhost:3000",
//     credentials: true
// };
// app.use(cors(corsOptions));

// // API routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/tweet", tweetRoute);
// app.use("/api/v1/comment", commentRoutes); // ✅ Enabled comment routes
// app.use('/api/v1/bookmark', bookmarkRoutes);
// // app.use('/api/v1/search', searchRoutes);

// app.listen(process.env.PORT, () => {
//     console.log(`Server listening at port ${process.env.PORT}`);
// });















import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import tweetRoutes from './routes/tweetRoute.js';
import userRoutes from './routes/userRoute.js';
import commentRoutes from './routes/commentRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import exploreRoutes from './routes/exploreRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import followingRoutes from './routes/followingRoutes.js';

// Initialize app and config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3080;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
// app.use("/uploads", express.static("uploads"));


// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/tweet', tweetRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/bookmark', bookmarkRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/v1/notifications',notificationRoutes);
app.use('/api/follow', followingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});