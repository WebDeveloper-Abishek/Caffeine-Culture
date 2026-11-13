export const CATEGORIES = [
  { id: "coffee", label: "Coffees" },
  { id: "cakes", label: "Cakes" },
  { id: "buns", label: "Buns" },
  { id: "brownies", label: "Brownies" },
  { id: "beverages", label: "Beverages" },
];

export const PRODUCTS = [
  { id: "espresso", name: "House Espresso", category: "coffee", price: 650, image: "espresso.jpg", description: "A rich, balanced shot with a smooth crema and a lingering finish." },
  { id: "cappuccino", name: "Classic Cappuccino", category: "coffee", price: 850, image: "cappuccino.jpg", description: "A double shot topped with silky steamed milk and delicate foam." },
  { id: "house-latte", name: "Caffeine Latte", category: "coffee", price: 900, image: "house-latte.jpg", description: "Our signature espresso blend softened with velvety steamed milk." },
  { id: "mocha-coffee", name: "Chocolate Mocha", category: "coffee", price: 950, image: "mocha.jpg", description: "Espresso, smooth chocolate, and steamed milk in one comforting cup." },
  { id: "vanilla-cake", name: "Vanilla Cream Cake", category: "cakes", price: 850, image: "cake.jpg", description: "Soft vanilla sponge layered with a light, creamy filling." },
  { id: "chocolate-cake", name: "Chocolate Fudge Cake", category: "cakes", price: 950, image: "cake.jpg", description: "A tender chocolate slice with a rich cocoa finish." },
  { id: "coffee-cake", name: "Coffee Crumb Cake", category: "cakes", price: 900, image: "cake.jpg", description: "A buttery, gently spiced cake made to pair with a fresh brew." },
  { id: "caramel-cake", name: "Caramel Layer Cake", category: "cakes", price: 950, image: "cake.jpg", description: "Soft layers with a mellow caramel cream and golden crumb." },
  { id: "butter-bun", name: "Classic Butter Bun", category: "buns", price: 450, image: "pastry.jpg", description: "A soft, golden bun with a light buttery finish." },
  { id: "cinnamon-bun", name: "Cinnamon Bun", category: "buns", price: 650, image: "pastry.jpg", description: "A tender swirl with fragrant cinnamon and a touch of sweetness." },
  { id: "chocolate-bun", name: "Chocolate Bun", category: "buns", price: 600, image: "pastry.jpg", description: "A fluffy bakery bun with a smooth chocolate center." },
  { id: "savory-bun", name: "Herb & Cheese Bun", category: "buns", price: 700, image: "pastry.jpg", description: "A soft savory bun with herbs and a warm, cheesy center." },
  { id: "classic-brownie", name: "Classic Chocolate Brownie", category: "brownies", price: 600, image: "brownie.jpg", description: "Deep chocolate flavor with a tender center and delicate crust." },
  { id: "walnut-brownie", name: "Walnut Brownie", category: "brownies", price: 700, image: "brownie.jpg", description: "A fudgy chocolate square with toasted walnut pieces." },
  { id: "double-chocolate-brownie", name: "Double Chocolate Brownie", category: "brownies", price: 750, image: "brownie.jpg", description: "An extra chocolatey bake with a soft, rich middle." },
  { id: "caramel-brownie", name: "Salted Caramel Brownie", category: "brownies", price: 750, image: "brownie.jpg", description: "Fudgy brownie swirled with sweet caramel and a hint of salt." },
  { id: "iced-coffee", name: "Iced Coffee", category: "beverages", price: 800, image: "iced-coffee.jpg", description: "Bright, freshly brewed coffee poured over ice." },
  { id: "cold-brew", name: "Slow Cold Brew", category: "beverages", price: 900, image: "iced-cold-brew.jpg", description: "Slow-steeped coffee with a mellow body and naturally smooth finish." },
  { id: "iced-mocha", name: "Iced Mocha", category: "beverages", price: 950, image: "mocha.jpg", description: "Espresso and chocolate over ice, finished with creamy milk." },
  { id: "iced-latte", name: "Iced Latte", category: "beverages", price: 900, image: "iced-coffee.jpg", description: "A double espresso balanced with cold milk and plenty of ice." },
];

export const formatPrice = (amount) =>
  `Rs. ${new Intl.NumberFormat("en-LK").format(amount)}`;

export const getProduct = (id) => PRODUCTS.find((product) => product.id === id);
