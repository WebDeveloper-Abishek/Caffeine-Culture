import { getProduct } from "./product-data.js";

const STORAGE_KEY = "caffeine-culture-cart";

export function getCart() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new TypeError("Cart data must be an array.");
    return parsed.filter(
      (item) =>
        item &&
        getProduct(item.id) &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch (error) {
    console.error("Could not read the saved cart.", error);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("caffeine-cart-updated"));
}

export function addToCart(id) {
  if (!getProduct(id)) throw new RangeError(`Unknown product: ${id}`);
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id, quantity: 1 });
  saveCart(cart);
}

export function setCartQuantity(id, quantity) {
  if (!getProduct(id)) throw new RangeError(`Unknown product: ${id}`);
  if (!Number.isSafeInteger(quantity)) throw new TypeError("Quantity must be an integer.");
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (!existing) return;
  if (quantity < 1) {
    saveCart(cart.filter((item) => item.id !== id));
    return;
  }
  existing.quantity = quantity;
  saveCart(cart);
}

export function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== id));
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function getCartItems() {
  return getCart().map((item) => ({
    ...item,
    product: getProduct(item.id),
  }));
}

export function getCartTotal() {
  return getCartItems().reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}
