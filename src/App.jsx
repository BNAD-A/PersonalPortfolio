import React, { useState, useEffect } from "react";
import profileImage from "./assets/photoCV.jpg"; // Photo de profil
import linkedinLight from "./assets/linkedin-light.png"; // Icône LinkedIn mode clair
import linkedinDark from "./assets/linkedin-dark.png"; // Icône LinkedIn mode sombre
import githubLight from "./assets/github-light.png"; // Icône GitHub mode clair
import githubDark from "./assets/github-dark.png"; // Icône GitHub mode sombre
import "./styles.css";


const Portfolio = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`container ${theme}`}>
      {/* 🌗 Bouton pour le mode sombre/clair */}
      {/* 🌗 Bouton Mode Sombre/Clair */}
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* 📌 Bouton Sidebar Mobile */}
      <button className="toggle-sidebar-mobile" onClick={toggleSidebar}>
        {isSidebarOpen ? "✖" : "☰ Contact"}
      </button>


      {/* 📌 Sidebar gauche */}
      <div className={`sidebar ${isSidebarOpen ? "expanded" : ""}`}>
        <img src={profileImage} alt="Benchaou Nada" className="profile-img" />
        <h1>Nada Benchaou</h1>
        <p>Futur Ingénieure en Santé Digitale</p>
        <div className="contact-info">
          <a href="tel:+212682291114" className="contact-link">📞 +212 6 82 29 11 14</a>
          <p>
            <a href="mailto:bnadabenchaou@gmail.com" className="contact-link">
              ✉ bnadabenchaou@gmail.com
            </a>
          </p>
          <p>📍 Casablanca, Maroc</p>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/nada-benchaou-105514253/" target="_blank" rel="noopener noreferrer">
            <img src={theme === "light" ? linkedinLight : linkedinDark} alt="LinkedIn" className="social-icon" />
          </a>
          <a href="https://github.com/BNAD-A" target="_blank" rel="noopener noreferrer">
            <img src={theme === "light" ? githubDark : githubLight} alt="GitHub" className="social-icon" />
          </a>
        </div>
        <a href="/BENCHAOU Nada CV.pdf" download className="download-btn">📥 Télécharger CV</a>
      </div>

      {/* 📌 Barre latérale droite fixe (menu compact avec icônes) */}
      <div className={`right-sidebar ${isSidebarOpen ? "hidden" : ""}`}>
        <ul>
          <li><a href="#about"><i className="fas fa-user"></i> À propos</a></li>
          <li><a href="#resume"><i className="fas fa-graduation-cap"></i> Éducation</a></li>
          <li><a href="#projects"><i className="fas fa-folder-open"></i> Projets</a></li>
          <li><a href="#skills"><i className="fas fa-cogs"></i> Hard Skills</a></li>
          <li><a href="#soft-skills"><i className="fas fa-brain"></i> Soft Skills</a></li>
          <li><a href="#languages"><i className="fas fa-language"></i> Langues</a></li>
        </ul>
      </div>

      {/* Contenu Principal */}
      <div className="main-content">
        {/* 📌 Section "À propos de moi" */}
        <section id="about" className="about-section">
          <h2>👤À propos de moi</h2>
          <div className="about-box">
            <p>
            Étudiante en deuxième année de cycle d’ingénieur en digital de santé, je suis profondément inspirée par les opportunités 
            qu’offrent les technologies émergentes. Mon parcours me permet d’explorer non seulement les innovations numériques qui 
            transforment le secteur médical, mais aussi toute forme de progrès technologique qui repousse les limites de ce qui est possible. 
            Toujours curieuse et motivée, je cherche à participer à des projets pionniers qui façonnent l’avenir, en particulier dans les 
            domaines où santé et innovation s’entrecroisent. 
            </p>
          </div>
        </section>
        {/* Section Éducation */}
        <section id="resume" className="education">
          <h2>🎓 Éducation</h2>
          <div className="education-container">
            {[
              { year: "2023 - 2026", title: "2ÈME ANNÉE CYCLE D’INGÉNIEUR EN DIGITAL DE SANTÉ", place: "École Supérieure Mohammed VI d’Ingénieurs en Sciences de la Santé" },
              { year: "2021 - 2023", title: "CLASSES PRÉPARATOIRES EN GÉNIE BIOMÉDICAL", place: "École Supérieure Mohammed VI d’Ingénieurs en Sciences de la Santé" },
              { year: "2020 - 2021", title: "PREMIÈRE ANNÉE D'ARCHITECTURE", place: "Universidad de Granada - Espagne" },
              { year: "2019 - 2020", title: "EQUIVALENT BACCALAURÉAT SCIENTIFIQUE ESPAGNOL", place: "Selectividad - Espagne" },
              { year: "2018 - 2019", title: "BACCALAURÉAT SCIENTIFIQUE", place: "Lycée Omar Ibn AbdelAziz - Oujda Maroc" },
            ].map((edu, index) => (
              <div className="education-box" key={index}>
                <h3>{edu.year}</h3>
                <p>{edu.title}</p>
                <span>{edu.place}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="projects">
          <h2>🚀 Projets</h2>
          <div className="projects-container">
            {[
              {
                title: "AI Mental Health Chatbot",
                date: "Oct 2024 — Déc 2024",
                details: [
                  "Développement d’un chatbot de santé mentale basé sur l’IA.",
                  "Implémentation de la reconnaissance des émotions et apprentissage par renforcement.",
                  "Création d’une base de données d’intentions et de réponses.",
                  "Collaboration avec une équipe de 3 étudiants ingénieurs."
                ],
                githubLink: "https://github.com/BNAD-A/ChatWell_Bot"
              },
              {
                title: "Breast Cancer Data Analysis",
                date: "Oct 2024 — Déc 2024",
                details: [
                  "Analyse de données médicales et classification des tumeurs mammaires.",
                  "Application de techniques avancées de Data Mining.",
                  "Développement de modèles de Machine Learning.",
                  "Visualisation des résultats pour l’interprétation médicale."
                ],
                githubLink: "https://github.com/BNAD-A/BreastCancerAnalysis"
              },
              {
                title: "IoT Multiparametric Health Monitor",
                date: "Oct 2024 — Déc 2024",
                details: [
                  "Développement d’un système IoT pour la surveillance de santé.",
                  "Intégration de capteurs (température, fréquence cardiaque, SpO2).",
                  "Développement d’une interface mobile et web avec Blynk.",
                  "Implémentation de la connectivité Wi-Fi/Bluetooth."
                ],
                githubLink: "https://github.com/BNAD-A/MultiParametric-Monitor-"
              },
              {
                title: "CV Portfolio",
                date: "Fév 2025",
                details: [
                  "Développement de mon portfolio personnel en React.js.",
                  "Mise en place d’un mode sombre et d’un design interactif.",
                  "Hébergement du site sur Vercel avec un déploiement continu."
                ],
                githubLink: "https://github.com/BNAD-A/PersonalPortfolio"
              }
            ].map((proj, index) => (
              <div className="project-card" key={index}>
                {/* Project Title with GitHub Icon Aligned Right */}
                <div className="project-header">
                  <h3>{proj.title}</h3>
                  <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="github-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
                  </a>
                </div>
                <p><strong>{proj.date}</strong></p>
                <ul>
                  {proj.details.map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>


        {/* Section Compétences */}
        <section id="skills" className="skills">
          <h2>💡 Hard Skills </h2>
          <div className="skills-container">
            {["Data Science  AI, ML, Data Mining", "Langage de programmation  Python, C, C++, MATLAB, PHP", "Data Base  MySQL, SQL, Firebase", "Developpement WEB  HTML, CSS, JavaScript", "Cloud Computing  Docker, AWS", "Systèmes embarqués et IoT  Arduino, Raspberry Pi", "Office 365"].map((skill, index) => (
              <div className="skill-box" key={index}>
                <h4>{skill.split("  ")[0]}</h4>
                <p>{skill.split("  ")[1]}</p>
              </div>
            ))}
          </div>
        </section>
        {/* 📌 Section Soft Skills */}
        <section id="soft-skills" className="soft-skills-section">
          <h2>🎯 Soft Skills</h2>
          <div className="soft-skills-container">
            <div className="soft-skill-box">
              <i className="fas fa-lightbulb"></i>
              <h3>Créativité</h3>
              <p>Capacité à innover et à proposer des solutions originales.</p>
            </div>
            <div className="soft-skill-box">
              <i className="fas fa-users"></i>
              <h3>Travail d'équipe</h3>
              <p>Bonne collaboration avec des équipes multidisciplinaires.</p>
            </div>
            <div className="soft-skill-box">
              <i className="fas fa-comments"></i>
              <h3>Communication</h3>
              <p>Capacité à exprimer des idées de manière claire et efficace.</p>
            </div>
            <div className="soft-skill-box">
              <i className="fas fa-clock"></i>
              <h3>Gestion du temps</h3>
              <p>Priorisation efficace des tâches et respect des délais.</p>
            </div>
            <div className="soft-skill-box">
              <i className="fas fa-cogs"></i>
              <h3>Résolution de problèmes</h3>
              <p>Approche analytique pour trouver des solutions optimales.</p>
            </div>
          </div>
        </section>

        {/* Section Langues */}
        <section id="languages" className="languages">
          <h2>🌍 Langues</h2>
          <div className="languages-container">
            {[
              { name: "Arabe", level: "Langue maternelle", width: "100%" },
              { name: "Français", level: "Courant", width: "85%" },
              { name: "Anglais", level: "Intermédiaire avancé", width: "75%" },
              { name: "Espagnol", level: "Intermédiaire", width: "50%" },
              { name: "Allemand", level: "Notion de base", width: "25%" }
            ].map((lang, index) => (
              <div className="language-box" key={index}>
                <h3>{lang.name}</h3>
                <p>{lang.level}</p>
                <div className="progress-bar"><div className="progress" style={{ width: lang.width }}></div></div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Portfolio;
