const express = require("express");
const { createProject } = require("../controllers/projectControllers");
const { protect } = require("../middleware/authMiddleware");

const multer= require("multer");

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });
const router = express.Router();

router.route("/create").post(protect, createProject);
// router.route("/create").post(protect,upload.single('pdf'), createProject);

module.exports = router;
