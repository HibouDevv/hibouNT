const updateTime = () => {
  const currentTimeElement = document.getElementById('currentTime');
  currentTimeElement.innerHTML = new Date().toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');
}
updateTime();
setInterval(updateTime, 1000);

const updateDate = () => {
  const currentDateElement = document.getElementById('currentDate');
  currentDateElement.innerHTML = new Date().toDateString().split(' ').slice(0, 3).join(' ');
}
updateDate();
setInterval(updateDate, 1000);

// Theme toggle
document.getElementById("themeToggle").addEventListener("change", (e) => {
  const theme = e.target.value;
  document.body.classList.toggle("light-mode", theme === "light");
});

// Search engine selection
let selectedEngine = "google"; // default

document.getElementById("searchEngine").addEventListener("change", (e) => {
  selectedEngine = e.target.value;
});

// Search logic
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  let url = "";
  switch (selectedEngine) {
    case "google":
      url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      break;
    case "bing":
      url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
      break;
    case "duckduckgo":
      url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      break;
  }

  window.location.href = url;
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});

// Load saved preferences
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const savedEngine = localStorage.getItem("searchEngine");

  if (savedTheme) {
    document.getElementById("themeToggle").value = savedTheme;
    document.body.classList.toggle("light-mode", savedTheme === "light");
  }

  if (savedEngine) {
    document.getElementById("searchEngine").value = savedEngine;
    selectedEngine = savedEngine;
  }
});

// Save preferences on change
document.getElementById("themeToggle").addEventListener("change", (e) => {
  const theme = e.target.value;
  document.body.classList.toggle("light-mode", theme === "light");
  localStorage.setItem("theme", theme);
});

document.getElementById("searchEngine").addEventListener("change", (e) => {
  selectedEngine = e.target.value;
  localStorage.setItem("searchEngine", selectedEngine);
});
