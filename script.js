// Fixed-screen portfolio: navigation changes pages without scrolling.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll("main > section.section");

function showPage(pageId) {
  const target = document.getElementById(pageId);
  if (!target || !target.classList.contains("section")) return;

  pages.forEach((page) => page.classList.toggle("active-page", page === target));
  navItems.forEach((link) => {
    const active = link.getAttribute("href") === `#${pageId}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  history.replaceState(null, "", `#${pageId}`);
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

// Any internal section link switches the visible screen instead of scrolling.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.getAttribute("href").slice(1);
    if (document.getElementById(pageId)?.classList.contains("section")) {
      event.preventDefault();
      showPage(pageId);
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
const initialPage = location.hash.slice(1);
showPage(document.getElementById(initialPage)?.classList.contains("section") ? initialPage : "home");
