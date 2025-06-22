// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Create upload directory if it doesn't exist
// const uploadPath = "uploads/";
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// // Use disk storage to store files in /uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
//     cb(null, uniqueName);
//   }
// });

// export const upload = multer({ storage });



import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dap9szynr",
  api_key: "662148712248644",
  api_secret: "zKHkHZY4mp3rilZYsdCogjVWGnc"
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tweets", // Optional folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  },
});

export const upload = multer({ storage });
