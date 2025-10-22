window.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const themeToggle = document.getElementById("theme-toggle");
  const visitorCount = document.getElementById("visitor-count");
  const mainContent = document.getElementById("main-content");

  // Sidebar toggle
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
  });

  // Visitor counter
  let count = localStorage.getItem("visitorCount");
  if (!count) count = 0;
  count++;
  localStorage.setItem("visitorCount", count);
  if (visitorCount) visitorCount.textContent = count;

  const navLinks = document.querySelectorAll(".sidebar nav a");
  function setActiveTab(tab) {
    navLinks.forEach(link => link.classList.remove("active"));
    tab.classList.add("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }

  document.getElementById("home-tab").addEventListener("click", e => {
    e.preventDefault();
    setActiveTab(e.target.closest("a"));
    mainContent.innerHTML = `
      <h2>Welcome to the Campus Dashboard</h2>
      <p>This page shows total visitor count and access to the interactive map.</p>
      <p><strong>Visitors:</strong> <span id="visitor-count">${count}</span></p>
    `;
  });

  document.getElementById("map-tab").addEventListener("click", e => {
    e.preventDefault();
    setActiveTab(e.target.closest("a"));
    mainContent.innerHTML = `
      <h2>Interactive Campus Map</h2>
      <div class="map-wrapper">
        <div class="map-buttons">
          <button id="level1" class="active">Level 1</button>
          <button id="level2">Level 2</button>
          <button id="level3">Level 3</button>
        </div>
        <iframe id="mapFrame" class="map-frame" src="map-level1.html"></iframe>
      </div>
    `;

    const levelButtons = document.querySelectorAll(".map-buttons button");
    const mapFrame = document.getElementById("mapFrame");

    levelButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        levelButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        mapFrame.src = `map-level${btn.textContent.split(" ")[1]}.html`;
      });
    });
  });

  document.getElementById("feedback-tab").addEventListener("click", e => {
    e.preventDefault();
    setActiveTab(e.target.closest("a"));
    mainContent.innerHTML = `
      <h2>Feedback Form</h2>
      <form class="feedback-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="5" placeholder="Your Message" required></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
    `;
  });
});
