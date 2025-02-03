import React, { useState, useEffect } from "react";
import profileImage from "./assets/photoCV.jpg";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaGraduationCap, FaUsers, FaLightbulb, FaProjectDiagram, FaLanguage, FaBrain, FaDatabase, FaHeartbeat, FaSun, FaMoon, FaCogs } from "react-icons/fa";
import "./styles.css";
import "./script.js";

const Portfolio = () => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <div className={`container ${mode} center-content`}>
      <header className="header text-center">
        <div className="mode-toggle" onClick={toggleMode}>
          {mode === "light" ? <FaMoon className="icon" /> : <FaSun className="icon" />}
        </div>
        <img src={profileImage} alt="Nada Benchaou" className="profile-img" />
        <h1 className="title">BENCHAOU Nada</h1>
        <p className="subtitle">Future Ingénieure en Santé Digitale | À la Recherche d’un Stage</p>
        <p className="contact-info">📞 +212 6 82 29 11 14 | 📍 Casablanca, MA | ✉ bnadabenchaou@gmail.com</p>
      </header>

      <section className="education text-center">
        <h2><FaGraduationCap /> Éducation</h2>
        <div className="education-container">
          <div className="education-card">
            <h3>2ème année Ingénieur en Digital de Santé</h3>
            <p>École Supérieure Mohammed VI - Casablanca, Maroc (2023-2025)</p>
          </div>
          <div className="education-card">
            <h3>Classes Préparatoires en Génie Biomédical</h3>
            <p>École Supérieure Mohammed VI - Casablanca, Maroc (2021-2023)</p>
          </div>
          <div className="education-card">
            <h3>Première Année d'Architecture</h3>
            <p>Universidad de Granada - Espagne (2020-2021)</p>
          </div>
        </div>
      </section>

      <section className="skills text-center">
        <h2><FaLightbulb /> Compétences</h2>
        <div className="skills-container">
          <div className="skill-card"><FaBrain /><p>Intelligence Artificielle</p></div>
          <div className="skill-card"><FaCogs /><p>Programmation (Python, C, C++)</p></div>
          <div className="skill-card"><FaDatabase /><p>Base de Données (SQL, Firebase)</p></div>
          <div className="skill-card"><FaHeartbeat /><p>IoT & Systèmes Embarqués</p></div>
        </div>
      </section>

      <section className="languages text-center">
        <h2><FaLanguage /> Langues</h2>
        <div className="languages-container">
          <div className="language-card"><p>🇦🇪 Arabe</p><span className="level full"></span></div>
          <div className="language-card"><p>🇫🇷 Français</p><span className="level high"></span></div>
          <div className="language-card"><p>🇬🇧 Anglais</p><span className="level medium"></span></div>
          <div className="language-card"><p>🇪🇸 Espagnol</p><span className="level medium"></span></div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
