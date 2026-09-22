const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    const count = tasks.length;

    if (count === 0) {
        taskCount.textContent = "0 tasks";
    } else if (count === 1) {
        taskCount.textContent = "1 task";
    } else {
        taskCount.textContent = `${count} tasks`;
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task-item";

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            editTask(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTask(index);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateTaskCount();
}

function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

function editTask(index) {

    const updatedTask = prompt(
        "Edit your task:",
        tasks[index]
    );

    if (updatedTask === null) {
        return;
    }

    const trimmedTask = updatedTask.trim();

    if (trimmedTask === "") {
        alert("Task cannot be empty.");
        return;
    }

    tasks[index] = trimmedTask;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addTask();
    }

});

renderTasks();