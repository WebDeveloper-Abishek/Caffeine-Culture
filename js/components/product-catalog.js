import { addToCart } from "./cart-store.js";
import { CATEGORIES, formatPrice, PRODUCTS } from "./product-data.js";

export function setupProductCatalog() {
  const catalog = document.querySelector("[data-product-catalog]");
  if (!catalog) return;

  const filters = [...document.querySelectorAll("[data-product-filter]")];
  const search = document.querySelector("[data-catalog-search]");
  const count = document.querySelector("[data-product-count]");
  const emptyState = document.querySelector("[data-product-empty]");
  const query = new URLSearchParams(window.location.search);
  let activeCategory = query.get("category") || "all";

  if (
    activeCategory !== "all" &&
    !CATEGORIES.some((category) => category.id === activeCategory)
  ) {
    activeCategory = "all";
  }
  if (search) search.value = query.get("q") || "";

  catalog.innerHTML = PRODUCTS.map((product) => {
    const category = CATEGORIES.find((item) => item.id === product.category);
    return `
      <article class="product-card" data-product-card data-category="${product.category}">
        <img src="assets/images/Products/${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-card-copy">
          <p class="product-kicker">${category.label}</p>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-card-footer">
            <strong class="product-price">${formatPrice(product.price)}</strong>
            <button class="btn action-btn product-add-button" type="button" data-add-to-cart="${product.id}">
              Add to cart
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  const products = [...catalog.querySelectorAll("[data-product-card]")];

  const render = () => {
    const term = search?.value.trim().toLocaleLowerCase() || "";
    let visibleCount = 0;

    products.forEach((product) => {
      const matchesCategory =
        activeCategory === "all" || product.dataset.category === activeCategory;
      const matchesTerm =
        !term || product.textContent.toLocaleLowerCase().includes(term);
      product.hidden = !(matchesCategory && matchesTerm);
      if (!product.hidden) visibleCount += 1;
    });

    filters.forEach((filter) => {
      const selected = filter.dataset.productFilter === activeCategory;
      filter.setAttribute("aria-pressed", String(selected));
      filter.classList.toggle("is-active", selected);
    });

    if (count) {
      count.textContent = `${visibleCount} ${visibleCount === 1 ? "item" : "items"}`;
    }
    if (emptyState) emptyState.hidden = visibleCount > 0;
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      activeCategory = filter.dataset.productFilter;
      render();
    });
  });

  search?.addEventListener("input", render);

  document.querySelectorAll(".catalog-search-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = new FormData(form).get("q")?.toString().trim() || "";
      if (search) search.value = value;
      render();
      catalog.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  catalog.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart]");
    if (!button) return;
    addToCart(button.dataset.addToCart);
    const originalText = button.textContent.trim();
    button.textContent = "Added";
    button.classList.add("is-added");
    window.setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("is-added");
    }, 1000);
  });

  render();
}
