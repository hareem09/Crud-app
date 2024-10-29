// Select necessary elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let editMode = false;
let editTaskId = null;

// Add task event listener
taskForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  
  if (!taskText) {
    alert("Please add a task!");
    return;
  }

  if (editMode) {
    updateTask(taskText);
  } else {
    addTask(taskText);
  }

  taskInput.value = "";  // Reset input field
});

// Function to add task
function addTask(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;

  // Add event listeners for edit and delete buttons
  li.querySelector(".edit").addEventListener("click", () => editTask(li, taskText));
  li.querySelector(".delete").addEventListener("click", () => deleteTask(li));

  taskList.appendChild(li);
}

// Function to edit task
function editTask(taskElement, taskText) {
  taskInput.value = taskText;  // Set the value in the input field
  editMode = true;
  editTaskId = taskElement;  // Keep track of the task to edit
}

// Function to update task
function updateTask(updatedText) {
  editTaskId.querySelector("span").textContent = updatedText;  // Update task content
  editMode = false;
  editTaskId = null;
}

// Function to delete task
function deleteTask(taskElement) {
  taskList.removeChild(taskElement);
}

// Function to filter tasks based on search input
searchInput.addEventListener("input", function() {
  const searchText = searchInput.value.toLowerCase();
  const tasks = taskList.querySelectorAll("li");

  tasks.forEach(task => {
    const taskContent = task.querySelector("span").textContent.toLowerCase();
    if (taskContent.includes(searchText)) {
      task.style.display = "";  // Show the task
    } else {
      task.style.display = "none";  // Hide the task
    }
  });
});