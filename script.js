// Selección de elementos
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Cargar tareas desde el LocalStorage al iniciar
document.addEventListener("DOMContentLoaded", loadTasks);

// Manejo del formulario
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    addTask(taskText); // Agrega la tarea a la lista
    saveTask(taskText); // Guarda la tarea en LocalStorage
    taskInput.value = ""; // Limpia el campo de texto
});

// Función para agregar tareas a la interfaz
function addTask(taskText, completed = false) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    if (completed) {
        span.style.textDecoration = "line-through";
        span.style.color = "#999";
    }

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Completar";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", () => {
        span.style.textDecoration = "line-through";
        span.style.color = "#999";
        updateTaskStatus(taskText, true);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        removeTask(taskText);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Función para cargar tareas desde LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ text, completed }) => addTask(text, completed));
}

// Función para guardar una tarea en LocalStorage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para actualizar el estado de una tarea en LocalStorage
function updateTaskStatus(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((task) =>
        task.text === taskText ? { ...task, completed } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Función para eliminar una tarea de LocalStorage
function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}
