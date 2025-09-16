// Toggle functions
function showRegister() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
}

function showWelcome(email) {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("welcomeSection").classList.remove("hidden");
  document.getElementById("welcomeUser").textContent = email;
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  document.getElementById("welcomeSection").classList.add("hidden");
  showLogin();
}

// Check session on load
window.onload = function () {
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showWelcome(loggedInUser);
  }
};

// Login Script
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let message = document.getElementById("message");

  let emailError = document.querySelector("#email + .error");
  let passwordError = document.querySelector("#password + .error");

  let valid = true;

  // Email validation
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    emailError.textContent = "Enter a valid email!";
    emailError.style.visibility = "visible";
    valid = false;
  } else {
    emailError.style.visibility = "hidden";
  }

  // Password validation
  let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  if (!password.match(passwordPattern)) {
    passwordError.textContent =
      "Password must contain 1 uppercase, 1 number, 1 symbol & min 6 chars!";
    passwordError.style.visibility = "visible";
    valid = false;
  } else {
    passwordError.style.visibility = "hidden";
  }

  // Check credentials
  if (valid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem("loggedInUser", email);
      showWelcome(email);
    } else {
      message.style.color = "red";
      message.textContent = "Invalid email or password!";
    }
  } else {
    message.style.color = "red";
    message.textContent = "Please enter valid Email & Password.";
  }
});

// Register Script
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("regEmail").value.trim();
  let password = document.getElementById("regPassword").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  let message = document.getElementById("regMessage");

  let emailError = document.querySelector("#regEmail + .error");
  let passwordError = document.querySelector("#regPassword + .error");
  let confirmError = document.querySelector("#confirmPassword + .error");

  let valid = true;

  // Email validation
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    emailError.textContent = "Enter a valid email!";
    emailError.style.visibility = "visible";
    valid = false;
  } else {
    emailError.style.visibility = "hidden";
  }

  // Password validation
  let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  if (!password.match(passwordPattern)) {
    passwordError.textContent =
      "Must contain 1 uppercase, 1 number, 1 symbol & min 6 chars!";
    passwordError.style.visibility = "visible";
    valid = false;
  } else {
    passwordError.style.visibility = "hidden";
  }

  // Confirm password
  if (password !== confirmPassword) {
    confirmError.textContent = "Passwords do not match!";
    confirmError.style.visibility = "visible";
    valid = false;
  } else {
    confirmError.style.visibility = "hidden";
  }

  if (valid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
      message.style.color = "red";
      message.textContent = "Email already registered!";
    } else {
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      message.style.color = "green";
      message.textContent = "Registration Successful! You can now login.";
      setTimeout(showLogin, 1500);
    }
  } else {
    message.style.color = "red";
    message.textContent = "Please enter valid informations.";
  }
});
