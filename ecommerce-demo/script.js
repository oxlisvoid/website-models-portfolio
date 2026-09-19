const products = [
  { id: 1, name: "Wireless Headphones", price: 89.99, cat: "electronics", emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 149.00, cat: "electronics", emoji: "⌚" },
  { id: 3, name: "USB-C Hub", price: 39.99, cat: "accessories", emoji: "🔌" },
  { id: 4, name: "Desk Lamp", price: 45.50, cat: "home", emoji: "💡" },
  { id: 5, name: "Mechanical Keyboard", price: 119.00, cat: "electronics", emoji: "⌨️" },
  { id: 6, name: "Phone Stand", price: 18.99, cat: "accessories", emoji: "📱" },
  { id: 7, name: "Ceramic Mug Set", price: 29.99, cat: "home", emoji: "☕" },
  { id: 8, name: "Portable SSD 1TB", price: 99.00, cat: "electronics", emoji: "💾" },
  { id: 9, name: "Cable Organizer", price: 14.50, cat: "accessories", emoji: "🧵" },
  { id: 10, name: "Plant Pot", price: 22.00, cat: "home", emoji: "🪴" },
  { id: 11, name: "Bluetooth Speaker", price: 59.99, cat: "electronics", emoji: "🔊" },
  { id: 12, name: "Laptop Sleeve", price: 34.00, cat: "accessories", emoji: "💼" },
];

let cart = [];
let currentCat = "all";
let searchTerm = "";

const productsEl = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const drawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");

function renderProducts() {
  const filtered = products.filter((p) => {
    const matchCat = currentCat === "all" || p.cat === currentCat;
    const matchSearch = p.name.toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });

  productsEl.innerHTML = filtered
    .map(
      (p) => `
    <article class="product">
      <div class="product-img">${p.emoji}</div>
      <div class="product-body">
        <div class="product-cat">${p.cat}</div>
        <h3>${p.name}</h3>
        <div class="price">$${p.price.toFixed(2)}</div>
        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    </article>
  `
    )
    .join("");

  productsEl.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(+btn.dataset.id));
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = count;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
  } else {
    cartItems.innerHTML = cart
      .map(
        (i) => `
      <div class="cart-item">
        <div class="cart-item-info">
          ${i.emoji} ${i.name}
          <small>$${i.price.toFixed(2)} × ${i.qty}</small>
        </div>
        <button class="remove-item" data-id="${i.id}">Remove</button>
      </div>
    `
      )
      .join("");
    cartItems.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", () => removeFromCart(+btn.dataset.id));
    });
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Events
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    renderProducts();
  });
});

document.getElementById("search").addEventListener("input", (e) => {
  searchTerm = e.target.value.toLowerCase();
  renderProducts();
});

document.getElementById("cart-toggle").addEventListener("click", () => {
  drawer.classList.add("open");
  overlay.classList.add("open");
});

document.getElementById("close-cart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function closeCart() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
}

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) return alert("Cart is empty");
  alert("This is a demo. Checkout would process " + cartCount.textContent + " item(s).");
  cart = [];
  updateCartUI();
  closeCart();
});

renderProducts();
updateCartUI();
