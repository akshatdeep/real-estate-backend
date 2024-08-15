// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../public/uploads")); // Adjust the path as needed
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${req.user.id}-${Date.now()}${path.extname(
//       file.originalname
//     )}`;
//     cb(null, uniqueSuffix);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
