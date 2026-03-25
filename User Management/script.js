const STORAGE_KEY = "rbac_users";

let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentRole = "Admin";

const form = document.getElementById("userForm");
const table = document.getElementById("userTable");
const saveBtn = document.getElementById("saveBtn");

applyPermissions();

/* Save to LocalStorage */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/* Form Submit */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (currentRole === "Viewer") return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;
  const editIndex = document.getElementById("editIndex").value;

  if (!name || !email || !role) {
    alert("All fields are required");
    return;
  }

  const user = { name, email, role };

  if (editIndex === "") {
    users.push(user);
  } else {
    users[editIndex] = user;
    document.getElementById("editIndex").value = "";
    saveBtn.textContent = "Add User";
  }

  saveToStorage();
  form.reset();
  renderTable();
});

/* Render Table */
function renderTable() {
  table.innerHTML = "";

  users.forEach((u, i) => {
    table.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
          ${currentRole !== "Viewer" ? `<button onclick="editUser(${i})">Edit</button>` : ""}
          ${currentRole === "Admin" ? `<button onclick="deleteUser(${i})">Delete</button>` : ""}
        </td>
      </tr>
    `;
  });
}

/* Edit User */
function editUser(index) {
  if (currentRole === "Viewer") return;

  document.getElementById("name").value = users[index].name;
  document.getElementById("email").value = users[index].email;
  document.getElementById("role").value = users[index].role;
  document.getElementById("editIndex").value = index;
  saveBtn.textContent = "Update User";
}

/* Delete User */
function deleteUser(index) {
  if (currentRole !== "Admin") return;

  if (confirm("Delete this user?")) {
    users.splice(index, 1);
    saveToStorage();
    renderTable();
  }
}

/* Role Tasks */
function renderRoleTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const roleTasks = {
    Admin: ["Add Users", "Edit Users", "Delete Users", "Full Access"],
    Manager: ["Add Users", "Edit Users"],
    Viewer: ["View Users Only"]
  };

  roleTasks[currentRole].forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });
}

/* Apply Permissions */
function applyPermissions() {
  currentRole = document.getElementById("currentRole").value;
  saveBtn.disabled = currentRole === "Viewer";
  renderRoleTasks();
  renderTable();
}
