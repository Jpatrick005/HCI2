# Yale School of Art — Redesign & Admissions Portal (HCI 2)

A responsive, accessible redesign of the Yale School of Art website featuring a unified standalone navigation and footer component, interactive program/exhibition/calendar views, a 5-step MFA admissions portal, and persistent Light/Dark Mode.

- **Live GitHub Pages URL:** https://jpatrick005.github.io/HCI2/

## Folder Structure

```text
.
├── index.html             # Home hero, weather, upcoming events & archive story
├── program.html           # Graphic Design M.F.A. overview, carousel & info modals
├── exhibition.html        # Filterable Past Exhibitions archive & lightbox modal
├── calendar.html          # Interactive monthly calendar, filters & event modal
├── README.md              # Project & design-system documentation
├── apply/                 # Multi-step Admissions Portal
│   ├── account.html       # Account creation with native HTML5 validation
│   ├── step1.html         # Personal background & citizenship
│   ├── step2.html         # Degree program, academic history & legal questions
│   ├── step3.html         # Personal statement, CV & 3 references
│   ├── step4.html         # Portfolio & media upload inventory
│   └── step5.html         # Validation review, certification & $100 payment modal
├── assets/                # Media & photography assets
├── css/
│   └── style.css          # Design tokens, custom layout, responsive & dark mode styles
└── js/
    ├── nav.js             # Shared navbar, footer, mobile drawer & theme persistence
    ├── program.js         # Thesis carousel & Plan of Study / Credits modal
    ├── exhibitions.js     # Archive search/sort/year/course filters & detail lightbox
    ├── calendar.js        # Calendar filtering, featured carousel & event modal
    └── apply.js           # Stepper interactions, cover toggle & payment modal flow
```

## Figma Design System → Code Mapping

| Figma Design System Element | Code Implementation |
| --- | --- |
| **60-30-10 Color Tokens** (Neutral surface 60%, Yale Blue 30%, Yale Yellow accent 10%) | `:root` custom properties in `css/style.css`: `--surface` (`#f8f9fa`), `--card` (`#ffffff`), `--yale-blue` (`#00356b`), `--yale-blue-dark` (`#16324f`), `--yale-yellow` (`#ffd23f`), plus `:root[data-theme="dark"]` slate/navy overrides (`#0b1220`, `#131d2e`, `#1e293b`, `#f1f5f9`). |
| **Typography Tokens** (Serif display headings + Sans UI body) | `--font-heading: "Ancizar Serif Bold", Georgia, serif` and `--font-base: "Inter Design", Inter, Arial, sans-serif` applied across headings, nav links, body copy, and footer. |
| **8pt Spacing Scale** | `:root` tokens `--space-1: 8px` through `--space-6: 48px` used for consistent padding, margins, and gaps across sections and the shared footer. |
| **Auto Layout** | CSS Flexbox (`display: flex`, `gap`, `align-items`, `justify-content`) and CSS Grid (`grid-template-columns`) for navbar, cards, forms, and filter bars, supplemented by Bootstrap 5 utilities (`d-flex`, `flex-wrap`, `gap-3`). |
| **12-Column Responsive Grid** | Bootstrap 5 `bootstrap-grid.min.css` & `bootstrap-utilities.min.css` (loaded via jsDelivr CDN before `css/style.css` without Reboot conflicts) using `.container`, `.row`, `.col-12`, `.col-sm-6`, `.col-md-4` in the shared semantic `<footer>`, paired with CSS Grid page layouts. |
| **Interactive Component Variants** | Vanilla JS event handlers: `js/nav.js` (dropdowns, `<= 900px` single-open accordion drawer, `#theme-toggle` with `localStorage`), `js/exhibitions.js` (year pills, course/sort/search filters, archive & lightbox modals), `js/calendar.js` (date chips & event modal), `js/program.js` (slide carousel & info modal), `js/apply.js` (cover selection, reminder status, payment/submission modals). |

## Accessibility & Responsive Testing

- **Semantic Landmarks:** Every page includes `<header>`, `<nav>`, `<main>`, `<section>`, and a shared `<footer>` injected by `js/nav.js`.
- **Keyboard & ARIA Support:** Non-navigating top-level menu controls use `<button type="button" aria-haspopup="true" aria-expanded="...">` with `:focus-visible` yellow outlines; dialogs use `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
- **Form Accessibility:** All inputs and selects across `apply/*.html` pair explicit `<label for="...">` attributes with matching `id="..."` attributes and native HTML5 validation (`required`, `type="email"`, `type="tel"`, `minlength`).
- **Viewport Coverage (`375px` – `1440px`):** Tested across mobile (`375px`–`900px` full-height accordion drawer and stacked single-column cards/forms), tablet (`901px`–`1180px`), and desktop (`1200px`–`1440px`) in both Light Mode and Dark Mode with high-contrast text and links.
