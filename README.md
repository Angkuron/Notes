# Angkuron — Study Notes Website (Frontend)

A responsive frontend for a study-notes platform covering **Class 9–10 Science**
and **Class 11–12 Biology**, built with plain HTML, CSS, and JavaScript (no frameworks).

## 1. Project structure

```
website/
│
├── index.html                     Homepage
├── css/
│   └── style.css                  All styling (variables at the top)
├── js/
│   └── script.js                  Hamburger menu + chapter grid generator
├── pages/
│   ├── science-9-10.html          Class 9–10 Science hub
│   ├── class-9.html               Class 9 chapter list (16 chapters)
│   ├── class-10.html              Class 10 chapter list (16 chapters)
│   ├── biology-11-12.html         Class 11–12 Biology hub
│   ├── class-11.html              Class 11 Biology chapter list (16 chapters)
│   ├── class-12.html              Class 12 Biology chapter list (16 chapters)
│   └── chapter-placeholder.html   "Coming soon" page shown for every chapter
└── assets/
    └── images/                    Put logos/photos here later
```

## 2. Opening the project in VS Code

1. Download/copy the whole `website` folder onto your computer.
2. Open VS Code → **File → Open Folder** → select the `website` folder.
3. Install the **Live Server** extension (by Ritwick Dey) from the Extensions
   tab (`Ctrl+Shift+X`, search "Live Server").

## 3. Running and testing locally

1. Right-click `index.html` in the VS Code file explorer.
2. Click **"Open with Live Server"**.
3. Your browser opens automatically at something like
   `http://127.0.0.1:5500/index.html`.
4. Click through: Home → Class 9–10 Science → Class 9 → any chapter, etc.
   Every link and card is fully wired up — nothing points to `#`.
5. To test responsiveness, open DevTools (`F12`) → toggle the device
   toolbar (`Ctrl+Shift+M`) and try phone/tablet sizes, or just resize
   your browser window.

(You don't strictly need Live Server — double-clicking `index.html` also
works — but Live Server auto-refreshes the page whenever you save a file,
which is much faster while developing.)

## 4. How the code works (brief)

- **Navigation bar**: the same `<header class="navbar">` markup is repeated
  at the top of every page (this is intentional — plain HTML has no
  built-in way to share a component across pages without a backend or a
  build tool). Each page marks its own tab as `active` by adding the
  `active` class to the matching link.
- **Home page cards**: `index.html` has two `<a class="big-card">` links
  that go straight to `pages/science-9-10.html` and
  `pages/biology-11-12.html`. Because they're real `<a href="...">` tags
  (not `<div>`s with JS click handlers), they work with keyboard
  navigation and "open in new tab" too.
- **Subject hub pages** (`science-9-10.html`, `biology-11-12.html`):
  two `.simple-card` links pointing to the class-specific chapter pages.
- **Chapter pages** (`class-9.html`, `class-10.html`, `class-11.html`,
  `class-12.html`): instead of hand-writing 16 nearly-identical `<a>`
  tags on four different pages (64 total), each page just contains one
  empty container:
  ```html
  <div class="chapter-grid" id="chapterGrid" data-class="9" data-subject="Science"></div>
  ```
  `js/script.js` reads the `data-class`/`data-subject` attributes and
  generates the 16 chapter cards automatically, each linking to
  `chapter-placeholder.html?class=9&subject=Science&chapter=1` (etc).
  This makes it trivial to change the chapter count or styling in one
  place later.
- **`chapter-placeholder.html`**: a single shared "coming soon" page.
  `script.js` reads the `class`, `subject`, and `chapter` values from the
  URL's query string and fills in the heading
  (e.g. "Class 9 Science — Chapter 3"). Later, you can replace individual
  chapter links in `script.js` with real pages (e.g. `chapter-9-1.html`)
  once you have actual notes for them.
- **`css/style.css`**: all colors, spacing, and radii are defined as CSS
  variables (`:root { --color-dark-green: ...; }`) at the top of the file,
  so you can retheme the whole site by changing a handful of values.
  Media queries at the bottom handle tablet (`900px`) and phone
  (`720px`/`600px`) breakpoints, including switching the nav to a
  hamburger menu.
- **`js/script.js`**: three small functions, all called once on
  `DOMContentLoaded`:
  1. `setupHamburgerMenu()` — toggles the mobile nav.
  2. `renderChapterGrid()` — builds the 16-chapter grid (see above).
  3. `fillPlaceholderDetails()` — fills in the "coming soon" heading.

## 5. Managing with Git & GitHub

```bash
cd website
git init
git add .
git commit -m "Initial frontend: homepage, subject pages, chapter grids"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## 6. Planned future additions (not built yet, on purpose)

- Real chapter names (replace the "Chapter N" placeholders generated in
  `script.js`).
- Individual notes/PPT pages with download buttons.
- Search functionality.
- Student login/registration and an admin dashboard for uploading notes —
  this will require a backend (e.g. Node.js + a database), which is
  intentionally **not** included in this version so the frontend stays
  simple to learn from and easy to deploy as static files in the
  meantime.
