const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateProgress() {
  if (tasks.length === 0) {
    progressText.textContent = "Progress: 0% 🚀";
    progressFill.style.width = "0%";
    return;
  }

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);
  progressText.textContent = `Progress: ${progress}% 🎯`;
  progressFill.style.width = `${progress}%`;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-card");
    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        📘 <b>${task.subject}</b>: ${task.description} (⏰ ${task.deadline})
      </span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;

  tasks.push({ subject, description, deadline, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.reset();
  renderTasks();
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Initial render
renderTasks();
