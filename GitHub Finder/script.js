const input = document.getElementById("username");

// Enter key support
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getUser();
  }
});

async function getUser() {
  const username = input.value.trim();

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  // Empty input check
  if (username === "") {
    error.innerText = "Please enter username";
    error.classList.remove("hidden");
    return;
  }

  // 🔥 Handle full GitHub URL input
  if (username.includes("github.com")) {
    username = username.split("github.com/")[1];

    // Remove extra slash if exists
    if (username.includes("/")) {
      username = username.split("/")[0];
    }
  }

  // Reset UI
  error.classList.add("hidden");
  result.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      throw new Error("User not found");
    }

    const data = await res.json();

    // Hide loader
    loading.classList.add("hidden");
    console.log(data); // Debugging

     // Hide loader
    loading.classList.add("hidden");

    // Show result
    result.classList.remove("hidden");

    // Update UI
    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").innerText = data.name || data.login;
    document.getElementById("bio").innerText = data.bio || "No bio available";

    document.getElementById("followers").innerText = data.followers;
    document.getElementById("following").innerText = data.following;
    document.getElementById("repos").innerText = data.public_repos;

    document.getElementById("profile").href = data.html_url;

  } catch (err) {
    loading.classList.add("hidden");
    error.innerText = err.message || "Failed to fetch";
    error.classList.remove("hidden");
  }
}