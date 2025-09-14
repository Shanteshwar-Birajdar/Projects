document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inp');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');

  addBtn.addEventListener('click', addTask);

  // Allow Enter key to add task quickly
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
      e.preventDefault();
    }
  });

  function addTask() {
    const task = input.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (!task || !date || !time) {
      alert('Please fill in task, date and time.');
      return;
    }

    // Combine into Date object
    const dt = new Date(`${date}T${time}`);
    if (isNaN(dt)) {
      alert('Invalid date/time.');
      return;
    }

    // Create task item
    const li = document.createElement('li');
    li.dataset.datetime = dt.getTime();
    li.innerHTML = `
      <span class="task-text">${escapeHtml(task)}</span>
      <div class="meta">
        <div class="time">${formatDateTime(dt)}</div>
      </div>
      <button class="del-btn">Delete</button>
    `;

    // Delete handler
    li.querySelector('.del-btn').addEventListener('click', () => li.remove());

    // Add to task list
    taskList.appendChild(li);

    // Clear inputs
    input.value = '';
    dateInput.value = '';
    timeInput.value = '';

    // Sort tasks
    sortTasks();
    updatePastStatus();
  }

  function sortTasks() {
    const items = Array.from(taskList.children);
    items.sort((a, b) => Number(a.dataset.datetime) - Number(b.dataset.datetime));
    items.forEach(i => taskList.appendChild(i));
  }

  function updatePastStatus() {
    const now = Date.now();
    Array.from(taskList.children).forEach(li => {
      const t = Number(li.dataset.datetime);
      if (t < now) li.classList.add('past');
      else li.classList.remove('past');
    });
  }

  // keep past-status updated every minute
  setInterval(updatePastStatus, 60 * 1000);
  updatePastStatus();

  // helpers
  function formatDateTime(dt) {
    const opts = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return dt.toLocaleString(undefined, opts);
  }

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }
});
