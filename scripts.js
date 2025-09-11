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

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});
