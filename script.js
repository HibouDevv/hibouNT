// Theme initialization
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
});

let use24Hour = false; // will be set based on settings

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  const timeEl = document.querySelector("#clock .time");
  const ampmEl = document.querySelector("#clock .ampm");
  const secondsEl = document.querySelector("#clock .seconds");

  if (use24Hour) {
    // 24-hour format
    timeEl.textContent = `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
    ampmEl.textContent = ""; // hide AM/PM
    secondsEl.textContent = ""; // hide separate seconds
  } else {
    // 12-hour format
    let displayHours = hours % 12 || 12;
    let ampm = hours >= 12 ? "PM" : "AM";
    timeEl.textContent = `${displayHours}:${minutes}`;
    ampmEl.textContent = ampm;
    secondsEl.textContent = seconds;
  }
}

function updateDate() {
  const currentDateElement = document.getElementById('currentDate');
  if (!currentDateElement) return;
  currentDateElement.innerHTML = new Date().toDateString().split(' ').slice(0, 3).join(' ');
}
setInterval(updateDate, 1000);
setInterval(updateClock, 1000);
updateClock();
updateDate();

// Search logic
let selectedEngine = "google"; // default
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;
  let url = "https://www.google.com/search?q=" + encodeURIComponent(query);
  window.location.href = url;
});
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});


function updateGreeting() {
  const greetingElement = document.getElementById("greeting");
  const name = localStorage.getItem("userName") || "friend";
  const hour = new Date().getHours();
  let timeGreeting = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  if (greetingElement) greetingElement.textContent = `${timeGreeting}, ${name}`;
}


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
let todos = [];

function loadTodos() {
  const saved = localStorage.getItem("todos");
  todos = saved ? JSON.parse(saved) : [];
}

function renderTodos() {
  loadTodos();
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
      loadTodos();
      todos.push({ text, done: false });
      saveTodos();
      todoInput.value = "";
    }
  }
});



document.getElementById("saveName").addEventListener("click", () => {
  const name = document.getElementById("userName").value.trim();
  if (name) {
    localStorage.setItem("userName", name);
    document.getElementById("namePrompt").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    const todoCont = document.querySelector(".todo-container");
    todoCont.style.display = "block";
    todoCont.classList.add("visible");
    document.getElementById("openSettings").style.display = "block";
    updateGreeting();
    updateClock();
    updateDate();
    renderTodos();
  }
});


function openSettings() {
  document.getElementById("settingsOverlay").classList.add("settings-visible");
  document.getElementById("openSettings").style.display = "none";
}
function closeSettings() {
  document.getElementById("settingsOverlay").classList.remove("settings-visible");
  document.getElementById("openSettings").style.display = "block";
}
document.getElementById("openSettings").addEventListener("click", openSettings);
document.getElementById("closeSettings").addEventListener("click", closeSettings);


// Settings panel content and logic
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
  <h3>Clock Format</h3>
  <label>
    <input type="radio" name="clockFormat" value="12" id="clockFormat12" checked />
    12-Hour
    </label><br/>
    <label>
    <input type="radio" name="clockFormat" value="24" id="clockFormat24" />
    24-Hour
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
wireUpSettings();

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
  // Clock format
  const clock12Radio = document.getElementById("clockFormat12");
  const clock24Radio = document.getElementById("clockFormat24");
  let savedClockFormat = localStorage.getItem("clockFormat");
  if (!savedClockFormat) {
    savedClockFormat = "12";
    localStorage.setItem("clockFormat", "12");
  }
  if (savedClockFormat === "12") {
    clock12Radio.checked = true;
    use24Hour = false;
  } else {
    clock24Radio.checked = true;
    use24Hour = true;
  }
  clock12Radio.addEventListener("change", () => {
    use24Hour = false;
    localStorage.setItem("clockFormat", "12");
    updateClock();
  });
  clock24Radio.addEventListener("change", () => {
    use24Hour = true;
    localStorage.setItem("clockFormat", "24");
    updateClock();
  });

  // Name override
  const nameInput = document.getElementById("nameOverrideInput");
  if (nameInput) {
    nameInput.value = localStorage.getItem("userName") || "";
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

function clearTodo() {
  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  alert("To-do list cleared!");
}



// To-Do List Logic
const todoContainer = document.querySelector(".todo-container");

function loadTodos() {
  const saved = localStorage.getItem("todos");
  todos = saved ? JSON.parse(saved) : [];
}

function renderTodos() {
  loadTodos();
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
    deleteBtn.className = "delete-btn";
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

if (todoInput) {
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = todoInput.value.trim();
      if (text) {
        loadTodos();
        todos.push({ text, done: false });
        saveTodos();
        todoInput.value = "";
      }
    }
  });
}

// Initial render and name check on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("userName");
  const namePrompt = document.getElementById("namePrompt");
  const mainContent = document.getElementById("mainContent");
  const openSettingsBtn = document.getElementById("openSettings");

  if (!savedName) {
    // Show name prompt only
    if (namePrompt) namePrompt.style.display = "flex";
    if (mainContent) mainContent.style.display = "none";
    if (todoContainer) todoContainer.style.display = "none";
    if (openSettingsBtn) openSettingsBtn.style.display = "none";
  } else {
    // Show everything else
    if (namePrompt) namePrompt.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
    if (todoContainer) {
      todoContainer.style.display = "block";
      todoContainer.classList.add("visible");
    }
    if (openSettingsBtn) openSettingsBtn.style.display = "block";
    updateGreeting();
    updateClock();
    updateDate();
    renderTodos();
  }
});


