// Sidebar toggle
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  menuBtn.classList.remove("active");
});

// Dark mode toggle
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// === ONLINE VISITOR COUNTER ===
const countElement = document.getElementById("count");

// Replace with your own unique namespace and key if you like
const counterUrl = "https://api.countapi.xyz/hit/campus-dashboard/visits";

fetch(counterUrl)
  .then(res => res.json())
  .then(data => {
    let total = data.value;
    animateCounter(countElement, total);
  })
  .catch(() => {
    countElement.textContent = "Error";
  });

// Smooth counting animation
function animateCounter(el, endValue) {
  let start = 0;
  const duration = 1000;
  const stepTime = Math.abs(Math.floor(duration / endValue));
  const timer = setInterval(() => {
    start++;
    el.textContent = start;
    if (start >= endValue) clearInterval(timer);
  }, stepTime);
}

// Navigation content
const mainContent = document.getElementById("main-content");

document.getElementById("home-tab").addEventListener("click", (e) => {
  e.preventDefault();
  mainContent.innerHTML = `
    <section>
      <h2>Welcome to the Campus Interactive Dashboard</h2>
      <p>Explore the interactive campus map and share your feedback with us!</p>
      <div class="visitor-box">
        <i class="fas fa-user-group"></i>
        <div class="visitor-text">
          <p>Total Visitors</p>
          <h3 id="count">Loading...</h3>
        </div>
      </div>
    </section>
  `;
  closeSidebar();
  reloadVisitorCount();
});

document.getElementById("map-tab").addEventListener("click", (e) => {
  e.preventDefault();
  mainContent.innerHTML = `
    <section>
      <h2>Interactive Campus Map</h2>
      <div style="border:1px solid #ccc; height:400px; border-radius:10px; background:#e2e8f0; display:flex; align-items:center; justify-content:center;">
        [Map Placeholder]
      </div>
    </section>
  `;
  closeSidebar();
});

document.getElementById("feedback-tab").addEventListener("click", (e) => {
  e.preventDefault();
  mainContent.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:center; height:calc(100vh - 60px);">
      <form style="background:white; border-radius:12px; padding:25px; max-width:400px; width:100%; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
        <h2 style="text-align:center; margin-bottom:15px;">Feedback Form</h2>
        <input type="text" placeholder="Your Name" required style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:8px;">
        <input type="email" placeholder="Your Email" required style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:8px;">
        <textarea placeholder="Your Message" rows="5" required style="width:100%; padding:10px; border:1px solid #ccc; border-radius:8px;"></textarea>
        <button type="submit" style="width:100%; background:#2563eb; color:white; padding:12px; border:none; border-radius:8px; margin-top:10px;">Submit</button>
      </form>
    </div>
  `;
  closeSidebar();
});

// Helper functions
function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  menuBtn.classList.remove("active");
}

function reloadVisitorCount() {
  const countEl = document.getElementById("count");
  fetch(counterUrl)
    .then(res => res.json())
    .then(data => {
      animateCounter(countEl, data.value);
    });
}
