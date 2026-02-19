const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "public", "uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "user-" + req.session.user.id + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;
