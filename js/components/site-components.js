import { getCartCount } from "./cart-store.js";

function setupNavigation() {
  const nav = document.querySelector(".site-navbar");
  const header = nav?.closest(".site-header");
  const toggle = nav?.querySelector(".nav-toggle");
  const productsItem = nav?.querySelector(".nav-item-products");
  const productsToggle = productsItem?.querySelector(".nav-products-toggle");
  const searchToggle = nav?.querySelector(".mobile-search-toggle");
  const mobileSearch = nav?.querySelector(".mobile-search");
  const mobileSearchInput = mobileSearch?.querySelector("input");
  if (
    !nav ||
    !header ||
    !toggle ||
    !productsItem ||
    !productsToggle ||
    !searchToggle ||
    !mobileSearch ||
    !mobileSearchInput
  ) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    if (!open) {
      setProductsOpen(false);
      setSearchOpen(false);
    }
  };

  const setProductsOpen = (open) => {
    productsItem.classList.toggle("is-submenu-open", open);
    productsToggle.setAttribute("aria-expanded", String(open));
  };

  const setSearchOpen = (open) => {
    nav.classList.toggle("is-search-open", open);
    searchToggle.setAttribute("aria-expanded", String(open));
    searchToggle.setAttribute(
      "aria-label",
      open ? "Close product search" : "Open product search",
    );
    if (open) {
      window.setTimeout(() => mobileSearchInput.focus(), 0);
    } else {
      mobileSearchInput.value = "";
    }
  };

  toggle.addEventListener("click", () =>
    setOpen(!nav.classList.contains("is-open")),
  );
  searchToggle.addEventListener("click", () => {
    setSearchOpen(!nav.classList.contains("is-search-open"));
  });

  const page = location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll(".navbar-links a").forEach((link) => {
    const url = new URL(link.href);
    const isCurrent =
      url.pathname.split("/").pop() === page &&
      (!url.hash || url.hash === location.hash);
    link.classList.toggle("is-active", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
    link.addEventListener("click", () => {
      setProductsOpen(false);
      setOpen(false);
    });
  });

  productsToggle.addEventListener("click", () => {
    if (window.matchMedia("(min-width: 992px)").matches) {
      setProductsOpen(!productsItem.classList.contains("is-submenu-open"));
    } else {
      setProductsOpen(!productsItem.classList.contains("is-submenu-open"));
    }
  });
  productsItem.addEventListener("mouseenter", () => {
    if (window.matchMedia("(min-width: 992px)").matches) setProductsOpen(true);
  });
  productsItem.addEventListener("mouseleave", () => {
    if (
      window.matchMedia("(min-width: 992px)").matches &&
      !productsItem.contains(document.activeElement)
    ) {
      setProductsOpen(false);
    }
  });
  productsItem.addEventListener("focusout", (event) => {
    if (!productsItem.contains(event.relatedTarget)) setProductsOpen(false);
  });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && productsItem.classList.contains("is-submenu-open")) {
      setProductsOpen(false);
      productsToggle.focus();
    } else if (event.key === "Escape" && nav.classList.contains("is-search-open")) {
      setSearchOpen(false);
      searchToggle.focus();
    } else if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (nav.classList.contains("is-open") && !nav.contains(event.target))
      setOpen(false);
    if (!productsItem.contains(event.target)) setProductsOpen(false);
  });

  const desktopViewport = window.matchMedia("(min-width: 992px)");
  let isScrolled = window.scrollY > 0;
  header.classList.toggle("is-scrolled", isScrolled);

  const updateScrollState = () => {
    const nextIsScrolled = window.scrollY > 0;
    if (nextIsScrolled === isScrolled) return;

    header.classList.toggle("is-scrolled", nextIsScrolled);
    isScrolled = nextIsScrolled;
  };
  window.addEventListener("scroll", updateScrollState, { passive: true });

  desktopViewport.addEventListener("change", (event) => {
    setProductsOpen(false);
    if (event.matches) setOpen(false);
  });
}

function setupFooter() {
  const page = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".footer-links a").forEach((link) => {
    link.hidden = new URL(link.href).pathname.split("/").pop() === page;
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

function setupCartIndicator() {
  const link = document.querySelector(".nav-cart");
  const count = link?.querySelector("[data-cart-count]");
  if (!link || !count) return;

  const update = () => {
    const quantity = getCartCount();
    count.textContent = String(quantity);
    link.setAttribute(
      "aria-label",
      `Shopping cart, ${quantity} ${quantity === 1 ? "item" : "items"}`,
    );
  };
  update();
  window.addEventListener("caffeine-cart-updated", update);
}

function setupEmailComposeForms() {
  document.querySelectorAll(".email-compose-form, .newsletter-form").forEach((form) => {
    if (form.dataset.emailHandlerAttached) return;
    form.dataset.emailHandlerAttached = "true";

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const details = [...new FormData(form).entries()]
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");
      const params = new URLSearchParams({
        subject: form.dataset.emailSubject || "Newsletter sign-up",
        body: details,
      });
      window.location.href = `mailto:contactcaffeineculture@gmail.com?${params}`;
    });
  });
}

async function load(id, file, setup) {
  const response = await fetch(file);
  if (!response.ok) throw new Error(`Could not load ${file}.`);

  const target = document.getElementById(id);
  if (!target) throw new Error(`Missing element: ${id}.`);

  target.innerHTML = await response.text();
  setup?.();
}

export function setupSiteComponents() {
  load("site-header", "header.html", () => {
    setupNavigation();
    setupCartIndicator();
  }).catch(console.error);
  load("site-footer", "footer.html", () => {
    setupFooter();
    setupEmailComposeForms();
  }).catch(console.error);
}
