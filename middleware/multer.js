const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media", //path from app.js pv
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${req.body.name}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
