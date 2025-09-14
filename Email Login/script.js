document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let message = document.getElementById("message");

  let emailError = document.querySelector("#email + .error");
  let passwordError = document.querySelector("#password + .error");

  let valid = true;

  // Email validation (simple regex)
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    emailError.textContent = "Enter a valid email!";
    emailError.style.visibility = "visible";
    valid = false;
  } else {
    emailError.style.visibility = "hidden";
  }

  // Password validation (1 uppercase, 1 number, 1 special char, min 6 chars)

  let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  if (!password.match(passwordPattern)) {
    passwordError.textContent = 
    "Password must contain 1 uppercase, 1 number, 1 symbol & min 6 chars!";
    passwordError.style.visibility = "visible";
    valid = false;
  } else {
    passwordError.style.visibility = "hidden";
  }

  if (valid) {
    message.style.color = "green";
    message.textContent = "Login Successful!";
  } else {
    message.style.color = "red";
    message.textContent = "Please fix errors and try again.";
  }
});
