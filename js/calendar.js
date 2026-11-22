document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     1. SIDEBAR UPCOMING EVENTS CAROUSEL & FILTERS
     ===================================================== */
  const slides = document.querySelectorAll(".upcoming-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  const counter = document.getElementById("slide-counter");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  const eventDays = document.querySelectorAll(".cal-day.has-event");

  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
    if (counter) counter.textContent = `${currentSlide + 1} of ${slides.length}`;

    eventDays.forEach((day) => {
      day.classList.toggle("is-selected", Number(day.dataset.slide) === currentSlide);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.dot)));
  });

  // Top Category Filter Pills (All Events / Admissions / Exhibitions)
  const tabs = document.querySelectorAll(".cal-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;
      eventDays.forEach((day) => {
        const match = filter === "all" || day.dataset.category === filter;
        day.style.opacity = match ? "1" : "0.35";
      });

      if (filter === "admissions") showSlide(1);
      if (filter === "exhibitions") showSlide(2);
    });
  });

  // Clear Filters Button
  const clearBtn = document.getElementById("clear-filters-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document.querySelectorAll(".filter-select").forEach((sel) => (sel.selectedIndex = 0));
      tabs.forEach((t, i) => t.classList.toggle("active", i === 0));
      eventDays.forEach((day) => {
        day.style.opacity = "1";
        day.classList.remove("is-selected");
      });
      showSlide(0);
    });
  }

  /* =====================================================
     2. UPCOMING EVENTS POP-UP MODAL (Auto-opens on entry)
     ===================================================== */
  const eventsByDate = {
    1: {
      dateLabel: "NOVEMBER 15",
      items: [
        {
          badge: "Open to Prospective Students",
          title: "Fall Studio Tours",
          datetime: "Sunday, Nov 15, 2026 • 10:00 AM – 12:00 PM",
          location: "Green Hall Gallery, 1156 Chapel St",
          image: "assets/featured-crits.jpg",
          link: "apply/account.html",
        },
        {
          badge: "Open to SoA Community",
          title: "MFA Crits in Photography",
          datetime: "Sunday, Nov 15, 2026 • 1:00 PM – 4:00 PM",
          location: "36 Edgewood Ave, Photography Studio",
          image: "assets/featured-crits.jpg",
          link: "apply/account.html",
        },
        {
          badge: "Open to SoA Community",
          title: "Devotional Alchemy",
          datetime: "Sunday, Nov 15, 2026 • 2:00 PM – 6:00 PM",
          location: "63 Audubon St, New Haven",
          image: "assets/featured-crits.jpg",
          link: "apply/account.html",
        },
      ],
    },
    2: {
      dateLabel: "NOVEMBER 24",
      items: [
        {
          badge: "Open to Public",
          title: "Exhibition: Roma Publications",
          datetime: "Tuesday, Nov 24, 2026 • 1:30 PM – 5:00 PM",
          location: "36 Edgewood Ave Gallery, New Haven",
          image: "assets/featured-crits.jpg",
          link: "program.html",
        },
        {
          badge: "Open to SoA Community",
          title: "Overcurrent: MFA Group Show",
          datetime: "Tuesday, Nov 24, 2026 • 3:00 PM – 6:30 PM",
          location: "Green Hall Gallery, 1156 Chapel St",
          image: "assets/featured-crits.jpg",
          link: "program.html",
        },
        {
          badge: "Open to SoA Community",
          title: "Printmaking Open Critique",
          datetime: "Tuesday, Nov 24, 2026 • 5:30 PM – 7:30 PM",
          location: "353 Crown St, Print Studio",
          image: "assets/featured-crits.jpg",
          link: "program.html",
        },
      ],
    },
  };

  const modal = document.getElementById("event-modal");
  const modalDate = document.getElementById("event-modal-date");
  const modalCount = document.getElementById("event-modal-count");
  const modalCounter = document.getElementById("event-modal-counter");
  const modalClose = document.getElementById("event-modal-close");
  const modalImg = document.getElementById("event-modal-img");
  const modalBadge = document.getElementById("event-modal-badge");
  const modalTitle = document.getElementById("event-modal-title");
  const modalDatetime = document.getElementById("event-modal-datetime");
  const modalLocation = document.getElementById("event-modal-location");
  const modalAction = document.getElementById("event-modal-action");
  const modalPrev = document.getElementById("event-modal-prev");
  const modalNext = document.getElementById("event-modal-next");
  const modalDots = document.getElementById("event-modal-dots");

  let activeDateKey = 1;
  let activeEventIndex = 0;

  function renderModalEvent() {
    const dayData = eventsByDate[activeDateKey];
    if (!dayData) return;

    const total = dayData.items.length;
    activeEventIndex = (activeEventIndex + total) % total;
    const item = dayData.items[activeEventIndex];

    modalDate.textContent = dayData.dateLabel;
    modalCount.textContent = `${total} EVENT${total > 1 ? "S" : ""}`;
    modalCounter.textContent = `Event ${activeEventIndex + 1} of ${total}`;
    modalBadge.textContent = item.badge;
    modalTitle.textContent = item.title;
    modalDatetime.textContent = item.datetime;
    modalLocation.textContent = item.location;
    modalImg.src = item.image;
    modalImg.alt = item.title;
    modalAction.href = item.link;

    modalDots.innerHTML = "";
    dayData.items.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `event-modal-dot${idx === activeEventIndex ? " active" : ""}`;
      dot.setAttribute("aria-label", `Event ${idx + 1}`);
      dot.addEventListener("click", () => {
        activeEventIndex = idx;
        renderModalEvent();
      });
      modalDots.appendChild(dot);
    });
  }

  function openEventModal(dateKey, startIndex = 0) {
    if (!modal || !eventsByDate[dateKey]) return;
    activeDateKey = dateKey;
    activeEventIndex = startIndex;
    renderModalEvent();
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeEventModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  // Clicking a highlighted calendar date updates the sidebar AND reopens the pop-up
  eventDays.forEach((day) => {
    const activateDay = () => {
      const slideIdx = Number(day.dataset.slide);
      showSlide(slideIdx);
      openEventModal(slideIdx, 0);
    };

    day.addEventListener("click", activateDay);
    day.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateDay();
      }
    });
  });

  if (modalPrev) {
    modalPrev.addEventListener("click", () => {
      activeEventIndex -= 1;
      renderModalEvent();
    });
  }

  if (modalNext) {
    modalNext.addEventListener("click", () => {
      activeEventIndex += 1;
      renderModalEvent();
    });
  }

  if (modalClose) modalClose.addEventListener("click", closeEventModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeEventModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEventModal();
  });

  // Auto-show the Upcoming Events pop-up immediately upon entering Calendar
  openEventModal(1, 0);
});