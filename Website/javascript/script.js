const translations = {
  es: {
    inicio: "Inicio",
    gatitos: "Nuestros Gatitos",
    menu: "Menú",
    title: "Kat Kaffe",
    subtitle: "Los mejores KATFES de Tepito y Acoxpa",
    presentation:
      "Encontraras a los mejores michis de toda las colonias populares de la CDMX, te sentiras por primera vez en un ambiente whitexican en la esquina mas peligrosa, ¿qué estas esperando? ¡ven y conocenos!",
    catsTitle: "Nuestros Gatitos",
    reserveBtn: "Reservar",
  },

  en: {
    inicio: "Home",
    gatitos: "Our Cats",
    menu: "Menu",
    title: "Kat Kaffe",
    subtitle: "The best CATFES in Tepito and Acoxpa",
    presentation:
      "You'll find the best cats in all the working-class neighborhoods of Mexico City. You'll feel like you're in a 'whitexican' environment for the first time, even on the most dangerous corner. What are you waiting for? Come and meet us!",
    catsTitle: "Our Cats",
    reserveBtn: "Reserve",
  },
};

const gifURL = "https://media.tenor.com/8VuZc8I8f7EAAAAj/oiia-cat.gif";

const preloadGif = new Image();
preloadGif.src = gifURL;

const gif = document.getElementById("oiiaCat");
const audioOiia = document.getElementById("oiiaMusic");

gif.addEventListener("click", () => {
    audioOiia.currentTime = 0;
    audioOiia.play();

    gif.src = gifURL + "?" + Date.now();

    audioOiia.onended = () => {
        gif.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec666739-122f-41a3-8b0a-c01590f5e9a3/djwlgwe-cb474920-1753-4c4a-a4f4-981a7bcc0eff.png/v1/fill/w_1280,h_1280/oiia_cat_assets_by_awesomeconsoles7_djwlgwe-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lYzY2NjczOS0xMjJmLTQxYTMtOGIwYS1jMDE1OTBmNWU5YTMvZGp3bGd3ZS1jYjQ3NDkyMC0xNzUzLTRjNGEtYTRmNC05ODFhN2JjYzBlZmYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.JmDbU4utg9EFz_jHYqDt9XMPoeJNPT62V3k23yB1eXk"
    };
});

const langButtons = document.querySelectorAll(".lang-option");

langButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const lang = index === 0 ? "es" : "en";
    translatePage(lang);

    // UI feedback (activo)
    langButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

function translatePage(lang) {
  const elements = document.querySelectorAll("[data-translate]");

  elements.forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = translations[lang][key];
  });
}