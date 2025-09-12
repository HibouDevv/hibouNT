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

tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    move: { enable: true, speed: 0.6 },
    color: { value: "#888888" },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    links: { enable: false }
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false }
    }
  },
  background: { color: "transparent" }
});

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) li.classList.add("checked");

    li.onclick = () => {
      todos[index].done = !todos[index].done;
      saveTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.style.background = "none";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "inherit";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos();
    };

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const text = todoInput.value.trim();
    if (text) {
      todos.push({ text, done: false });
      todoInput.value = "";
      saveTodos();
    }
  }
});

window.addEventListener("DOMContentLoaded", renderTodos);

window.addEventListener("DOMContentLoaded", () => {
  const todo = document.querySelector(".todo-container");
  setTimeout(() => {
    todo.classList.add("visible");
  }, 100);

  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo.text;
      if (todo.done) li.classList.add("checked");

      li.onclick = () => {
        todos[index].done = !todos[index].done;
        saveTodos();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✕";
      deleteBtn.style.background = "none";
      deleteBtn.style.border = "none";
      deleteBtn.style.color = "inherit";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        todos.splice(index, 1);
        saveTodos();
      };

      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = todoInput.value.trim();
      if (text) {
        todos.push({ text, done: false });
        todoInput.value = "";
        saveTodos();
      }
    }
  });

  renderTodos();
});
