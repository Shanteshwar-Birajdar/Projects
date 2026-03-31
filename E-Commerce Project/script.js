const products = [
  {
    id: 1,
    name: "Mobile",
    price: 15000,
    category: "electronics",
    image: "https://i.gadgets360cdn.com/products/large/vivo-t2-5g-db-709x800-1681200173.jpg"
  },
  {
    id: 2,
    name: "Headphones",
    price: 800,
    category: "electronics",
    image: "https://img.freepik.com/premium-photo/photo-wireless-headphones_1029469-18128.jpg"
  },
  {
    id: 3,
    name: "T-Shirt",
    price: 500,
    category: "clothing",
    image: "https://images.creativefabrica.com/products/previews/2024/07/08/Mq7dYnBwz/2ixx4T21DS0BP7g8Sjpfhu3XQMm-desktop.jpg"
  },
  {
    id: 4,
    name: "Jeans",
    price: 1200,
    category: "clothing",
    image: "https://i5.walmartimages.com/seo/Entyinea-Ripped-Jeans-for-Men-Stretch-Ripped-Denim-Stylish-Jeans-Black-XL_3a84e386-fa14-4435-9a25-b5803e2740af.16196e8dc91cee1e344b4407ef6d9f98.jpeg"
  },
  {
    id: 5,
    name: "Laptop",
    price: 40000,
    category: "electronics",
    image: "https://png.pngtree.com/background/20230616/original/pngtree-the-hp-computer-with-windows-10-picture-image_3625708.jpg"
  },
   {
    id: 6,
    name: "TV",
    price: 50000,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71Am8lvWpoL.jpg"
  }
];

let cart = [];

// Display Products
function displayProducts(filteredProducts) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  filteredProducts.forEach(product => {
    productList.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to Cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  displayCart();
}

// Increase Quantity
function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  item.quantity += 1;
  displayCart();
}

// Decrease Quantity
function decreaseQty(id) {
  const item = cart.find(p => p.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.id !== id);
  }

  displayCart();
}

// Display Cart
function displayCart() {
  const cartDiv = document.getElementById("cart");
  const totalSpan = document.getElementById("total");

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <div>
          ${item.name}<br>
          ₹${item.price} x ${item.quantity}
        </div>
        <div class="qty-btns">
          <button onclick="decreaseQty(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${item.id})">+</button>
        </div>
      </div>
    `;
  });

  totalSpan.innerText = total;
}

// Filters
function applyFilters() {
  const category = document.getElementById("categoryFilter").value;
  const price = document.getElementById("priceFilter").value;

  let filtered = products;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (price === "low") {
    filtered = filtered.filter(p => p.price < 10000);
  } else if (price === "high") {
    filtered = filtered.filter(p => p.price >= 10000);
  }

  displayProducts(filtered);
}

// Event Listeners
document.getElementById("categoryFilter").addEventListener("change", applyFilters);
document.getElementById("priceFilter").addEventListener("change", applyFilters);

// Initial Load
displayProducts(products);