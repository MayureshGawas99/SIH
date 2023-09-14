const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    proj_title: { type: String, },
    domain: { type: [String],  },
    description: { type: String, },
    techstack: { type: [String],  },
    contributors: { type: [String], },
    mentors: { type: String, },
    proj_img: { type: [String], default:"https://tse1.mm.bing.net/th?id=OIP.cRelEBJ_mXC2SwuZA6ljMwHaHa&pid=Api&P=0&h=180"  },
    proj_document: { type: Buffer,  },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;