
# X-Clone 🐦

A full-stack social media platform inspired by Twitter. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js), this application allows users to share thoughts, images, interact with others, and build a personal network. Key features include authentication, posting, commenting, liking, bookmarking, following, and image uploads via Cloudinary.

---

## 🚀 Live Demo

[🔗 Live URL (if deployed)](https://your-live-link.com)

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Axios
- React Router
- Cloudinary (for image uploads)
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- Multer + Cloudinary SDK (File handling)

---

## 📁 Project Structure

```
X-CLONE/
├── backend/
│   ├── config/           # Database and cloud setup
│   ├── controllers/      # Request logic
│   ├── mid/              # (Additional helpers or utils)
│   ├── middlewares/      # Auth, error handling
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route handlers
│   ├── uploads/          # Local uploads if used
│   ├── index.js          # Entry point
│   └── .env              # Backend environment config
│
├── frontend/
│   ├── public/           # Static files
│   ├── src/              # React components, Redux setup
│   ├── .env              # Frontend config
│   └── package.json
│
├── README.md
```

---

## 🌟 Features

- 🔐 User Signup/Login with JWT & Redux
- 🖼️ Post text and image-based content
- 💬 Comment on posts
- ❤️ Like and 📌 Bookmark posts
- 👥 Follow and unfollow users
- 👤 Profile with uploaded avatar and bio
- ☁️ Image upload via Cloudinary
- 📱 Fully responsive with clean UI

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/attaullahmk/x-clone.git
cd x-clone
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧪 Testing the App

- Register and login
- Create and delete posts
- Like, comment, and bookmark
- Follow and unfollow other users
- Upload a profile picture and images with posts

---

## 📸 Screenshots

> *(Add screenshots later as you complete the UI)*

---

## 📂 GitHub Repository

[GitHub – X Clone](https://github.com/attaullahmk/x-clone)

---

## 🧑‍💻 Author

**Atta Ullah** – [GitHub](https://github.com/attaullahmk)  
Final Year Software Engineering Student | University of Malakand

---

## 📄 License

This project is licensed under the MIT License – feel free to use and modify.
