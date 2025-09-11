const settingsPopup = document.getElementById("settingsPopup");
    const themeToggle = document.getElementById("themeToggle");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const searchEngineSelect = document.getElementById("searchEngineSelect");

    const searchEngines = {
      bing: {
        action: "https://www.bing.com/search",
        placeholder: "Search with Bing..."
      },
      google: {
        action: "https://www.google.com/search",
        placeholder: "Search with Google..."
      },
      duckduckgo: {
        action: "https://duckduckgo.com/",
        placeholder: "Search with DuckDuckGo..."
      }
    };

    function applySearchEngine(engine) {
      const config = searchEngines[engine] || searchEngines.bing;
      searchForm.action = config.action;
      searchInput.placeholder = config.placeholder;
      searchEngineSelect.value = engine;
    }

    function changeSearchEngine() {
      const selected = searchEngineSelect.value;
      localStorage.setItem("searchEngine", selected);
      applySearchEngine(selected);
    }

    function toggleSettings() {
      settingsPopup.style.display =
        settingsPopup.style.display === "block" ? "none" : "block";
    }

    function toggleTheme() {
      const isDark = themeToggle.checked;
      document.body.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    // Initial Load
    document.addEventListener("DOMContentLoaded", () => {
      // Theme
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeToggle.checked = true;
      }

      // Search Engine
      const savedEngine = localStorage.getItem("searchEngine") || "bing";
      applySearchEngine(savedEngine);
    });

    document.addEventListener("click", (e) => {
      if (!settingsPopup.contains(e.target) && !e.target.classList.contains("menu")) {
        settingsPopup.style.display = "none";
      }
    });
