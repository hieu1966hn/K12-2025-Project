// // Code buổi 4: Chưa sử dụng LocalStorage

// // Khai báo biến
// let tasks = [];

// // DOM elements
// const taskForm = document.getElementById("task-form");
// const taskInput = document.getElementById("task-input");
// const taskList = document.getElementById("task-list");
// const taskCount = document.getElementById("task-count");
// const clearAll = document.getElementById("clear-all");
// const emptyState = document.getElementById("empty-state");

// // Cập nhật số lượng công việc
// function updateTaskCount() {
//   let remaining = 0;

//   for (let i = 0; i < tasks.length; i++) {
//     if (!tasks[i].completed) {
//       remaining++;
//     }
//   }
//   taskCount.textContent = remaining;

//   if (tasks.length === 0) {
//     emptyState.style.display = "block";
//   } else {
//     emptyState.style.display = "none";
//   }
// }

// // Hiển thị danh sách công việc
// function renderTasks() {
//   taskList.innerHTML = "";

//   tasks.forEach((task, index) => {
//     const li = document.createElement("li");
//     li.classList.add("task-item");

//     // Checkbox
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.classList.add("task-checkbox");
//     checkbox.checked = task.completed;

//     // Nội dung công việc
//     const taskContent = document.createElement("span");
//     taskContent.classList.add("task-content");
//     taskContent.textContent = task.text;

//     if (task.completed) {
//       taskContent.classList.add("completed");
//     }

//     // // Nút xoá
//     //   const deleteBtn = document.createElement("button");
//     //   deleteBtn.classList.add("delete-btn");
//     //   deleteBtn.innerHTML = "&times;";

//     // Gắn sự kiện checkbox
//     checkbox.addEventListener("click", function () {
//       task.completed = checkbox.checked;
//       taskContent.classList.toggle("completed");
//       updateTaskCount();
//     });

//     // // Gắn sự kiện xoá task
//     //   deleteBtn.addEventListener("click", function () {
//     //     tasks.splice(index, 1);
//     //     renderTasks();
//     //   });

//     // Thêm các phần tử vào <li>
//     li.appendChild(checkbox);
//     li.appendChild(taskContent);
//     // li.appendChild(deleteBtn);

//     // Thêm <li> vào danh sách
//     taskList.appendChild(li);
//   });

//   updateTaskCount();
// }

// // Xử lý khi thêm task mới
// taskForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const taskText = taskInput.value.trim();

//   if (taskText !== "") {
//     const newTask = {
//       text: taskText,
//       completed: false,
//     };
//     tasks.push(newTask);
//     renderTasks();
//     taskInput.value = "";
//     taskInput.focus();
//   }
// });

// // Xoá toàn bộ công việc
// //   clearAll.addEventListener("click", function () {
// //     if (tasks.length > 0 && confirm("Clear all tasks?")) {
// //       tasks = [];
// //       renderTasks();
// //     }
// //   });

// // Hiển thị ban đầu
// renderTasks();

/////// Code hoàn chỉnh dự án buổi 5

//   // DOM elements
//   const taskForm = document.getElementById("task-form");
//   const taskInput = document.getElementById("task-input");
//   const taskList = document.getElementById("task-list");
//   const taskCount = document.getElementById("task-count");
//   const clearAll = document.getElementById("clear-all");
//   const emptyState = document.getElementById("empty-state");

//   // Load tasks from local storage
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   // Function to save tasks to local storage
//   const saveTasks = function () {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     updateTaskCount();
//   };

//   // Function to update task count
//   const updateTaskCount = function () {
//     const remainingTasks = tasks.filter((task) => !task.completed).length;
//     taskCount.textContent = remainingTasks;

//     // Toggle empty state visibility
//     if (tasks.length === 0) {
//       emptyState.style.display = "block";
//     } else {
//       emptyState.style.display = "none";
//     }
//   };

//   // Function to create a task element
//   const createTaskElement = (task) => {
//     const taskItem = document.createElement("li");
//     taskItem.classList.add("task-item");
//     taskItem.setAttribute("data-id", task.id);

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.classList.add("task-checkbox");
//     checkbox.checked = task.completed;

//     const taskContent = document.createElement("span");
//     taskContent.classList.add("task-content");
//     taskContent.textContent = task.text;
//     if (task.completed) {
//       taskContent.classList.add("completed");
//     }

//     const deleteBtn = document.createElement("button");
//     deleteBtn.classList.add("delete-btn");
//     deleteBtn.innerHTML = "&times;";

//     taskItem.appendChild(checkbox);
//     taskItem.appendChild(taskContent);
//     taskItem.appendChild(deleteBtn);

//     return taskItem;
//   };

//   // Function to render tasks
//   const renderTasks = function () {
//     taskList.innerHTML = "";
//     tasks.forEach((task) => {
//       const taskElement = createTaskElement(task);
//       taskList.appendChild(taskElement);
//     });
//     updateTaskCount();
//   };

//   // Add task
//   taskForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const taskText = taskInput.value.trim();
//     if (taskText) {
//       const newTask = {
//         id: Date.now().toString(),
//         text: taskText,
//         completed: false,
//       };
//       tasks.push(newTask);
//       saveTasks();
//       renderTasks();
//       taskInput.value = "";
//       taskInput.focus();
//     }
//   });

//   // Toggle task completion
//   taskList.addEventListener("click", (e) => {
//     if (e.target.classList.contains("task-checkbox")) {
//       const taskId = e.target.parentElement.getAttribute("data-id");
//       const task = tasks.find((t) => t.id === taskId);
//       if (task) {
//         task.completed = e.target.checked;
//         const taskContent = e.target.nextElementSibling;

//         if (task.completed) {
//           taskContent.classList.add("completed");
//         } else {
//           taskContent.classList.remove("completed");
//         }

//         saveTasks();
//         updateTaskCount();
//       }
//     }
//   });

//   // Delete task
//   taskList.addEventListener("click", (e) => {
//     if (e.target.classList.contains("delete-btn")) {
//       const taskItem = e.target.parentElement;
//       const taskId = taskItem.getAttribute("data-id");
//       tasks = tasks.filter((task) => task.id !== taskId);
//       saveTasks();
//       renderTasks();
//     }
//   });

//   // Clear all tasks
//   clearAll.addEventListener("click", function () {
//     if (tasks.length > 0) {
//       if (confirm("Are you sure you want to delete all tasks?")) {
//         tasks = [];
//         saveTasks();
//         renderTasks();
//       }
//     }
//   });

//   // Initial render
//   renderTasks();

/////// Code mới nhất buổi 555555
// Khai báo biến
let tasks = [];

// Lấy dữ liệu từ localStorage nếu có
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

// DOM elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const clearAll = document.getElementById("clear-all");
const emptyState = document.getElementById("empty-state");

// Cập nhật số lượng công việc còn lại
function updateTaskCount() {
  let remaining = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].completed) {
      remaining++;
    }
  }
  taskCount.textContent = remaining;

  if (tasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

// Hiển thị danh sách công việc
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;

    // Nội dung công việc
    const taskContent = document.createElement("span");
    taskContent.classList.add("task-content");
    taskContent.textContent = task.text;

    if (task.completed) {
      taskContent.classList.add("completed");
    }

    // Gắn sự kiện: tick hoàn thành
    checkbox.addEventListener("click", function () {
      task.completed = checkbox.checked;
      taskContent.classList.toggle("completed");
      updateTaskCount();
      localStorage.setItem("tasks", JSON.stringify(tasks)); // 🔁 Lưu sau mỗi thay đổi
    });

    // Nút xoá
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "&times;";

    //Gắn sự kiện xoá task
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    });

    // Thêm các phần tử vào li
    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(deleteBtn);

    // Thêm li vào danh sách
    taskList.appendChild(li);
  });

  updateTaskCount();
}

// Xử lý khi thêm task mới
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const newTask = {
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // 💾 Lưu vào LocalStorage
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
  }
});

renderTasks();

// Xóa tất cả công việc
clearAll.addEventListener("click", function () {
  tasks = [];
  localStorage.removeItem("tasks");
  renderTasks();
});
