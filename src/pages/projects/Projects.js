import React, { useState } from "react";
import axios from "axios"; 
import "./Projects.css";

const Projects = () => {
  const [formData, setFormData] = useState({
    Pname: "",
    Goal: 0,
    Shares: 0,
    Description: "",
  });
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "Description") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.Pname.trim() ||
      formData.Goal <= 0 ||
      formData.Shares <= 0 ||
      !formData.Description.trim()
    ) {
      alert("Please fill in all fields.");
      console.log(formData);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7193/Project",
        formData
      );
      console.log(formData);
        alert("Project created successfully!");
        setFormData({ Pname: "", Goal: 0, Shares: 0, Description: "" });
        setCharCount(0);
      }
    catch (error) {
      console.error("Error creating project:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="project-form">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          name="Pname"
          value={formData.Pname}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="goalAmount">Goal Amount:</label>
        <input
          type="number"
          id="Goal"
          name="Goal"
          value={formData.Goal}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="Shares">Shares:</label>
        <input
          type="number"
          id="Shares"
          name="Shares"
          value={formData.Shares}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="Description">Description (Max 300 words):</label>
        <textarea
          id="Description"
          name="Description"
          value={formData.Description||""}
          onChange={handleInputChange}
          maxLength={300}
          required
        />
        <p>Character count: {charCount}/300</p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Projects;
