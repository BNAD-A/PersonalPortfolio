document.addEventListener("DOMContentLoaded", function () {
  if (typeof jQuery !== "undefined") {
      console.log("jQuery est bien chargé !");
      
      $(".education, .skills, .languages").css("opacity", 0);

      $(window).scroll(function () {
          $(".education, .skills, .languages").each(function () {
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
