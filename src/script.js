document.addEventListener("DOMContentLoaded", function () {
    // Vérifie si jQuery est bien chargé
    if (typeof jQuery !== "undefined") {
      console.log("jQuery est bien chargé !");
  
      // Applique le thème sauvegardé (clair ou sombre)
      const currentTheme = localStorage.getItem("theme") || "light";
      document.body.classList.remove("light", "dark");
      document.body.classList.add(currentTheme);
  
      // Bouton de bascule pour changer de thème
      const toggleButton = document.querySelector(".toggle-theme");
      if (toggleButton) {
        toggleButton.addEventListener("click", function () {
          const newTheme = document.body.classList.contains("light") ? "dark" : "light";
          document.body.classList.remove("light", "dark");
          document.body.classList.add(newTheme);
          localStorage.setItem("theme", newTheme);
        });
      }
  
      // Ajoute l'animation d'apparition au scroll
      $(".education, .projects, .skills, .languages").css("opacity", 0);
  
      $(window).scroll(function () {
        $(".education, .projects, .skills, .languages").each(function () {
          let position = $(this).offset().top;
          let scroll = $(window).scrollTop() + $(window).height();
          if (scroll > position) {
            $(this).animate({ opacity: 1 }, 800);
          }
        });
      });
  
    } else {
      console.error("Erreur : jQuery n'est pas défini.");
    }
  });
  