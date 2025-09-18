/* ---------- Toggle Forms ---------- */
function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}
function showLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

/* ---------- Register ---------- */
document.getElementById("register-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  localStorage.setItem("user", JSON.stringify({name, email, password}));
  alert("Registered successfully! Please login.");
  showLogin();
});

/* ---------- Login ---------- */
document.getElementById("login-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    loadHome();
  } else {
    alert("Invalid email or password");
  }
});

/* ---------- Load Home ---------- */
function loadHome() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("home-section").style.display = "block";
    document.getElementById("user-name").textContent = user.name;
  }
}

/* ---------- Logout ---------- */
function logout() {
  localStorage.removeItem("loggedInUser");
  document.getElementById("home-section").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}

/* ---------- Cart System ---------- */
let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({item, price});
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  cart.forEach((food) => {
    let li = document.createElement("li");
    li.textContent = `${food.item} - ₹${food.price}`;
    cartList.appendChild(li);
  });
  document.getElementById("total").textContent = `Total: ₹${total}`;
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Order placed successfully! 🎉");
    cart = [];
    total = 0;
    updateCart();
  }
}

/* ---------- Auto Login Check ---------- */
window.onload = function() {
  loadHome();
};
