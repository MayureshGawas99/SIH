// / Set up Multer for file uploads
const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");


const createProject = asyncHandler( async (req, res) => {
    try {

    //   if (!req.file) {
    //     return res.status(400).send('No PDF file uploaded.');
    //   }
    //   if (!req.projectTitle) {
    //     return res.status(400).send('No title.');
    //   }if (!req.contributors) {
    //     return res.status(400).send('No Contributors.');
    //   }
      const{proj_title,domain,description,techstack,contributors,mentors} = req.body
      console.log(req.body)
      // Access the uploaded PDF data as a buffer
    //   const pdfData = req.file.buffer;
    //   const newProject = new Project({
    //     proj_title: projectTitle, // Set your project name here
    //     domain: domains,
    //     description,
    //     techstack:techstacks,
    //     contributors,
    //     mentors:mentor,
    //     proj_document: pdfData,    // Store the PDF data as a buffer
    //   });
  
      // Insert the new Project document into the "projects" collection
    //   const result = await Project.collection.insertOne(newProject);
      
      // You can display the PDF data in the console
    //   console.log('REs:', result);
  
      res.status(200).send('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    }
  });
  
  module.exports = {
    createProject
  };