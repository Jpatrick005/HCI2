document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const nav = document.querySelector(".site-header nav");
  const desktopSearch = document.querySelector(".header-actions .search");
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  if (!nav) return;

  // 1. Inject mobile search bar at the top of the drawer
  if (desktopSearch && !nav.querySelector(".mobile-nav-search")) {
    const searchWrap = document.createElement("div");
    searchWrap.className = "mobile-nav-search";
    const clonedSearch = desktopSearch.cloneNode(true);
    clonedSearch.removeAttribute("id");
    const clonedInput = clonedSearch.querySelector("input");
    if (clonedInput) clonedInput.removeAttribute("id");
    searchWrap.appendChild(clonedSearch);
    nav.prepend(searchWrap);
  }

  // 2. Lock background scroll when mobile drawer is open
  if (menuToggle) {
    menuToggle.addEventListener("change", () => {
      document.body.classList.toggle("modal-open", menuToggle.checked);
    });
  }

  // 3. Mobile Accordion Toggle (+ / −) on tap
  const navItems = nav.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const link = item.querySelector(".nav-link");
    const dropdown = item.querySelector(".dropdown-menu");
    if (!link || !dropdown) return;

    link.addEventListener("click", (e) => {
      if (!mobileQuery.matches) return; // Desktop keeps normal link navigation

      e.preventDefault();
      e.stopPropagation();

      const willOpen = !item.classList.contains("is-open");
      navItems.forEach((other) => other.classList.remove("is-open"));
      if (willOpen) item.classList.add("is-open");
    });
  });

  // 4. Close drawer cleanly when resizing back to desktop
  mobileQuery.addEventListener("change", (e) => {
    if (!e.matches && menuToggle && menuToggle.checked) {
      menuToggle.checked = false;
      document.body.classList.remove("modal-open");
      navItems.forEach((item) => item.classList.remove("is-open"));
    }
  });
});