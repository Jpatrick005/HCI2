document.addEventListener("DOMContentLoaded", () => {
  const exhibitions = [
    {
      id: "roma",
      title: "Roma Publications 1-524",
      subtitle: "Graphic Design Visiting Artist Show",
      cardDate: "Sep 29 - Oct 15, 2026",
      modalDate: "September 29 - October 15, 2026",
      year: "2026",
      course: "Graphic Design",
      image: "images/roma-publications.jpg",
      docImage: null,
      description: "Roma Publications is free and open to the public from September 29 - October 15 2026, 2–6 pm.",
      credit: "",
    },
    {
      id: "weeds",
      title: "In the Weeds",
      subtitle: "Graphic Design Course Exhibition",
      cardDate: "Apr 10–16, 2026",
      modalDate: "April 10 – 16, 2026",
      year: "2026",
      course: "Graphic Design",
      image: "images/in-the-weeds.jpg",
      docImage: "images/in-the-weeds.jpg",
      description: "In the Weeds is free and open to the public from April 10–16, 2026, 12–4 pm.",
      credit: "Documentation photography by Lindsey Mancini, Assistant Director of Communication.",
    },
    {
      id: "think-tank",
      title: "Think Tank 2026",
      subtitle: "Gateway Mural and Exhibition",
      cardDate: "Sep 5–24, 2026",
      modalDate: "September 5 – 24, 2026",
      year: "2026",
      course: "Gateway",
      image: "images/think-tank.jpg",
      docImage: "images/think-tank.jpg",
      description: "Think Tank 2026 is free and open to the public from September 5–24, 2026, 12–5 pm.",
      credit: "Documentation photography by Yale School of Art Communications.",
    },
    {
      id: "good-form",
      title: "Good Form II",
      subtitle: "Sculpture MFA Thesis Exhibition",
      cardDate: "Mar 21–29, 2026",
      modalDate: "March 21 – 29, 2026",
      year: "2026",
      course: "Sculpture",
      image: "images/good-form-ii.jpg",
      docImage: "images/good-form-ii.jpg",
      description: "Good Form II is free and open to the public from April 21–29, 2026, 6–8 pm.",
      credit: "Documentation photography by Pat Garcia, Photography MFA '24.",
    },
  ];

  const grid = document.getElementById("exhibits-grid");
  const heading = document.getElementById("exhibits-results-heading");
  const sortSelect = document.getElementById("exhibit-sort");
  const courseSelect = document.getElementById("exhibit-course");
  const searchInput = document.getElementById("exhibit-search");
  const yearPills = document.querySelectorAll(".year-pill");

  let activeYear = "all";
  let activeExhibit = null;

  function renderGrid() {
    const courseVal = courseSelect ? courseSelect.value : "all";
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const sortVal = sortSelect ? sortSelect.value : "default";

    let filtered = exhibitions.filter((item) => {
      const matchYear = activeYear === "all" || item.year === activeYear;
      const matchCourse = courseVal === "all" || item.course === courseVal;
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query);
      return matchYear && matchCourse && matchSearch;
    });

    if (sortVal === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sortVal === "za") filtered.sort((a, b) => b.title.localeCompare(a.title));

    // Dynamic Heading (matches "Showing All Exhibit" vs "Showing Results in Graphic Design")
    if (heading) {
      if (courseVal !== "all") {
        heading.textContent = `Showing Results in ${courseVal}`;
      } else if (query) {
        heading.textContent = `Showing Results for "${searchInput.value.trim()}"`;
      } else if (activeYear !== "all") {
        heading.textContent = `Showing Exhibits from ${activeYear}`;
      } else {
        heading.textContent = "Showing All Exhibit";
      }
    }

    if (!filtered.length) {
      grid.innerHTML = `<div class="exhibits-empty">No archived exhibitions match your current filter.</div>`;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (item) => `
        <article class="exhibit-card">
          <div class="exhibit-thumb">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="exhibit-card-body">
            <h3>${item.title}</h3>
            <p class="exhibit-subtitle">${item.subtitle}</p>
            <p class="exhibit-date">${item.cardDate}</p>
            <button class="btn-view-archive" type="button" data-exhibit-id="${item.id}">View Archive</button>
          </div>
        </article>
      `
      )
      .join("");
  }

  // Filter listeners
  if (sortSelect) sortSelect.addEventListener("change", renderGrid);
  if (courseSelect) courseSelect.addEventListener("change", renderGrid);
  if (searchInput) searchInput.addEventListener("input", renderGrid);

  yearPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      yearPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeYear = pill.dataset.year;
      renderGrid();
    });
  });

  // Modals
  const exhibitModal = document.getElementById("exhibit-modal");
  const exhClose = document.getElementById("exh-modal-close");
  const exhImg = document.getElementById("exh-modal-img");
  const exhTitle = document.getElementById("exh-modal-title");
  const exhSub = document.getElementById("exh-modal-sub");
  const exhDates = document.getElementById("exh-modal-dates");
  const exhDocBtn = document.getElementById("exh-doc-btn");
  const exhDesc = document.getElementById("exh-modal-desc");
  const exhCredit = document.getElementById("exh-modal-credit");
  const exhShareBtn = document.getElementById("exh-share-btn");

  const docLightbox = document.getElementById("doc-lightbox");
  const docClose = document.getElementById("doc-lightbox-close");
  const docImg = document.getElementById("doc-lightbox-img");
  const docCaption = document.getElementById("doc-lightbox-caption");

  function openExhibitModal(id) {
    const item = exhibitions.find((e) => e.id === id);
    if (!item || !exhibitModal) return;
    activeExhibit = item;

    exhImg.src = item.image;
    exhImg.alt = item.title;
    exhTitle.textContent = item.title;
    exhSub.textContent = item.subtitle;
    exhDates.textContent = item.modalDate;
    exhDesc.textContent = item.description;
    exhCredit.textContent = item.credit;
    exhCredit.style.display = item.credit ? "block" : "none";
    exhShareBtn.textContent = "Share";

    if (item.docImage) {
      exhDocBtn.textContent = "View Exhibition Documentation →";
      exhDocBtn.classList.remove("is-disabled");
      exhDocBtn.disabled = false;
    } else {
      exhDocBtn.textContent = "Documentation coming soon...";
      exhDocBtn.classList.add("is-disabled");
      exhDocBtn.disabled = true;
    }

    exhibitModal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeAllModals() {
    [exhibitModal, docLightbox].forEach((m) => m && m.classList.remove("is-open"));
    document.body.classList.remove("modal-open");
  }

  // Open Archive Modal when clicking any "View Archive" button
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-exhibit-id]");
    if (!btn) return;
    openExhibitModal(btn.dataset.exhibitId);
  });

  // Open Documentation Lightbox
  if (exhDocBtn) {
    exhDocBtn.addEventListener("click", () => {
      if (!activeExhibit || !activeExhibit.docImage) return;
      exhibitModal.classList.remove("is-open");
      docImg.src = activeExhibit.docImage;
      docImg.alt = `${activeExhibit.title} Exhibition Documentation`;
      docCaption.textContent = `${activeExhibit.title} — ${activeExhibit.credit || "Exhibition Documentation"}`;
      docLightbox.classList.add("is-open");
    });
  }

  // Share button feedback
  if (exhShareBtn) {
    exhShareBtn.addEventListener("click", () => {
      exhShareBtn.textContent = "Link Copied!";
    });
  }

  if (exhClose) exhClose.addEventListener("click", closeAllModals);
  if (docClose) docClose.addEventListener("click", closeAllModals);

  [exhibitModal, docLightbox].forEach((m) => {
    if (m) m.addEventListener("click", (e) => { if (e.target === m) closeAllModals(); });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // Initial render
  renderGrid();
});