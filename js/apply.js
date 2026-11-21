document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     STEP 3: Send Reminder Button Feedback
     ===================================================== */
  document.querySelectorAll(".js-send-reminder").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.textContent = "✓ Reminder Sent";
      btn.style.color = "#15803d";
      btn.style.pointerEvents = "none";
    });
  });

  /* =====================================================
     STEP 4: Interactive "Set Cover" Representative Work
     ===================================================== */
  const portfolioCards = document.querySelectorAll(".portfolio-item");

  portfolioCards.forEach((card) => {
    const coverBtn = card.querySelector(".js-set-cover");
    if (!coverBtn) return;

    coverBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Reset all cards
      portfolioCards.forEach((c) => {
        c.classList.remove("is-cover");
        const badge = c.querySelector(".cover-badge");
        if (badge) badge.remove();

        const btn = c.querySelector(".js-set-cover");
        if (btn) {
          btn.textContent = "○ Set Cover";
          btn.style.color = "var(--muted)";
          btn.style.fontWeight = "400";
        }
      });

      // Mark clicked card as Representative Work
      card.classList.add("is-cover");
      const thumb = card.querySelector(".portfolio-thumb");
      if (thumb) {
        const badge = document.createElement("span");
        badge.className = "cover-badge";
        badge.textContent = "★ REPRESENTATIVE WORK";
        thumb.prepend(badge);
      }

      coverBtn.textContent = "• Cover";
      coverBtn.style.color = "var(--yale-blue)";
      coverBtn.style.fontWeight = "700";
    });
  });

  /* =====================================================
     STEP 5: Payment Pop-Up & Submitted Confirmation Modal
     ===================================================== */
  const openPaymentBtn = document.getElementById("open-payment-btn");
  const certifyCheckbox = document.getElementById("certify-checkbox");
  const paymentModal = document.getElementById("payment-modal");
  const submittedModal = document.getElementById("submitted-modal");
  const closePaymentBtn = document.getElementById("close-payment-btn");
  const confirmPayBtn = document.getElementById("confirm-pay-btn");

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeAllModals() {
    [paymentModal, submittedModal].forEach((m) => {
      if (m) m.classList.remove("is-open");
    });
    document.body.classList.remove("modal-open");
  }

  // Open Payment Pop-Up (requires certification checkbox to be checked)
  if (openPaymentBtn) {
    openPaymentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (certifyCheckbox && !certifyCheckbox.checked) {
        alert("Please certify that all provided information is accurate and complete before paying.");
        certifyCheckbox.focus();
        return;
      }
      openModal(paymentModal);
    });
  }

  // Close Payment Pop-Up
  if (closePaymentBtn) {
    closePaymentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeAllModals();
    });
  }

  // Click outside dialog to close Payment Pop-Up
  if (paymentModal) {
    paymentModal.addEventListener("click", (e) => {
      if (e.target === paymentModal) closeAllModals();
    });
  }

  // Press Escape to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // Switch between Credit/Debit Card and Scan QR/Wallet tabs
  const tabCard = document.getElementById("tab-card");
  const tabQr = document.getElementById("tab-qr");
  const cardFields = document.getElementById("card-fields");
  const qrPanel = document.getElementById("qr-panel");

  if (tabCard && tabQr && cardFields && qrPanel) {
    tabCard.addEventListener("click", () => {
      tabCard.classList.add("active");
      tabQr.classList.remove("active");
      cardFields.style.display = "grid";
      qrPanel.classList.remove("is-visible");
    });

    tabQr.addEventListener("click", () => {
      tabQr.classList.add("active");
      tabCard.classList.remove("active");
      cardFields.style.display = "none";
      qrPanel.classList.add("is-visible");
    });
  }

  // Pay $100 & Open "Application Submitted!" Confirmation Pop-Up
  if (confirmPayBtn) {
    confirmPayBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (paymentModal) paymentModal.classList.remove("is-open");
      openModal(submittedModal);
    });
  }

  // Download PDF Receipt button
  const receiptBtn = document.getElementById("download-receipt-btn");
  if (receiptBtn) {
    receiptBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.print();
    });
  }
});