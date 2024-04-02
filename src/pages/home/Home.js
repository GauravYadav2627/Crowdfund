import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [donationAmounts, setDonationAmounts] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://img.freepik.com/premium-photo/ai-technology-microchip-background-digital-transformation-concept_937196-69.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1710633600&semt=ais",
    "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_640.jpg",
    "https://media.istockphoto.com/id/1366475366/photo/artificial-intelligence-digital-concept-abstract-brains-inside-light-bulb.jpg?s=612x612&w=0&k=20&c=kiZ-IyL9xOej1ttlw268MTL72OyagiVZm5ojHmODX9U=",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7193/Project/allProject"
        );
        setProjects(response.data);
        const initialDonationAmounts = {};
        response.data.forEach((project) => {
          initialDonationAmounts[project.pid] = 0;
        });
        setDonationAmounts(initialDonationAmounts);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  const handleDonate = (projectId) => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/Login");
    } else {
      navigate("/Stripe")
      console.log(`Donating ${donationAmounts[projectId]} tos project with ID ${projectId}`);
    }
  };
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="picture-section">
          <div className="carousel">
            <img
             src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
            />
          </div>
        </div>
      <div className="org-info">
        <div className="info-container">
          <h2>Organization Info</h2>
          <p>
            Supporting Dreams in its endeavors holds significant importance as
            it empowers and enables students to build and innovate in the field
            of robotics. Dreams serves as a catalyst for the dreams and
            aspirations of young minds, providing them with the financial means
            to pursue their projects. By contributing to this crowdfunding
            initiative, individuals not only invest in technological
            advancements but also nurture the next generation of innovators.
            Dreams creates a platform where students can transform their ideas
            into reality, fostering creativity, learning, and skill development.
            By supporting this initiative, backers play a crucial role in the
            growth of education and technology, contributing to a future where
            innovation flourishes, and students are equipped with the tools they
            need to make a meaningful impact in the world of robotics.
          </p>
          <h3>Our Vision</h3>
          <p>
            Our organization, dedicated to the advancement of Artificial
            Intelligence and Machine Learning (AiML), stands at the forefront of
            cutting-edge technology, committed to revolutionizing industries
            through innovative projects. With a track record of groundbreaking
            achievements in AIML research and development, we are poised to
            tackle the most pressing challenges facing our world today. From
            predictive analytics to natural language processing, our projects
            span a wide spectrum of applications, each aimed at solving
            real-world problems and driving positive change. As we embark on our
            next phase of growth, we seek your support to fund our endeavors.
            Your investment in our organization will not only fuel our ongoing
            innovations but also enable us to expand our reach, collaborate with
            top talent, and accelerate the pace of technological advancement. By
            partnering with us, you are investing in the future — a future where
            AI and ML technologies will reshape industries, empower businesses,
            and improve lives. Join us on this transformative journey and be a
            part of shaping tomorrow's world today.
          </p>
          <p>
            At our organization, we're not just building projects; we're
            pioneering groundbreaking solutions that push the boundaries of
            what's possible with AIML. Our team of experts thrives on pushing
            the envelope, constantly exploring new frontiers and pushing the
            limits of innovation. From developing AI-driven healthcare
            diagnostics to optimizing supply chain logistics through machine
            learning algorithms, our projects are making tangible impacts across
            various sectors. By supporting us, you're not just investing in a
            project; you're investing in a vision for a better future—one where
            AI and ML technologies are harnessed to solve some of society's most
            complex challenges. With your funding, we can continue to drive
            innovation, foster collaboration, and create meaningful change.
            Together, let's unlock the full potential of AI and ML and build a
            brighter, more connected world for generations to come.
          </p>
        </div>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <div className="project-box" key={project.pid}>
            <h3>{project.pname}</h3>
            <p>Goal: ${project.goal}</p>
            <p>Money Received: ${project.received}</p>
            <p>Shares: {project.shares}</p>
            <p>Description: {project.description}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${Math.min((project.received / project.goal) * 100, 100)}%`,
                }}
              ></div>
            </div>
            {project.goal <= project.received && <p>Campaign Completed</p>}
            <input
              type="number"
              placeholder="Enter amount to donate"
              min="1"
              max={Math.ceil(project.goal / 2)}
              step="1"
              value={donationAmounts[project.pid]}
              onChange={(e) =>
                setDonationAmounts({
                  ...donationAmounts,
                  [project.pid]: parseInt(e.target.value),
                })
              } required
            />
            {donationAmounts[project.pid] > Math.ceil(project.goal / 2) && (
            <p style={{ color: 'red' }}>Donation amount cannot be greater than half of the goal</p>
                  )}
           <button
              disabled={donationAmounts[project.pid] >= Math.ceil(project.goal / 2)}
            onClick={() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/Login");
    } else {
      navigate("/Stripe");
      console.log(
        `Donating ${donationAmounts[project.pid]} to project with ID ${project.pid}`
      );
    }
  }}
>
  Donate
</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
