import React from "react";
import Chatpage from "./ChatPage";
import { Link } from "react-router-dom";
import ProjectCard from "../components/layout/ProjectCard";

const LoginHome = () => {
  const Categories = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Web Development",
    "Mobile App Development",
  ];

  const RecentProject = [
    { title: "Python3 Project", tech: ["Python3"] },
    { title: "Java Project", tech: ["Java", "Swing"] },
    { title: "React Project", tech: ["MongoDB", "React", "Node"] },
    { title: "Python# Project", tech: ["C#"] },
  ];

  const TrendingProjects = [
    { title: "Machine Learning Model", tech: ["Machine Learning"] },
    { title: "AI Chatbot", tech: ["Artificial Intelligence"] },
    { title: "Data Analysis Dashboard", tech: ["Data Science", "Web Development"] },
    { title: "Mobile App Development", tech: ["Mobile App Development"] },
  ];

  return (
    <div className="row h-100 w-100">
      <div className="col-md-8">
        <div className="container mb-2">
          <h3>Categories</h3>
          <div>
            <button
              type="button"
              className="btn btn-info me-2"
              style={{ borderRadius: "50px" }}
            >
              All Categories
            </button>
            {Categories.map((cat, index) => (
              <button
                key={index}
                type="button"
                className="btn btn-outline-info me-2"
                style={{ borderRadius: "50px", color: "black" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="container">
          <Link to={"/"} className="d-flex justify-content-between">
            <h3>Recently Added</h3>
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
          <div className="d-flex gap-2 overflow-auto">
            {RecentProject.map((pro, index) => (
              <div key={index}>
                <ProjectCard title={pro.title} tech={pro.tech} />
              </div>
            ))}
          </div>
        </div>

        {/* Trending Projects Section */}
        <div className="container mt-4">
          <Link to={"/"} className="d-flex justify-content-between">
            <h3>Trending Projects</h3>
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
          <div className="d-flex gap-2 overflow-auto">
            {TrendingProjects.map((pro, index) => (
              <div key={index}>
                <ProjectCard title={pro.title} tech={pro.tech} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-md-4 border-start">
        <Chatpage />
      </div>
    </div>
  );
};

export default LoginHome;