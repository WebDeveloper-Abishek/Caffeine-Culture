# The Caffeine Culture

A static HTML, SCSS, and JavaScript website for The Caffeine Culture. Run it with a local server so browser ES module imports work.

## Pages

The site includes the home page, About Us, Our Products, Member Club, Contact Us, Cart, Checkout, and a style guide. The shared navigation and footer load on each page. The product catalog has five categories with four products each; search, category filters, cart, and checkout run in the browser.

The site shares its header, footer, typography, buttons, text links, palette, and responsive mixins. The style guide demonstrates the common styles.

## JavaScript

JavaScript is intentionally small:

- `js/main.js` initializes the hero slider and site components.
- `js/components/site-components.js` loads the header and footer and handles navigation, mobile search, footer links, and email-compose forms.
- `js/components/hero-slider.js` initializes the Swiper hero slider.
- `js/components/product-data.js` contains the sample menu and demo prices in Sri Lankan rupees.
- `js/components/product-catalog.js` renders products, filters, search, and add-to-cart actions.
- `js/components/cart-store.js`, `cart-page.js`, and `checkout-page.js` manage the browser-stored cart and front-end-only checkout.

Cart data is stored in the browser's local storage. Prices are illustrative demo prices. Checkout collects no payment, connects to no payment provider, and does not place or submit an order. The contact, member club, and newsletter forms open the visitor's email app with a prepared email; a mail service is not configured.

The home page uses the shared dark coffee, cream, and gold palette, with a Swiper hero slider backed by three local coffee images. Swiper is loaded from jsDelivr; the slider arrows reuse the shared arrow styles.

## Styles

Compile SCSS after editing:

```sh
sass scss/main.scss assets/css/main.css
```

Watch while working:

```sh
sass --watch scss/main.scss:assets/css/main.css
```

Coffee backgrounds and product photography are stored in `assets/images/Background/` and `assets/images/Products/`.
