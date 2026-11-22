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
      image: "assets/roma_publications.jpg",
      docImages: [
        "assets/roma_publications.jpg",
        "assets/images.jpg",
      ],
      description: "Roma Publications is free and open to the public from September 29 - October 15 2026, 2–6 pm.",
      credit: "Documentation photography by Yale School of Art Communications.",
    },
    {
      id: "weeds",
      title: "In the Weeds",
      subtitle: "Graphic Design Course Exhibition",
      cardDate: "Apr 10–16, 2026",
      modalDate: "April 10 – 16, 2026",
      year: "2026",
      course: "Graphic Design",
      image: "assets/in_the_weeds.avif",
      docImages: [
        "assets/in_the_weeds.avif",
        "assets/IMG_8504.avif",
        "assets/IMG_8505.avif",
        "assets/IMG_8527.avif",
        "assets/IMG_8560.avif",
      ],
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
      image: "assets/think-tank/think-tank.avif",
      docImages: [
        "assets/think-tank/think-tank.avif",
        "assets/think-tank/AIMG_005021-expanded.avif",
        "assets/think-tank/AIMG_00502expanded.avif",
        "assets/think-tank/AIMG_00503expanded.avif",
        "assets/think-tank/CR.avif",
        "assets/think-tank/Edited-Samantha-Segul-Environmental-Betta.avif",
        "assets/think-tank/flying-fish.avif",
        "assets/think-tank/IMG_0012.avif",
        "assets/think-tank/IMG_0210.avif",
        "assets/think-tank/medical-fish.avif",
        "assets/think-tank/Samantha-Segul-Culinary-Cran.avif",
      ],
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
      image: "assets/good-form/good_form.avif",
      docImages: [
        "assets/good-form/good_form.avif",
        "assets/good-form/Good-Form-AA-5.avif",
        "assets/good-form/Good-Form-AA-11.avif",
        "assets/good-form/Good-Form-AA-20.avif",
        "assets/good-form/Good-Form-AA-22.avif",
        "assets/good-form/Good-Form-Joy-Li-7.avif",
        "assets/good-form/Good-Form-Joy-Li-13.avif",
        "assets/good-form/Good-Form-Joy-Li-15-copy.avif",
        "assets/good-form/Good-Form-JR-1.avif",
        "assets/good-form/Good-Form-JR-9.avif",
        "assets/good-form/Good-Form-JR-16.avif",
        "assets/good-form/Good-Form-JR-19.avif",
        "assets/good-form/Good-Form-RR-3.avif",
        "assets/good-form/Good-Form-RR-7.avif",
        "assets/good-form/Good-Form-RR-10.avif",
      ],
      description: "Good Form II is free and open to the public from March 21–29, 2026, 6–8 pm.",
      credit: "Documentation photography by Pat Garcia, Photography MFA '24.",
    },
    {
      id: "tender-hell",
      title: "Tender Hell",
      subtitle: "Graphic Design MFA Thesis Exhibition",
      cardDate: "May 1–10, 2026",
      modalDate: "May 1 – 10, 2026",
      year: "2026",
      course: "Graphic Design",
      image: "assets/images_Tender_hell.jpg",
      docImages: [
        "assets/images_Tender_hell.jpg",
      ],
      description: "Installation views from the 2026 Graphic Design M.F.A. Thesis Exhibition, Tender Hell, at Green Hall Gallery.",
      credit: "Documentation photography by Yale School of Art Communications.",
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
  let activeDocIndex = 0;

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
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
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
  const docCounter = document.getElementById("doc-lightbox-counter");
  const docPrev = document.getElementById("doc-lightbox-prev");
  const docNext = document.getElementById("doc-lightbox-next");
  const docThumbs = document.getElementById("doc-lightbox-thumbs");

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

    const totalDocs = item.docImages ? item.docImages.length : 0;
    if (totalDocs > 0) {
      exhDocBtn.textContent =
        totalDocs > 1
          ? `View Exhibition Documentation (${totalDocs} Photos) →`
          : "View Exhibition Documentation →";
      exhDocBtn.classList.remove("is-disabled");
      exhDocBtn.disabled = false;
      exhImg.style.cursor = "pointer";
    } else {
      exhDocBtn.textContent = "Documentation coming soon...";
      exhDocBtn.classList.add("is-disabled");
      exhDocBtn.disabled = true;
      exhImg.style.cursor = "default";
    }

    exhibitModal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function renderLightboxPhoto(index) {
    if (!activeExhibit || !activeExhibit.docImages || !activeExhibit.docImages.length) return;
    const photos = activeExhibit.docImages;
    const total = photos.length;
    activeDocIndex = (index + total) % total;

    docImg.src = photos[activeDocIndex];
    docImg.alt = `${activeExhibit.title} — Photo ${activeDocIndex + 1} of ${total}`;
    docCaption.textContent = `${activeExhibit.title} — ${activeExhibit.credit || "Exhibition Documentation"}`;

    if (docCounter) {
      docCounter.textContent = `${activeDocIndex + 1} / ${total}`;
    }

    const showNav = total > 1;
    if (docPrev) docPrev.style.display = showNav ? "inline-flex" : "none";
    if (docNext) docNext.style.display = showNav ? "inline-flex" : "none";

    if (docThumbs) {
      docThumbs.style.display = showNav ? "flex" : "none";
      docThumbs.innerHTML = photos
        .map(
          (src, idx) => `
          <button
            type="button"
            class="doc-thumb-btn${idx === activeDocIndex ? " is-active" : ""}"
            data-doc-index="${idx}"
            aria-label="View photo ${idx + 1} of ${total}"
          >
            <img src="${src}" alt="${activeExhibit.title} thumbnail ${idx + 1}" />
          </button>
        `
        )
        .join("");
    }
  }

  function openDocumentationLightbox(startIndex = 0) {
    if (!activeExhibit || !activeExhibit.docImages || !activeExhibit.docImages.length) return;
    exhibitModal.classList.remove("is-open");
    renderLightboxPhoto(startIndex);
    docLightbox.classList.add("is-open");
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

  // Open Documentation Lightbox from CTA or clicking the modal lead image
  if (exhDocBtn) {
    exhDocBtn.addEventListener("click", () => openDocumentationLightbox(0));
  }
  if (exhImg) {
    exhImg.addEventListener("click", () => openDocumentationLightbox(0));
  }

  // Lightbox prev / next / thumbnail clicks
  if (docPrev) {
    docPrev.addEventListener("click", () => renderLightboxPhoto(activeDocIndex - 1));
  }
  if (docNext) {
    docNext.addEventListener("click", () => renderLightboxPhoto(activeDocIndex + 1));
  }
  if (docThumbs) {
    docThumbs.addEventListener("click", (e) => {
      const thumbBtn = e.target.closest("[data-doc-index]");
      if (!thumbBtn) return;
      renderLightboxPhoto(Number(thumbBtn.dataset.docIndex));
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
    if (docLightbox && docLightbox.classList.contains("is-open")) {
      if (e.key === "ArrowLeft") renderLightboxPhoto(activeDocIndex - 1);
      if (e.key === "ArrowRight") renderLightboxPhoto(activeDocIndex + 1);
    }
  });

  // Initial render
  renderGrid();
});
