window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
});

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

const namePrompt = document.getElementById("namePrompt");
const saveNameBtn = document.getElementById("saveName");
const mainContent = document.getElementById("mainContent");

function updateGreeting() {
  const greetingElement = document.getElementById("greeting");
  const name = localStorage.getItem("userName") || "friend";
  const hour = new Date().getHours();

  let timeGreeting = "";

  if (hour < 5) {
    timeGreeting = "Good night";
  } else if (hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour < 17) {
    timeGreeting = "Good afternoon";
  } else {
    timeGreeting = "Good evening";
  }

  greetingElement.innerHTML = `${timeGreeting}, ${name}`;
}

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
    document.querySelector(".todo-container").classList.add("visible"); // ✅ move this here
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

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".todo-container").classList.add("visible");
});

document.getElementById("saveName").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  if (name) {
    localStorage.setItem("username", name); // optional: store it
    showGreeting(name);                     // display greeting
    revealTodoList();                       // fade in to-do list
  }
});

function revealTodoList() {
  const todo = document.querySelector(".todo-container");
  setTimeout(() => {
    todo.classList.add("visible");
  }, 500); // slight delay after greeting appears
}

function openSettings() {
  document.getElementById("settingsOverlay").classList.add("settings-visible");
}

function closeSettings() {
  document.getElementById("settingsOverlay").classList.remove("settings-visible");
}

document.getElementById("closeSettings").addEventListener("click", closeSettings);

// Section templates
const settingsContent = `
  <h3>Theme Settings</h3>
  <label>
    <input type="radio" name="themeMode" value="light" id="lightMode" />
    Light Mode
  </label><br/>
  <label>
    <input type="radio" name="themeMode" value="dark" id="darkMode" />
    Dark Mode
  </label>

  <h3>Particles</h3>
  <label>
    <input type="checkbox" id="particlesToggle" checked />
    Show Background Particles
  </label>

  <h3>Ambient Sound</h3>
  <label>
    <input type="checkbox" id="soundToggle" disabled />
    Coming Soon
  </label>

  <h3>Greeting</h3>
  <input type="text" id="nameOverrideInput" placeholder="What should we call you?" />
  <button onclick="saveNameOverride()">Save</button>

  <h3>To-Do Settings</h3>
  <button onclick="clearTodo()">Clear All Tasks</button>
`;

document.getElementById("settingsPanel").innerHTML = settingsContent;
wireUpSettings(); // new function to handle all logic

// Load section content
document.querySelectorAll(".settings-sidebar li").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".settings-sidebar li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");
    const section = item.getAttribute("data-section");
    document.getElementById("settingsPanel").innerHTML = sections[section] || "<p>Coming soon.</p>";
    wireUpSection(section);
  });
});

// Open/Close overlay
function openSettings() {
  document.getElementById("settingsOverlay").classList.add("settings-visible");
  document.getElementById("openSettings").style.display = "none"; // 🔥 hide button
}

function closeSettings() {
  document.getElementById("settingsOverlay").classList.remove("settings-visible");
  document.getElementById("openSettings").style.display = "block"; // ✨ show button
}

document.getElementById("openSettings").addEventListener("click", openSettings);
document.getElementById("closeSettings").addEventListener("click", closeSettings);

  if (section === "particles") {
    document.getElementById("particlesToggle").addEventListener("change", (e) => {
      const particles = document.getElementById("particlesCanvas");
      if (particles) particles.style.display = e.target.checked ? "block" : "none";
    });
  }

 if (section === "theme") {
  const lightRadio = document.getElementById("lightMode");
  const darkRadio = document.getElementById("darkMode");

  // Set initial state based on saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    lightRadio.checked = true;
    document.body.classList.add("light-mode");
  } else {
    darkRadio.checked = true;
    document.body.classList.remove("light-mode");
  }

  lightRadio.addEventListener("change", () => {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  });

  darkRadio.addEventListener("change", () => {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  });
}

function saveGreeting() {
  const greeting = document.getElementById("greetingInput").value.trim();
  if (greeting) {
    localStorage.setItem("customGreeting", greeting);
    updateGreeting(); // refresh greeting display
    alert("Greeting saved!");
  }
}

function clearTodo() {
  todos = []; // clear the array
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(); // refresh the list
  alert("To-do list cleared!");
}

function wireUpSettings() {
  // Theme toggle
  const lightRadio = document.getElementById("lightMode");
  const darkRadio = document.getElementById("darkMode");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    lightRadio.checked = true;
    document.body.classList.add("light-mode");
  } else {
    darkRadio.checked = true;
    document.body.classList.remove("light-mode");
  }

  lightRadio.addEventListener("change", () => {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  });

  darkRadio.addEventListener("change", () => {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  });

  // Particles toggle
  const particlesToggle = document.getElementById("particlesToggle");
  const particlesCanvas = document.getElementById("tsparticles");
  particlesToggle.addEventListener("change", (e) => {
    if (particlesCanvas) {
      particlesCanvas.style.display = e.target.checked ? "block" : "none";
    }
  });

  const greetingInput = document.getElementById("greetingInput");
  if (greetingInput) {
    greetingInput.value = localStorage.getItem("customGreeting") || "";

    const nameInput = document.getElementById("nameOverrideInput");
    if (nameInput) {
      nameInput.value = localStorage.getItem("userName") || "";
    }
  }
}

  function saveNameOverride() {
  const newName = document.getElementById("nameOverrideInput").value.trim();
  if (newName) {
    localStorage.setItem("userName", newName);
    updateGreeting();
    alert("Name updated!");
  }
}
