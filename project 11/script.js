
document.getElementById('collegeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // prevent page refresh

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const course = document.getElementById('course').value;
  const address = document.getElementById('address').value.trim();
  const msg = document.getElementById('msg');

  if (!name || !email || !mobile || !gender || !course || !address) {
    msg.style.color = 'red';
    msg.innerText = 'Please fill all required fields.';
    return;
  }

  // Optional: basic mobile number validation
  if (!/^[0-9]{10}$/.test(mobile)) {
    msg.style.color = 'red';
    msg.innerText = 'Please enter a valid 10-digit mobile number.';
    return;
  }

  msg.style.color = 'green';
  msg.innerText = `Thank you ${name}, your form has been submitted!`;

  // You can reset the form
  document.getElementById('collegeForm').reset();
});
