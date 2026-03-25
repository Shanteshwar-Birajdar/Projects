const form = document.getElementById("propertyForm");
const propertyList = document.getElementById("propertyList");

// Show sample flat on page load
window.onload = function () {
  showSampleFlat();
};

function showSampleFlat() {
  const li = document.createElement("li");

  li.innerHTML = `
    <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" alt="Flat">
    <div class="details">
      <strong>Flat (Sample)</strong><br>
      Owner: Demo Builder<br>
      Location: Hinjewadi, Pune<br>
      Price: ₹45,00,000
    </div>
  `;

  propertyList.appendChild(li);
}

// Add new property
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const owner = document.getElementById("owner").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const type = document.getElementById("type").value;

  let imageUrl = "";

  if (type === "House") {
    imageUrl = "https://images.unsplash.com/photo-1568605114967-8130f3a36994";
  } else if (type === "Flat") {
    imageUrl = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688";
  } else if (type === "Plot") {
    imageUrl = "https://images.unsplash.com/photo-1592595896616-c37162298647";
  }

  const li = document.createElement("li");

  li.innerHTML = `
    <img src="${imageUrl}" alt="${type}">
    <div class="details">
      <strong>${type}</strong><br>
      Owner: ${owner}<br>
      Location: ${location}<br>
      Price: ₹${price}
    </div>
    <span class="delete">❌</span>
  `;

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
  });

  propertyList.appendChild(li);
  form.reset();
});
