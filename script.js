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

const namePrompt = document.getElementById("namePrompt");
const saveNameBtn = document.getElementById("saveName");
const mainContent = document.getElementById("mainContent");

const updateGreeting = () => {
  const greetingElement = document.getElementById("greeting");
  const name = localStorage.getItem("userName") || "friend";
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 5) {
    greeting = "Good night";
  } else if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  greetingElement.innerHTML = `${greeting}, ${name}`;
};

window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("userName");

  if (!savedName) {
    namePrompt.style.display = "flex";
    mainContent.style.display = "none";
  } else {
    namePrompt.style.display = "none";
    mainContent.style.display = "block";
    updateGreeting();
    updateTime();
    updateDate();
  }
});

saveNameBtn.addEventListener("click", () => {
  const input = document.getElementById("userName").value.trim();
  if (input) {
    localStorage.setItem("userName", input);
    namePrompt.style.display = "none";
    mainContent.style.display = "block";
    updateGreeting();
    updateTime();
    updateDate();
  }
});

const bookmarksBar = document.getElementById("bookmarksBar");
const addBtn = document.getElementById("addBookmark");
const nameInput = document.getElementById("bookmarkName");
const urlInput = document.getElementById("bookmarkURL");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderBookmarks() {
  bookmarksBar.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    const icon = document.createElement("a");
    icon.href = bookmark.url;
    icon.target = "_blank";
    icon.className = "bookmark-icon";
    icon.setAttribute("data-tooltip", `${bookmark.name} (${bookmark.url})`);
    icon.innerText = bookmark.name[0].toUpperCase(); // First letter as icon

    bookmarksBar.appendChild(icon);
  });
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  if (!name || !url) return;

  bookmarks.push({ name, url });
  nameInput.value = "";
  urlInput.value = "";
  saveBookmarks();
});

window.addEventListener("DOMContentLoaded", renderBookmarks);

const foldersContainer = document.getElementById("foldersContainer");
const addFolderBtn = document.getElementById("addFolder");
const folderNameInput = document.getElementById("folderName");

let folders = JSON.parse(localStorage.getItem("folders")) || [];

function renderFolders() {
  foldersContainer.innerHTML = "";
  folders.forEach((folder, folderIndex) => {
    const folderDiv = document.createElement("div");
    folderDiv.className = "folder";

    const header = document.createElement("h3");
    header.innerHTML = `${folder.name} <button onclick="deleteFolder(${folderIndex})">✕</button>`;
    folderDiv.appendChild(header);

    const bookmarkList = document.createElement("div");
    bookmarkList.className = "bookmark-list";

    folder.bookmarks.forEach((bookmark, bookmarkIndex) => {
      const item = document.createElement("div");
      item.className = "bookmark";
      item.innerHTML = `
        <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
        <button onclick="deleteBookmark(${folderIndex}, ${bookmarkIndex})">✕</button>
      `;
      bookmarkList.appendChild(item);
    });

    const addForm = document.createElement("div");
    addForm.innerHTML = `
      <input type="text" placeholder="Name" id="name-${folderIndex}" />
      <input type="url" placeholder="URL" id="url-${folderIndex}" />
      <button onclick="addBookmark(${folderIndex})">Add</button>
    `;
    folderDiv.appendChild(bookmarkList);
    folderDiv.appendChild(addForm);
    foldersContainer.appendChild(folderDiv);
  });
}

function saveFolders() {
  localStorage.setItem("folders", JSON.stringify(folders));
  renderFolders();
}

addFolderBtn.addEventListener("click", () => {
  const name = folderNameInput.value.trim();
  if (!name) return;
  folders.push({ name, bookmarks: [] });
  folderNameInput.value = "";
  saveFolders();
});

function addBookmark(folderIndex) {
  const name = document.getElementById(`name-${folderIndex}`).value.trim();
  const url = document.getElementById(`url-${folderIndex}`).value.trim();
  if (!name || !url) return;
  folders[folderIndex].bookmarks.push({ name, url });
  saveFolders();
}

function deleteBookmark(folderIndex, bookmarkIndex) {
  folders[folderIndex].bookmarks.splice(bookmarkIndex, 1);
  saveFolders();
}

function deleteFolder(folderIndex) {
  folders.splice(folderIndex, 1);
  saveFolders();
}

window.addEventListener("DOMContentLoaded", renderFolders);
