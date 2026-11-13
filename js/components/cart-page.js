import {
  getCartItems,
  getCartTotal,
  removeFromCart,
  setCartQuantity,
} from "./cart-store.js";
import { formatPrice } from "./product-data.js";

export function setupCartPage() {
  const list = document.querySelector("[data-cart-items]");
  if (!list) return;

  const total = document.querySelector("[data-cart-total]");
  const count = document.querySelector("[data-cart-page-count]");
  const empty = document.querySelector("[data-cart-empty]");
  const checkout = document.querySelector("[data-cart-checkout]");

  const render = () => {
    const items = getCartItems();
    list.replaceChildren();
    items.forEach(({ id, quantity, product }) => {
      const row = document.createElement("article");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="assets/images/Products/${product.image}" alt="">
        <div class="cart-item-copy">
          <p class="product-kicker">${product.category}</p>
          <h2>${product.name}</h2>
          <p>${formatPrice(product.price)} each</p>
        </div>
        <div class="cart-item-controls" aria-label="${product.name} quantity">
          <button type="button" data-quantity="-1" aria-label="Remove one ${product.name}">−</button>
          <span>${quantity}</span>
          <button type="button" data-quantity="1" aria-label="Add one ${product.name}">+</button>
        </div>
        <strong class="cart-item-total">${formatPrice(product.price * quantity)}</strong>
        <button class="cart-item-remove" type="button" data-remove aria-label="Remove ${product.name}">Remove</button>
      `;
      row.dataset.productId = id;
      list.append(row);
    });

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    count.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
    total.textContent = formatPrice(getCartTotal());
    empty.hidden = items.length > 0;
    checkout.hidden = items.length === 0;
    list.hidden = items.length === 0;
  };

  list.addEventListener("click", (event) => {
    const row = event.target.closest("[data-product-id]");
    if (!row) return;
    if (event.target.closest("[data-remove]")) {
      removeFromCart(row.dataset.productId);
      return;
    }
    const quantityButton = event.target.closest("[data-quantity]");
    if (quantityButton) {
      const quantity = Number(row.querySelector(".cart-item-controls span").textContent);
      setCartQuantity(row.dataset.productId, quantity + Number(quantityButton.dataset.quantity));
    }
  });

  window.addEventListener("caffeine-cart-updated", render);
  render();
}
