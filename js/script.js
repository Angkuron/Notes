/* =========================================================
   ANGKURON — MAIN SCRIPT
   1. Mobile hamburger menu toggle
   2. Chapter grid generator (used on class-9/10/11/12 pages)
   3. Chapter placeholder page content filler
   ========================================================= */

// ---------- 1. HAMBURGER MENU ----------
// This runs on every page because every page includes the same navbar.
function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// ---------- 2. CHAPTER GRID GENERATOR ----------
// Any page that wants a 16-chapter grid just needs:
//   <div id="chapterGrid" data-class="9" data-subject="Science"></div>
// This function fills it in automatically instead of us writing
// 16 near-identical <a> tags by hand on 4 different pages.
function renderChapterGrid() {
  const grid = document.getElementById("chapterGrid");
  if (!grid) return;

  const classLevel = grid.dataset.class; // e.g. "9", "10", "11", "12"
  const subject = grid.dataset.subject || "Science"; // "Science" or "Biology"
  const totalChapters = 16;

  for (let i = 1; i <= totalChapters; i++) {
    const link = document.createElement("a");
    // Every chapter currently points to the same placeholder page.
    // Later, you can replace this href with a real notes page,
    // e.g. `chapter-9-1.html`.
    link.href = `chapter-placeholder.html?class=${encodeURIComponent(
      classLevel
    )}&subject=${encodeURIComponent(subject)}&chapter=${i}`;
    link.className = "chapter-card";

    const badge = document.createElement("span");
    badge.className = "chapter-number-badge";
    badge.textContent = i;

    const label = document.createElement("span");
    label.textContent = `Chapter ${i}`;

    link.appendChild(badge);
    link.appendChild(label);
    grid.appendChild(link);
  }
}

// ---------- 3. CHAPTER PLACEHOLDER PAGE FILLER ----------
// Reads ?class=&subject=&chapter= from the URL and fills in the
// heading on chapter-placeholder.html so every chapter link doesn't
// need its own separate HTML file yet.
function fillPlaceholderDetails() {
  const titleEl = document.getElementById("placeholderTitle");
  if (!titleEl) return; // Not on the placeholder page, skip.

  const params = new URLSearchParams(window.location.search);
  const classLevel = params.get("class");
  const subject = params.get("subject");
  const chapter = params.get("chapter");

  if (classLevel && chapter) {
    titleEl.textContent = `Class ${classLevel} ${subject || ""} — Chapter ${chapter}`;
  } else {
    titleEl.textContent = "Notes";
  }
}

// ---------- RUN EVERYTHING ONCE THE PAGE LOADS ----------
document.addEventListener("DOMContentLoaded", () => {
  setupHamburgerMenu();
  renderChapterGrid();
  fillPlaceholderDetails();
});
