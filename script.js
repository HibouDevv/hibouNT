// Clock format preference
let clockFormat = "24"; // default

// Time and Date
const updateTime = () => {
  const currentTimeElement = document.getElementById('currentTime');
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, '0');

  if (clockFormat === "12") {
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    currentTimeElement.innerHTML = `${hours}:${minutes} ${suffix}`;
  } else {
    currentTimeElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes}`;
  }
};

const updateDate = () => {
  const currentDateElement = document.getElementById('currentDate');
  currentDateElement.innerHTML = new Date().toDateString().split(' ').slice(0, 3).join(' ');
};

updateTime();
updateDate();
setInterval(updateTime, 1000);
setInterval(updateDate, 1000);

// Theme toggle
document.getElementById("themeToggle").addEventListener("change", (e) => {
  const theme = e.target.value;
  document.body.classList.toggle("light-mode", theme === "light");
  localStorage.setItem("theme", theme);
});

// Search engine selection
let selectedEngine = "google"; // default

document.getElementById("searchEngine").addEventListener("change", (e) => {
  selectedEngine = e.target.value;
  localStorage.setItem("searchEngine", selectedEngine);
});

// Clock format selection
document.getElementById("clockFormat").addEventListener("change", (e) => {
  clockFormat = e.target.value;
  localStorage.setItem("clockFormat", clockFormat);
  updateTime(); // refresh immediately
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
  const savedFormat = localStorage.getItem("clockFormat");

  if (savedTheme) {
    document.getElementById("themeToggle").value = savedTheme;
    document.body.classList.toggle("light-mode", savedTheme === "light");
  }

  if (savedEngine) {
    document.getElementById("searchEngine").value = savedEngine;
    selectedEngine = savedEngine;
  }

  if (savedFormat) {
    document.getElementById("clockFormat").value = savedFormat;
    clockFormat = savedFormat;
  }

  updateTime(); // ensure correct format on load
});

// Menu toggle
const menuToggle = document.getElementById("menuToggle");
const settingsMenu = document.getElementById("settingsMenu");

menuToggle.addEventListener("click", () => {
  const isVisible = settingsMenu.style.display === "block";
  settingsMenu.style.display = isVisible ? "none" : "block";
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!settingsMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    settingsMenu.style.display = "none";
  }
});
