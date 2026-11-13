import { getCartItems, getCartTotal } from "./cart-store.js";
import { formatPrice } from "./product-data.js";

export function setupCheckoutPage() {
  const form = document.querySelector("[data-checkout-form]");
  const items = document.querySelector("[data-checkout-items]");
  if (!form || !items) return;

  const total = document.querySelector("[data-checkout-total]");
  const notice = document.querySelector("[data-checkout-notice]");

  const renderSummary = () => {
    const cart = getCartItems();
    items.replaceChildren();
    cart.forEach(({ quantity, product }) => {
      const row = document.createElement("li");
      row.innerHTML = `<span>${product.name} <span class="checkout-quantity">× ${quantity}</span></span><strong>${formatPrice(product.price * quantity)}</strong>`;
      items.append(row);
    });
    total.textContent = formatPrice(getCartTotal());
    form.hidden = cart.length === 0;
    document.querySelector("[data-checkout-empty]").hidden = cart.length > 0;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    notice.hidden = false;
    notice.focus();
  });

  window.addEventListener("caffeine-cart-updated", renderSummary);
  renderSummary();
}
