import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import profileImage from "./assets/photoCV.jpg"; // Photo de profil
import linkedinLight from "./assets/linkedin-light.png"; // Icône LinkedIn mode clair
import linkedinDark from "./assets/linkedin-dark.png"; // Icône LinkedIn mode sombre
import githubLight from "./assets/github-light.png"; // Icône GitHub mode clair
import githubDark from "./assets/github-dark.png"; // Icône GitHub mode sombre
import "./styles.css";

/* === ICONS CATALOGUE (SVG via devicon / simple-icons CDN) === */
const ICONS = {
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  cplusplus: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  matlab: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",

  office: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftoffice/microsoftoffice-original.svg",
  excel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftoffice/microsoftoffice-original.svg",

  spark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  keras: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  scikitlearn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  opencv: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  vercel: "https://api.iconify.design/simple-icons:vercel.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  arduino: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
  raspberrypi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
  blynk: "https://api.iconify.design/simple-icons:blynk.svg",
  kafka: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
  airflow: "https://api.iconify.design/logos:airflow-icon.svg",
  powerbi: "https://api.iconify.design/simple-icons:powerbi.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  hadoop: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  kafka: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
  airflow: "https://api.iconify.design/logos:airflow-icon.svg",
  powerbi: "https://api.iconify.design/simple-icons:powerbi.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  hadoop: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
};

/* Composant utilitaire de rangée d’icônes */
const IconRow = ({ stack = [] }) => (
  <div className="icon-row" aria-label="Outils utilisés">
    {stack.map((k) => (
      ICONS[k] ? (
        <span key={k} className="tool-chip" title={k} aria-label={k}>
          <img src={ICONS[k]} alt={k} className="tool-icon" loading="lazy" />
        </span>
      ) : null
    ))}
  </div>
);


/* Compteur animé qui démarre quand il entre dans le viewport */
const StatCounter = ({ value, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const startTime = performance.now();
            const tick = (now) => {
              const p = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              setCount(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

// 🌍 Contenu multilingue (ajout des clés about.hello et about.role)
const translations = {
  fr: {
    name: "Nada Benchaou",
    title: "Ingénieure d'État en Santé Digitale",
    location: "Casablanca, Maroc",
    downloadCVFR: "📥 Télécharger CV (FR)",
    downloadCVEN: "📥 Télécharger CV (EN)",
    contact: "☰",
    navigation: {
      about: "À propos",
      education: "Éducation",
      experience: "Expérience",
      projects: "Projets",
      skills: "Hard Skills",
      softSkills: "Soft Skills",
      languages: "Langues",
    },
    about: {
      hello: "Bonjour 👋",
      role: "Ingénieure d’État en Santé Digitale — J’allie intelligence artificielle et ingénierie logicielle pour concevoir des solutions numériques fiables et innovantes au service de la santé.",
      title: "👤À propos de moi",
      content:
        "Ingénieure d’État en Santé Digitale, je conçois des solutions numériques à la croisée de l’intelligence artificielle et de l’ingénierie logicielle. Spécialisée en machine learning, deep learning, vision par ordinateur et développement d’applications médicales, j’ai piloté des projets concrets — de la détection assistée par IA à l’interopérabilité hospitalière. Curieuse, rigoureuse et orientée impact, je m’engage à transformer les pratiques de santé grâce à des technologies fiables, sécurisées et centrées sur le patient.",
    },
    education: {
      title: "🎓 Éducation",
      items: [
        {
          year: "2023 - 2026",
          title: "3ÈME ANNÉE CYCLE D'INGÉNIEUR EN DIGITAL DE SANTÉ",
          place:
            "École Supérieure Mohammed VI d'Ingénieurs en Sciences de la Santé",
        },
        {
          year: "2021 - 2023",
          title: "CLASSES PRÉPARATOIRES EN GÉNIE BIOMÉDICAL",
          place:
            "École Supérieure Mohammed VI d'Ingénieurs en Sciences de la Santé",
        },
        {
          year: "2020 - 2021",
          title: "PREMIÈRE ANNÉE D'ARCHITECTURE",
          place: "Universidad de Granada - Espagne",
        },
        {
          year: "2019 - 2020",
          title: "EQUIVALENT BACCALAURÉAT SCIENTIFIQUE ESPAGNOL",
          place: "Selectividad - Espagne",
        },
        {
          year: "2018 - 2019",
          title: "BACCALAURÉAT SCIENTIFIQUE",
          place: "Lycée Omar Ibn AbdelAziz - Oujda Maroc",
        },
      ],
    },
    experience: {
      title: "💼 Expérience",
      items: [
        {
          role: "Stagiaire Ingénieure IA & Développement Logiciel",
          org: "FIRETHUNDER SARL – Pôle Ingénierie Logicielle",
          location: "Casablanca, Maroc",
          period: "Février – Juin 2026",
          bullets: [
            "Conception et développement de FirePACSv2, une plateforme PACS intelligente de nouvelle génération destinée aux établissements de santé.",
            "Développement d'une architecture microservices intégrant l'imagerie DICOM, l'intelligence artificielle et l'interopérabilité hospitalière.",
            "Intégration de modèles Deep Learning, Vision-Language Model (Qwen2.5-VL) et d'un RAG médical pour assister les radiologues.",
            "Mise en œuvre des standards HL7 v2, FHIR R4 et des mécanismes de sécurité (PHI Firewall, RBAC, audit).",
          ],
          tech: ["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Orthanc", "Mirth Connect", "Redis", "PyTorch"],
        },
        {
          role: "Stagiaire Technique – IA & Systèmes d'Information",
          org: "CHU Oujda – Service Informatique & SI",
          location: "Oujda, Maroc",
          period: "Juil — Août 2025",
          bullets: [
            "Développement d’un Système de Détection Automatique de Rétinopathie Diabétique basé sur le Deep Learning.",
          ],
          tech: ["Python", "TensorFlow/Keras", "Pandas", "NumPy"],
        },
        {
          role: "Stagiaire Observatrice",
          org: "CHU Oujda – Service Biomédical",
          location: "Oujda, Maroc",
          period: "Juil 2024",
          bullets: [
            "Tournée au bloc opératoire, autotests des respirateurs et maintenance d’équipements.",
            "Visites des services de réanimation, néonatologie, radiologie.",
            "Participation à l’installation d’une IRM et configuration en salle d’opération.",
          ],
          tech: [],
        },
      ],
    },
    projects: {
      title: "🚀 Projets",
      items: [
        {
          title: "FirePACSv2 – PACS Intelligent, Interopérable & Assisté par IA",
          date: "2026",
          details: [
            "Développement d'une plateforme PACS complète pour l'archivage, la visualisation et la gestion des examens DICOM.",
            "Intégration d'une couche IA multimodale (radiographie, mammographie, IRM) basée sur des modèles Deep Learning spécialisés.",
            "Conception d'un assistant clinique utilisant un RAG médical et un Vision-Language Model pour l'analyse documentaire.",
            "Implémentation des flux HL7/FHIR, génération de comptes rendus intelligents et signature numérique.",
          ],
          githubLink: "https://github.com/BNAD-A",
        },
        {
          title: "Vitalia+ — La continuité des soins, enfin connectée",
          date: "2025",
          details: [
"Plateforme de santé numérique tout-en-un dédiée au suivi des patients atteints de maladies chroniques.",
    "Écosystème digital connecté reliant patients, médecins, pharmacies et laboratoires pour un suivi continu.",
    "Prototype frontend mettant en valeur les dashboards, les parcours utilisateurs et l’UX globale."
          ],
          githubLink: "https://github.com/BNAD-A/VitaliaPlus"
        },

        {
          title: "FineMed-LLM — Assistant médical prudent (LLM fine-tuné)",
          date: "2025",
          details: [
    "Plateforme web permettant d’interagir avec un LLM médical fine-tuné, conçu pour des réponses prudentes sans diagnostic.",
    "Fine-tuning supervisé (QLoRA) pour réduire les formulations à risque et renforcer l’incertitude explicite.",
    "API Flask et interface web pour tester des scénarios cliniques sensibles."
          ],
          githubLink: "https://github.com/BNAD-A/-FineMed-LLM"
        },
        {
          title: "Système Intelligent de Dispatching Médical en Temps Réel",
          date: "Décembre 2025",
            details: [
              "Simulation d’une plateforme Big Data de gestion des urgences médicales en temps réel.",
              "Collecte et traitement des flux d’ambulances et de capacités hospitalières via Apache Kafka.",
              "Moteur de dispatching optimisant l’affectation des ambulances selon la distance et la saturation.",
              "Analyse et visualisation des performances avec Power BI."
            ],
          githubLink: "https://github.com/BNAD-A/RealTime-Medical-Dispatch-System",
        },
        {
          title:
            "Double Regard : Double CBAM pour la détection de la rétinopathie diabétique",
          date: "Juil 2025 — Août 2025",
          details: [
            "Classification d’images rétiniennes avec EfficientNetV2S.",
            "Amélioration de l’attention visuelle via Double CBAM.",
          ],
          githubLink: "https://github.com/BNAD-A/RetinopathyDetection",
        },
        {
          title:
            "Eklia – Assistant IA pour radiologues détection et rédaction automatique de rapports d'IRM cérébrales",
          date: "Fév 2025 — Mai 2025",
          details: [
            "Classification & segmentation de tumeurs cérébrales.",
            "Génération de rapports médicaux avec NLP & OCR.",
            "Interface web avec visualisation, validation et édition des rapports.",
          ],
          githubLink: "https://github.com/BNAD-A/BrainMRI_Analysis",
        },
        {
          title: "Skinia – Détection du Cancer de la Peau par IA",
          date: "Fév 2025 — Avril 2025",
          details: [
            "Détection automatique de lésions cutanées via CNN.",
            "Pipeline optimisé pour reconnaître plusieurs types (mélanome, nævus…).",
            "Interface web pour analyse, suivi et orientation vers un dermatologue.",
          ],
          githubLink: "https://github.com/BNAD-A/SkinCancer_Detection",
        },
        {
          title: "DonSang – Plateforme de Matching Donneurs/Receveurs",
          date: "Avril 2025 — Mai 2025",
          details: [
            "Base de données SQL des profils médicaux et géographiques des donneurs et receveurs.",
            "Algorithme Python de matching par compatibilité et proximité.",
            "Interface web double session : donneurs & professionnels de santé.",
          ],
          githubLink: "https://github.com/BNAD-A/BloodMatching",
        },
        {
          title: "AI Mental Health Chatbot",
          date: "Oct 2024 — Déc 2024",
          details: [
            "Développement d'un chatbot de santé mentale basé sur l'IA.",
            "Implémentation de la reconnaissance des émotions et apprentissage par renforcement.",
            "Création d'une base de données d'intentions et de réponses.",
            "Collaboration avec une équipe de 3 étudiants ingénieurs.",
          ],
          githubLink: "https://github.com/BNAD-A/ChatWell_Bot",
        },
        {
          title: "Breast Cancer Data Analysis",
          date: "Oct 2024 — Déc 2024",
          details: [
            "Analyse de données médicales et classification des tumeurs mammaires.",
            "Application de techniques avancées de Data Mining.",
            "Développement de modèles de Machine Learning.",
            "Visualisation des résultats pour l'interprétation médicale.",
          ],
          githubLink: "https://github.com/BNAD-A/BreastCancerAnalysis",
        },
        {
          title: "IoT Multiparametric Health Monitor",
          date: "Oct 2024 — Déc 2024",
          details: [
            "Développement d'un système IoT pour la surveillance de santé.",
            "Intégration de capteurs (température, fréquence cardiaque, SpO2).",
            "Développement d'une interface mobile et web avec Blynk.",
            "Implémentation de la connectivité Wi-Fi/Bluetooth.",
          ],
          githubLink: "https://github.com/BNAD-A/MultiParametric-Monitor-",
        },
        {
          title: "CV Portfolio",
          date: "Fév 2025",
          details: [
            "Développement de mon portfolio personnel en React.js.",
            "Mise en place d'un mode sombre et d'un design interactif.",
            "Hébergement du site sur Vercel avec un déploiement continu.",
          ],
          githubLink: "https://github.com/BNAD-A/PersonalPortfolio",
        },
      ],
    },
    skills: {
      title: "💡 Hard Skills",
      items: [
        {
          category: "Data Science & IA",
          skills: "Machine Learning, Deep Learning, Data Mining",
          stack: ["python", "scikitlearn", "tensorflow", "pytorch"]
        },
        {
          category: "Frameworks",
          skills: "PyTorch, TensorFlow / Keras, Scikit-learn",
          stack: ["pytorch", "tensorflow", "keras", "scikitlearn"]
        },
        {
          category: "Langages de programmation",
          skills: "Python, C / C++, MATLAB",
          stack: ["python","c","cplusplus","matlab"]
        },
        {
          category: "Bases de données & Big Data",
          skills: "SQL, MySQL, Hadoop, Apache Spark, Apache Kafka, Apache Airflow",
          stack: ["mysql", "hadoop", "kafka", "airflow", "spark"]
        },
        {
          category: "Développement Web & Déploiement",
          skills: "HTML, CSS, JavaScript, FastAPI",
          stack: ["html", "css", "javascript", "fastapi"]
        },
        {
          category: "Outils & Productivité",
          skills: "GitHub, Office 365, Power BI",
          stack: ["github", "powerbi"]
        }
      ]

    },
    softSkills: {
      title: "🎯 Soft Skills",
      items: [
        {
          icon: "fas fa-lightbulb",
          title: "Créativité",
          description:
            "Capacité à innover et à proposer des solutions originales.",
        },
        {
          icon: "fas fa-users",
          title: "Travail d'équipe",
          description:
            "Bonne collaboration avec des équipes multidisciplinaires.",
        },
        {
          icon: "fas fa-comments",
          title: "Communication",
          description:
            "Capacité à exprimer des idées de manière claire et efficace.",
        },
        {
          icon: "fas fa-clock",
          title: "Gestion du temps",
          description:
            "Priorisation efficace des tâches et respect des délais.",
        },
        {
          icon: "fas fa-cogs",
          title: "Résolution de problèmes",
          description:
            "Approche analytique pour trouver des solutions optimales.",
        },
      ],
    },
    languageSkills: {
      title: "🌍 Langues",
      items: [
        { name: "Arabe", level: "Langue maternelle", width: "100%" },
        { name: "Français", level: "Courant", width: "85%" },
        { name: "Anglais", level: "Intermédiaire avancé", width: "75%" },
        { name: "Espagnol", level: "Intermédiaire", width: "50%" },
        { name: "Allemand", level: "Notion de base", width: "25%" },
      ],
    },
  },
  en: {
    name: "Nada Benchaou",
    title: "State-Certified Digital Health Engineer",
    location: "Casablanca, Morocco",
    downloadCVFR: "📥 Download CV (FR)",
    downloadCVEN: "📥 Download CV (EN)",
    contact: "☰",
    navigation: {
      about: "About",
      education: "Education",
      experience: "Experience",
      projects: "Projects",
      skills: "Hard Skills",
      softSkills: "Soft Skills",
      languages: "Languages",
    },
    about: {
      hello: "Hello 👋",
      role: "State-Certified Digital Health Engineer — I combine artificial intelligence and software engineering to build reliable, innovative digital solutions that advance healthcare.",
      title: "👤About me",
      content:
        "State-certified Digital Health Engineer designing digital solutions at the crossroads of artificial intelligence and software engineering. Specialized in machine learning, deep learning, computer vision and medical application development, I have led concrete projects — from AI-assisted detection to hospital interoperability. Curious, rigorous and impact-driven, I am committed to transforming healthcare through reliable, secure and patient-centered technology.",
    },
    education: {
      title: "🎓 Education",
      items: [
        {
          year: "2023 - 2026",
          title: "3RD YEAR DIGITAL HEALTH ENGINEERING CYCLE",
          place: "Mohammed VI Higher School of Health Sciences Engineers",
        },
        {
          year: "2021 - 2023",
          title: "PREPARATORY CLASSES IN BIOMEDICAL ENGINEERING",
          place: "Mohammed VI Higher School of Health Sciences Engineers",
        },
        {
          year: "2020 - 2021",
          title: "FIRST YEAR OF ARCHITECTURE",
          place: "Universidad de Granada - Spain",
        },
        {
          year: "2019 - 2020",
          title: "SPANISH SCIENTIFIC BACCALAUREATE EQUIVALENT",
          place: "Selectividad - Spain",
        },
        {
          year: "2018 - 2019",
          title: "SCIENTIFIC BACCALAUREATE",
          place: "Omar Ibn AbdelAziz High School - Oujda Morocco",
        },
      ],
    },
    experience: {
      title: "💼 Experience",
      items: [
        {
          role: "AI & Software Engineering Intern",
          org: "FIRETHUNDER SARL – Software Engineering Division",
          location: "Casablanca, Morocco",
          period: "February – June 2026",
          bullets: [
            "Design and development of FirePACSv2, a next-generation intelligent PACS platform for healthcare institutions.",
            "Development of a microservices architecture integrating DICOM imaging, artificial intelligence and hospital interoperability.",
            "Integration of Deep Learning models, a Vision-Language Model (Qwen2.5-VL) and a medical RAG to assist radiologists.",
            "Implementation of HL7 v2 and FHIR R4 standards and security mechanisms (PHI Firewall, RBAC, audit).",
          ],
          tech: ["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Orthanc", "Mirth Connect", "Redis", "PyTorch"],
        },
        {
          role: "Technical Intern – AI & Information Systems",
          org: "CHU Oujda – IT & IS Department",
          location: "Oujda, Morocco",
          period: "Jul — Aug 2025",
          bullets: [
            "Developed an automatic Diabetic Retinopathy detection system using Deep Learning.",
          ],
          tech: ["Python", "TensorFlow/Keras", "Pandas", "NumPy"],
        },
        {
          role: "Observation Intern",
          org: "CHU Oujda – Biomedical Department",
          location: "Oujda, Morocco",
          period: "Jul 2024",
          bullets: [
            "Operating room tour, ventilator self-tests and equipment maintenance.",
            "Visits to ICU, neonatology and radiology departments.",
            "Contributed to MRI installation and operating room configuration.",
          ],
          tech: [],
        },
      ],
    },
    projects: {
      title: "🚀 Projects",
      items: [
        {
          title: "FirePACSv2 – Intelligent, Interoperable & AI-Assisted PACS",
          date: "2026",
          details: [
            "Development of a complete PACS platform for archiving, viewing and managing DICOM studies.",
            "Integration of a multimodal AI layer (radiography, mammography, MRI) based on specialized Deep Learning models.",
            "Design of a clinical assistant using a medical RAG and a Vision-Language Model for document analysis.",
            "Implementation of HL7/FHIR flows, intelligent report generation and digital signature.",
          ],
          githubLink: "https://github.com/BNAD-A",
        },
        {
          title: "Vitalia+ — Connected Continuity of Care",
          date: "2025",
          details: [
            "All-in-one digital health platform for chronic disease management (diabetes, hypertension, asthma, etc.).",
    "Integrated ecosystem connecting patients, physicians, pharmacies and laboratories for continuous care.",
    "Frontend prototype highlighting dashboards, user journeys and overall UX."
          ],
          githubLink: "https://github.com/BNAD-A/VitaliaPlus"
        },

        {
          title: "FineMed-LLM — Prudent Medical Assistant (Fine-Tuned LLM)",
          date: "2025",
          details: [
    "Web platform to interact with a fine-tuned medical LLM designed for cautious, non-diagnostic responses.",
    "Supervised fine-tuning (QLoRA) to reduce risky behaviors such as false certainty and inappropriate tone.",
    "Flask API and interface for testing sensitive clinical scenarios."
          ],
          githubLink: "https://github.com/BNAD-A/-FineMed-LLM"
        },

        {
          title: "Real-Time Intelligent Medical Dispatch System",
          date: "May 2025 — June 2025",
          details: [
            "Simulation of a Big Data platform for real-time medical emergency management.",
            "Real-time data ingestion and processing of ambulance and hospital capacity streams using Apache Kafka.",
            "Dispatching engine optimizing ambulance assignment based on distance and hospital saturation.",
            "Performance analysis and visualization using Power BI."
          ],
          githubLink: "https://github.com/BNAD-A/RealTime-Medical-Dispatch-System",
        },
        {
          title: "Double Vision: Double CBAM for Diabetic Retinopathy Detection",
          date: "Jul 2025 — Aug 2025",
          details: [
            "Retinal image classification using EfficientNetV2S.",
            "Enhanced visual attention through Double CBAM.",
          ],
          githubLink: "https://github.com/BNAD-A/RetinopathyDetection",
        },
        {
          title:
            "Eklia – AI Assistant for Radiologists: Brain MRI Detection and Automatic Report Writing",
          date: "Feb 2025 — May 2025",
          details: [
            "Brain tumor classification & segmentation.",
            "Medical report generation with NLP & OCR.",
            "Web interface with visualization, validation and report editing.",
          ],
          githubLink: "https://github.com/BNAD-A/BrainMRI_Analysis",
        },
        {
          title: "Skinia – AI-Based Skin Cancer Detection",
          date: "Feb 2025 — Apr 2025",
          details: [
            "Automatic skin lesion detection via CNN.",
            "Optimized pipeline to recognize multiple types (melanoma, nevus...).",
            "Web interface for analysis, monitoring and referral to dermatologist.",
          ],
          githubLink: "https://github.com/BNAD-A/SkinCancer_Detection",
        },
        {
          title: "DonSang – Donor/Recipient Matching Platform",
          date: "Apr 2025 — May 2025",
          details: [
            "SQL database of medical and geographical profiles of donors and recipients.",
            "Python matching algorithm by compatibility and proximity.",
            "Dual session web interface: donors & healthcare professionals.",
          ],
          githubLink: "https://github.com/BNAD-A/BloodMatching",
        },
        {
          title: "AI Mental Health Chatbot",
          date: "Oct 2024 — Dec 2024",
          details: [
            "Development of an AI-based mental health chatbot.",
            "Implementation of emotion recognition and reinforcement learning.",
            "Creation of an intentions and responses database.",
            "Collaboration with a team of 3 engineering students.",
          ],
          githubLink: "https://github.com/BNAD-A/ChatWell_Bot",
        },
        {
          title: "Breast Cancer Data Analysis",
          date: "Oct 2024 — Dec 2024",
          details: [
            "Medical data analysis and breast tumor classification.",
            "Application of advanced Data Mining techniques.",
            "Machine Learning model development.",
            "Results visualization for medical interpretation.",
          ],
          githubLink: "https://github.com/BNAD-A/BreastCancerAnalysis",
        },
        {
          title: "IoT Multiparametric Health Monitor",
          date: "Oct 2024 — Dec 2024",
          details: [
            "Development of an IoT system for health monitoring.",
            "Integration of sensors (temperature, heart rate, SpO2).",
            "Development of mobile and web interface with Blynk.",
            "Implementation of Wi-Fi/Bluetooth connectivity.",
          ],
          githubLink: "https://github.com/BNAD-A/MultiParametric-Monitor-",
        },
        {
          title: "CV Portfolio",
          date: "Feb 2025",
          details: [
            "Development of my personal portfolio in React.js.",
            "Implementation of dark mode and interactive design.",
            "Website hosting on Vercel with continuous deployment.",
          ],
          githubLink: "https://github.com/BNAD-A/PersonalPortfolio",
        },
      ],
    },
    skills: {
      title: "💡 Hard Skills",
      items: [
        {
          category: "Data Science & AI",
          skills: "Machine Learning, Deep Learning, Data Mining",
          stack: ["python", "scikitlearn", "tensorflow", "pytorch"]
        },
        {
          category: "Frameworks",
          skills: "PyTorch, TensorFlow / Keras, Scikit-learn",
          stack: ["pytorch", "tensorflow", "keras", "scikitlearn"]
        },
        {
          category: "Programming Languages",
          skills: "Python, C / C++, MATLAB",
          stack: ["python", "c", "cplusplus", "matlab"]
        },
        {
          category: "Databases & Big Data",
          skills: "SQL, MySQL, Hadoop, Apache Spark, Apache Kafka, Apache Airflow",
          stack: ["mysql", "hadoop", "spark", "kafka", "airflow"]
        },
        {
          category: "Web Development & Deployment",
          skills: "HTML, CSS, JavaScript, FastAPI",
          stack: ["html", "css", "javascript", "fastapi"]
        },
        {
          category: "Tools & Productivity",
          skills: "GitHub, Office 365, Power BI",
          stack: ["github", "powerbi"]
        }
      ]


    },
    softSkills: {
      title: "🎯 Soft Skills",
      items: [
        {
          icon: "fas fa-lightbulb",
          title: "Creativity",
          description:
            "Ability to innovate and propose original solutions.",
        },
        {
          icon: "fas fa-users",
          title: "Teamwork",
          description:
            "Good collaboration with multidisciplinary teams.",
        },
        {
          icon: "fas fa-comments",
          title: "Communication",
          description:
            "Ability to express ideas clearly and effectively.",
        },
        {
          icon: "fas fa-clock",
          title: "Time Management",
          description:
            "Effective task prioritization and deadline compliance.",
        },
        {
          icon: "fas fa-cogs",
          title: "Problem Solving",
          description:
            "Analytical approach to find optimal solutions.",
        },
      ],
    },
    languageSkills: {
      title: "🌍 Languages",
      items: [
        { name: "Arabic", level: "Native language", width: "100%" },
        { name: "French", level: "Fluent", width: "85%" },
        { name: "English", level: "Upper intermediate", width: "75%" },
        { name: "Spanish", level: "Intermediate", width: "50%" },
        { name: "German", level: "Basic notions", width: "25%" },
      ],
    },
  },
};

const Portfolio = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("fr");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showTop, setShowTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedProjects, setExpandedProjects] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [languagesVisible, setLanguagesVisible] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const PROJECTS_LIMIT = 6;

  // Contenu courant
  const currentContent = translations[language];

  const toggleProject = (index) =>
    setExpandedProjects((prev) => ({ ...prev, [index]: !prev[index] }));

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // 👁️ Scroll-spy : surligne la section active dans la nav de droite
  useEffect(() => {
    const ids = [
      "about",
      "resume",
      "experience",
      "projects",
      "skills",
      "soft-skills",
      "languages",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ⬆️ Bouton "retour en haut" + barre de progression de lecture
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🎬 Apparition des sections au scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 📊 Déclenche le remplissage des barres de langues à l'arrivée
  useEffect(() => {
    const el = document.getElementById("languages");
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLanguagesVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleLanguage = () => setLanguage(language === "fr" ? "en" : "fr");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Utilitaires d'affichage du nom "Nada Benchaou"
  const [firstName, lastName] = currentContent.name.split(" ");

  /* === Association projet -> stack d’icônes === */
  const projectStacks = {
    "FirePACSv2 – PACS Intelligent, Interopérable & Assisté par IA": [
      "python", "fastapi", "react", "docker", "postgresql", "pytorch", "redis"
    ],
    "FirePACSv2 – Intelligent, Interoperable & AI-Assisted PACS": [
      "python", "fastapi", "react", "docker", "postgresql", "pytorch", "redis"
    ],
    "Vitalia+ — La continuité des soins, enfin connectée": [
  "react",
  "javascript",
  "html",
  "css"
],
"Vitalia+ — Connected Continuity of Care": [
  "react",
  "javascript",
  "html",
  "css"
],
    "FineMed-LLM — Assistant médical prudent (LLM fine-tuné)": [
      "python",
      "pytorch",
      "docker"
    ],
    " FineMed-LLM — Prudent Medical Assistant (Fine-Tuned LLM)": [
  "python",
  "pytorch",
  "docker"
],
    "Système Intelligent de Dispatching Médical en Temps Réel": ["python","kafka","airflow","powerbi"],
    "Real-Time Intelligent Medical Dispatch System": ["python","kafka","airflow","powerbi"],

    "Double Regard : Double CBAM pour la détection de la rétinopathie diabétique": ["python","tensorflow","keras","numpy","pandas","scikitlearn"],
    "Double Vision: Double CBAM for Diabetic Retinopathy Detection": ["python","tensorflow","keras","numpy","pandas","scikitlearn","opencv"],

    "Eklia – Assistant IA pour radiologues détection et rédaction automatique de rapports d'IRM cérébrales": ["python","tensorflow","numpy","pandas","opencv","scikitlearn"],
    "Eklia – AI Assistant for Radiologists: Brain MRI Detection and Automatic Report Writing": ["python","tensorflow","numpy","pandas","opencv","scikitlearn"],

    "Skinia – Détection du Cancer de la Peau par IA": ["python","tensorflow","keras","numpy","pandas","scikitlearn","opencv"],
    "Skinia – AI-Based Skin Cancer Detection": ["python","tensorflow","keras","numpy","pandas","scikitlearn","opencv"],

    "DonSang – Plateforme de Matching Donneurs/Receveurs": ["python","mysql","javascript","html","css"],
    "DonSang – Donor/Recipient Matching Platform": ["python","mysql","javascript","html","css"],

    "AI Mental Health Chatbot": ["python","scikitlearn","numpy","pandas"],
    "Breast Cancer Data Analysis": ["python","scikitlearn","numpy","pandas"],
    "IoT Multiparametric Health Monitor": ["arduino","raspberrypi","javascript","html","css"],
    "CV Portfolio": ["react","javascript","css","vercel"],
  };

  const getProjectStack = (title) => projectStacks[title] || [];

  /* === Navigation (droite) === */
  const navItems = [
    { id: "about", icon: "fas fa-user", label: currentContent.navigation.about },
    { id: "resume", icon: "fas fa-graduation-cap", label: currentContent.navigation.education },
    { id: "experience", icon: "fas fa-briefcase", label: currentContent.navigation.experience },
    { id: "projects", icon: "fas fa-folder-open", label: currentContent.navigation.projects },
    { id: "skills", icon: "fas fa-cogs", label: currentContent.navigation.skills },
    { id: "soft-skills", icon: "fas fa-brain", label: currentContent.navigation.softSkills },
    { id: "languages", icon: "fas fa-language", label: currentContent.navigation.languages },
  ];

  /* === Catégorie de chaque projet (même ordre en FR et EN) === */
  const projectCategories = [
    "ai",      // FirePACSv2
    "web",     // Vitalia+
    "ai",      // FineMed-LLM
    "bigdata", // Dispatching médical
    "ai",      // Double Regard (rétinopathie)
    "ai",      // Eklia (IRM cérébrale)
    "ai",      // Skinia (peau)
    "web",     // DonSang
    "ai",      // Mental Health Chatbot
    "ai",      // Breast Cancer Analysis
    "iot",     // IoT Monitor
    "web",     // CV Portfolio
  ];

  /* === Filtres de projets (bilingues) === */
  const filters = [
    { key: "all", label: language === "fr" ? "Tous" : "All" },
    { key: "ai", label: language === "fr" ? "IA & Deep Learning" : "AI & Deep Learning" },
    { key: "bigdata", label: "Big Data" },
    { key: "web", label: language === "fr" ? "Web & E-santé" : "Web & E-health" },
    { key: "iot", label: "IoT" },
  ];

  /* === Séquence du titre animé (machine à écrire) === */
  const typedSequence =
    language === "fr"
      ? ["Intelligence Artificielle", 2000, "Deep Learning", 2000, "Santé Digitale", 2000, "Machine Learning", 2000, "Vision par Ordinateur", 2000]
      : ["Artificial Intelligence", 2000, "Deep Learning", 2000, "Digital Health", 2000, "Machine Learning", 2000, "Computer Vision", 2000];

  /* === Chiffres clés (bandeau animé sous le hero) === */
  const stats = [
    {
      value: currentContent.projects.items.length,
      label: language === "fr" ? "Projets" : "Projects",
    },
    {
      value: 20,
      suffix: "+",
      label: language === "fr" ? "Technologies" : "Technologies",
    },
    {
      value: currentContent.experience.items.length,
      label: language === "fr" ? "Expériences" : "Experiences",
    },
    {
      value: currentContent.languageSkills.items.length,
      label: language === "fr" ? "Langues" : "Languages",
    },
  ];

  /* === Mapping libre des badges “tech” d’une expérience -> icônes === */
  const mapTechToIconKey = (t) => {
    const key = (t || "").toLowerCase().replace(/[^\w]/g, "");
    if (key.includes("tensorflow")) return "tensorflow";
    if (key.includes("keras")) return "keras";
    if (key.includes("opencv")) return "opencv";
    if (key.includes("scikitlearn") || key.includes("sklearn")) return "scikitlearn";
    if (key.includes("numpy")) return "numpy";
    if (key.includes("pandas")) return "pandas";
    if (key === "python") return "python";
    if (key.includes("git") && !key.includes("github")) return "git";
    if (key.includes("github")) return "github";
    if (key.includes("pytorch")) return "pytorch";
    if (key.includes("fastapi")) return "fastapi";
    if (key.includes("postgres")) return "postgresql";
    if (key.includes("redis")) return "redis";
    if (["html","css","javascript","mysql","firebase","docker","aws","arduino","raspberrypi","react","vercel"].includes(key)) return key;
    return null;
  };

  return (
    <div className={`container ${theme}`}>
      {/* 📖 Barre de progression de lecture */}
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />

      {/* 🌗 Bouton mode sombre/clair */}
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* 🌍 Bouton langue */}
      <button className="toggle-language" onClick={toggleLanguage}>
        {language === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
      </button>

      {/* 📌 Bouton Sidebar Mobile */}
      <button className="toggle-sidebar-mobile" onClick={toggleSidebar}>
        {isSidebarOpen ? "✖" : currentContent.contact}
      </button>

      {/* 📌 Sidebar gauche */}
      <div className={`sidebar ${isSidebarOpen ? "expanded" : ""}`}>
        <img src={profileImage} alt="Benchaou Nada" className="profile-img" />
        <h1>{currentContent.name}</h1>
        <p>{currentContent.title}</p>

        <div className="contact-info">
          <a href="tel:+212682291114" className="contact-link">
            📞 +212 6 82 29 11 14
          </a>
          <p>
            <a href="mailto:bnadabenchaou@gmail.com" className="contact-link">
              ✉ bnadabenchaou@gmail.com
            </a>
          </p>
        </div>

        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/nada-benchaou-105514253/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={theme === "light" ? linkedinLight : linkedinDark}
              alt="LinkedIn"
              className="social-icon"
            />
          </a>
          <a
            href="https://github.com/BNAD-A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={theme === "light" ? githubDark : githubLight}
              alt="GitHub"
              className="social-icon"
            />
          </a>
        </div>

        <a href="/BENCHAOU Nada CV FR.pdf" download className="download-btn">
          {currentContent.downloadCVFR}
        </a>
        <a href="/BENCHAOU Nada CV EN.pdf" download className="download-btn">
          {currentContent.downloadCVEN}
        </a>
      </div>

      {/* 📌 Barre latérale droite */}
      <div className={`right-sidebar ${isSidebarOpen ? "hidden" : ""}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                title={item.label}
                aria-current={activeSection === item.id ? "true" : undefined}
              >
                <i className={item.icon}></i> {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        {/* 📌 Section À propos */}
        <section id="about" className="about-section">
          <div className="hero-blobs" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="about-hello">{currentContent.about.hello}</div>

          <h1 className="about-name">
            {language === "fr" ? "Je suis" : "I’m"}{" "}
            <span className="about-firstname">{firstName}</span>{" "}
            {lastName}
          </h1>

          <div className="about-typed">
            <span className="typed-prefix">
              {language === "fr" ? "Spécialisée en " : "Specialized in "}
            </span>
            <TypeAnimation
              key={language}
              sequence={typedSequence}
              wrapper="span"
              speed={50}
              className="typed-text"
              repeat={Infinity}
              cursor={true}
            />
          </div>

          <h2 className="about-role">{currentContent.about.role}</h2>

          <p className="about-intro">{currentContent.about.content}</p>

          {/* 📊 Bandeau de chiffres clés animés */}
          <div className="stats-band">
            {stats.map((s, i) => (
              <StatCounter
                key={`${language}-${i}`}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>

          {/* ⌄ Indicateur de défilement */}
          <a href="#resume" className="scroll-down" aria-label="Scroll">
            <span></span>
          </a>
        </section>

        {/* Éducation */}
        <section id="resume" className="education reveal">
          <h2>{currentContent.education.title}</h2>
          <div className="education-container">
            {currentContent.education.items.map((edu, index) => (
              <div className="education-box" key={index}>
                <h3>{edu.year}</h3>
                <p>{edu.title}</p>
                <span>{edu.place}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Expérience */}
        <section id="experience" className="experience reveal">
          <h2>{currentContent.experience.title}</h2>
          <div className="experience-timeline">
            {currentContent.experience.items.map((exp, index) => (
              <article className="xp-card" key={index}>
                <div className="xp-dot" />
                <header className="xp-header">
                  <h3>{exp.role}</h3>
                  <span className="xp-period">{exp.period}</span>
                </header>
                <p className="xp-meta">
                  <strong>{exp.org}</strong> • {exp.location}
                </p>
                <ul className="xp-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                {/* Badges texte (existants) */}
                {Array.isArray(exp.tech) && exp.tech.length > 0 && (
                  <div className="experience-tech">
                    {exp.tech.map((t, i) => (
                      <span className="tech-badge" key={i}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* 🔥 Rangée d’icônes en miroir des badges “tech” */}
                {Array.isArray(exp.tech) && exp.tech.length > 0 && (
                  <IconRow
                    stack={exp.tech
                      .map(mapTechToIconKey)
                      .filter(Boolean)}
                  />
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Projets */}
        <section id="projects" className="projects reveal">
          <h2>{currentContent.projects.title}</h2>

          <div className="project-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${activeFilter === f.key ? "active" : ""}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {(() => {
            const filteredProjects = currentContent.projects.items
              .map((proj, index) => ({ proj, index }))
              .filter(
                ({ index }) =>
                  activeFilter === "all" ||
                  projectCategories[index] === activeFilter
              );
            const visibleProjects = showAllProjects
              ? filteredProjects
              : filteredProjects.slice(0, PROJECTS_LIMIT);
            const hiddenCount = filteredProjects.length - PROJECTS_LIMIT;
            return (
          <>
          <div className="projects-container">
            {visibleProjects.map(({ proj, index }) => (
              <div className="project-card" key={index}>
                <div className="project-header">
                  <h3>{proj.title}</h3>
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-icon"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      alt="GitHub"
                    />
                  </a>
                </div>
                <p>
                  <strong>{proj.date}</strong>
                </p>
                <ul className="project-details">
                  {(expandedProjects[index]
                    ? proj.details
                    : proj.details.slice(0, 1)
                  ).map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>

                {proj.details.length > 1 && (
                  <button
                    className="read-more-btn"
                    onClick={() => toggleProject(index)}
                    aria-expanded={!!expandedProjects[index]}
                  >
                    {expandedProjects[index]
                      ? language === "fr"
                        ? "Lire moins ▲"
                        : "Read less ▲"
                      : language === "fr"
                      ? "Lire plus ▼"
                      : "Read more ▼"}
                  </button>
                )}

                {/* 🔥 Rangée d’icônes associée au projet */}
                <IconRow stack={getProjectStack(proj.title)} />
              </div>
            ))}
          </div>

          {hiddenCount > 0 && (
            <div className="see-all-wrap">
              <button
                className="see-all-btn"
                onClick={() => setShowAllProjects((v) => !v)}
              >
                {showAllProjects
                  ? language === "fr"
                    ? "Voir moins ▲"
                    : "Show less ▲"
                  : language === "fr"
                  ? `Voir tout (${hiddenCount} de plus) ▼`
                  : `Show all (${hiddenCount} more) ▼`}
              </button>
            </div>
          )}
          </>
            );
          })()}
        </section>

        {/* Hard Skills */}
        <section id="skills" className="skills reveal">
          <h2>{currentContent.skills.title}</h2>
          <div className="skills-container">
            {currentContent.skills.items.map((skill, index) => (
            <div className="skill-box" key={index}>
              <h4>{skill.category}</h4>
              <p>{skill.skills}</p>

              {skill.stack && <IconRow stack={skill.stack} />}
            </div>
            ))}
          </div>
        </section>

        {/* Soft Skills */}
        <section id="soft-skills" className="soft-skills-section reveal">
          <h2>{currentContent.softSkills.title}</h2>
          <div className="soft-skills-container">
            {currentContent.softSkills.items.map((skill, index) => (
              <div className="soft-skill-box" key={index}>
                <i className={skill.icon}></i>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Langues */}
        <section id="languages" className="languages reveal">
          <h2>{currentContent.languageSkills.title}</h2>
          <div className="languages-container">
            {currentContent.languageSkills.items.map((lang, index) => (
              <div className="language-box" key={index}>
                <h3>{lang.name}</h3>
                <p>{lang.level}</p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: languagesVisible ? lang.width : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ⬆️ Bouton retour en haut */}
      <button
        className={`back-to-top ${showTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label={language === "fr" ? "Retour en haut" : "Back to top"}
      >
        ↑
      </button>
    </div>
  );
};

export default Portfolio;
