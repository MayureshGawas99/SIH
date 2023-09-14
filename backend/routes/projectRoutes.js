const express = require("express");
const { createProject } = require("../controllers/projectControllers");
const { protect } = require("../middleware/authMiddleware");
const Project = require("../models/projectModel");


const multer= require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });   
    const router = express.Router();


  const upload = multer({ storage: storage });

  router.route("/create").post( upload.single('pdfFile'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const pdfPath = req.file.path;
      console.log("in create")
      const newPdf = new Project({ title, description,document: pdfPath });
      await newPdf.save();
  
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ message: 'File upload failed' });
    }
  });



// router.route("/create").post(protect,upload.single('pdf'), createProject);

module.exports = router;
