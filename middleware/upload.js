const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const cloudinary_upload_config = {
  folder: "mongoo-learning",
  allowed_formats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "mongoo-learning",
//     allowed_formats: ["jpg", "png", "jpeg"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//   }
// });

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = { upload, cloudinary, cloudinary_upload_config };
