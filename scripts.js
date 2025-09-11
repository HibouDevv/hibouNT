const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const savedEngine = localStorage.getItem("searchEngine") || "bing";
      applySearchEngine(savedEngine);
    });

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
