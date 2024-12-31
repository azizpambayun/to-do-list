const newTaskInput = document.getElementById("newTask");
const prioritySelect = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const taskCategorySelect = document.getElementById("taskCategory");
const addTaskButton = document.getElementById("addTask");
const activeTaskList = document.getElementById("activeTaskList");
const completedTaskList = document.getElementById("completedTaskList");
const deleteAllCompletedButton = document.getElementById("deleteAllCompleted");
const summary = document.getElementById("summary");
const liveClock = document.getElementById("liveClock");
const userName = document.getElementById("userName");
const jobPosition = document.getElementById("jobPosition");
const profileImage = document.getElementById("profileImage");

let tasks = [];

function renderTasks() {
  activeTaskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const isOverdue = !task.completed && isTaskOverdue(task);
    li.className = `flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-3 rounded-md ${isOverdue ? "border-l-4 border-red-500" : ""}`;
    li.innerHTML = `
                    <div class="flex items-start space-x-3 mb-2 sm:mb-0">
                        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})" class="form-checkbox h-5 w-5 mt-1 text-blue-600">
                        <div>
                            <span class="${task.completed ? "line-through text-gray-400" : "text-gray-800"}">
                                ${task.text}
                            </span>
                            <div class="text-xs text-gray-500">
                                Category: ${task.category}<br>
                                Created: ${task.createdAt}<br>
                                Due: ${task.dueDate} ${isOverdue ? '<span class="text-red-500 font-bold">(Overdue)</span>' : ""}
                            </div>
                        </div>
                    </div>
                    <span class="text-sm ${getPriorityColor(task.priority)} mt-2 sm:mt-0">${task.priority}</span>
                `;
    if (task.completed) {
      completedTaskList.appendChild(li);
    } else {
      activeTaskList.appendChild(li);
    }
  });
  updateSummary();
}

function getPriorityColor(priority) {
  switch (priority) {
    case "low":
      return "text-green-600";
    case "medium":
      return "text-yellow-600";
    case "high":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

function isTaskOverdue(task) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(task.dueDate);
  return dueDate < today;
}

function addTask() {
  const text = newTaskInput.value.trim();
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;
  const category = taskCategorySelect.value;
  if (text && dueDate) {
    const now = new Date();
    const createdAt = now.toLocaleString();
    tasks.push({ text, priority, completed: false, createdAt, dueDate, category });
    newTaskInput.value = "";
    dueDateInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteAllCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

function updateSummary() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter((task) => !task.completed && isTaskOverdue(task)).length;
  summary.textContent = `Total: ${totalTasks} | Completed: ${completedTasks} | Remaining: ${remainingTasks} | Overdue: ${overdueTasks}`;
}

function updateLiveClock() {
  const now = new Date();
  liveClock.textContent = now.toLocaleString();
}

addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
deleteAllCompletedButton.addEventListener("click", deleteAllCompleted);

// Update live clock every second
setInterval(updateLiveClock, 1000);

// Initial render
renderTasks();
updateLiveClock();
