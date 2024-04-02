import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ManageProject.css";

const ManageProject = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://localhost:7193/Project/allProject');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); 
  const handleDelistProject = (projectId) => {
    console.log('Delisting project with ID:', projectId);
  };
  return (
    <div className="manage-project-container">
      <h2>Manage Projects</h2>
      <table className="project-table">
        <thead>
          <tr>
            <th>PID</th>
            <th>Project Name</th>
            <th>Goal</th>
            <th>Shares</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.pid}>
              <td>{project.pid}</td>
              <td>{project.pname}</td>
              <td>{project.goal}</td>
              <td>{project.shares}</td>
              <td>
                <button className="action-button" onClick={() => handleDelistProject(project.pid)}>
                  Delist Project
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProject;
