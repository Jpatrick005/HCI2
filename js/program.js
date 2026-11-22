document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    {
      src: "/images/Good-Form/good_form.avif",
      caption: "Installation images of the 2026 MFA thesis show in Graphic Design, Tender Hell.",
    },
    {
      src: "/images/in_the_weeds.avif",
      caption: "Graphic Design Course Exhibition — In the Weeds, Green Hall Gallery.",
    },
    {
      src: "/images/roma_publications.jpg",
      caption: "Visiting Artist Show — Roma Publications 1-524 editorial archive display.",
    },
    {
      src: "/images/THINK TANK/think-tank.avif",
      caption: "Student studio critique and exhibition installation view, 36 Edgewood Ave.",
    },
  ];

  const imgEl = document.getElementById("program-slide-img");
  const capEl = document.getElementById("program-caption");
  const counterEl = document.getElementById("prog-counter");
  const prevBtn = document.getElementById("prog-prev");
  const nextBtn = document.getElementById("prog-next");

  let current = 0;

  function renderSlide() {
    current = (current + slides.length) % slides.length;
    if (imgEl) {
      imgEl.src = slides[current].src;
      imgEl.alt = slides[current].caption;
    }
    if (capEl) capEl.textContent = slides[current].caption;
    if (counterEl) counterEl.textContent = `${current + 1} of ${slides.length}`;
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { current -= 1; renderSlide(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { current += 1; renderSlide(); });

  // Plan of Study & Credit Requirements Modal
  const infoContent = {
    study: {
      title: "Plan of Study",
      html: `
        <p>The Graphic Design M.F.A. is a two-year studio program (or three-year Preliminary program for students without a design background).</p>
        <ul>
          <li><strong>Year 1:</strong> Core studio methodology, typography, visual systems, and weekly visiting critic workshops.</li>
          <li><strong>Year 2:</strong> Self-initiated thesis research, independent studio critiques, culminating exhibition, and the Thesis Book.</li>
        </ul>
      `,
    },
    credits: {
      title: "Credit Requirements",
      html: `
        <p>A minimum of <strong>60 credits</strong> is required to earn the Master of Fine Arts degree in Graphic Design.</p>
        <ul>
          <li><strong>42 Credits:</strong> Core Graphic Design Studio, Thesis Research, and Critique Seminars.</li>
          <li><strong>18 Credits:</strong> Academic and Studio Electives across Yale School of Art and Yale University.</li>
        </ul>
      `,
    },
  };

  const modal = document.getElementById("program-info-modal");
  const modalTitle = document.getElementById("info-modal-title");
  const modalBody = document.getElementById("info-modal-body");
  const modalClose = document.getElementById("info-modal-close");

  document.querySelectorAll("[data-info-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const data = infoContent[btn.dataset.infoModal];
      if (!data || !modal) return;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.html;
      modal.classList.add("is-open");
      document.body.classList.add("modal-open");
    });
  });

  function closeInfoModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  if (modalClose) modalClose.addEventListener("click", closeInfoModal);
  if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeInfoModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeInfoModal(); });
});