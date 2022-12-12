"use strict";
const todoList = document.querySelector("#todos_list");
const userInput = document.querySelector("#todo_input");
const addTaskBtn = document.querySelector("#add_btn");
let tasksList = JSON.parse(String(localStorage.getItem("TASKSLIST"))) || [];
// Start The Program Here !
if (tasksList.length) {
    rebuildTodos();
}
addTaskBtn.addEventListener("click", () => {
    createNewTaskInfos();
});
window.addEventListener("keypress", (e) => {
    if (!(e.key === "Enter"))
        return;
    createNewTaskInfos();
});
const createNewTaskInfos = () => {
    if (!userInput.value)
        return;
    const taskId = new Date().getTime();
    const taskTitle = userInput.value;
    const isDone = false;
    userInput.value = "";
    tasksList.push({ taskId, taskTitle, isDone });
    AddToLocalStorage();
    todoList.prepend(createNewTask({ taskId, taskTitle, isDone }));
};
function createNewTask(task, index) {
    const todo = document.createElement("div");
    todo.className = task.isDone ? "todo done" : "todo";
    const delay = index ? index / 10 + 0.1 : 0.1;
    todo.style.animationDelay = `${delay}s`;
    const title = document.createElement("h3");
    title.className = "title";
    title.textContent = task.taskTitle;
    const actions = document.createElement("div");
    actions.className = "actions";
    const deleteIcon = document.createElement("i");
    deleteIcon.id = "delete_icon";
    deleteIcon.className = "fa-solid fa-trash";
    deleteIcon.addEventListener("click", () => deleteTask(task.taskId));
    const doneIcon = document.createElement("i");
    doneIcon.id = "done_icon";
    doneIcon.className = "fa-solid fa-check";
    doneIcon.addEventListener("click", () => doneTask(task.taskId));
    actions.append(deleteIcon);
    actions.append(doneIcon);
    todo.append(title);
    todo.append(actions);
    return todo;
}
const deleteTask = (id) => {
    const tempList = tasksList.filter((item) => item.taskId !== id);
    tasksList = tempList;
    AddToLocalStorage();
    rebuildTodos();
};
const doneTask = (id) => {
    const tempList = tasksList.map((item) => item.taskId === id ? Object.assign(Object.assign({}, item), { isDone: !item.isDone }) : item);
    tasksList = tempList;
    AddToLocalStorage();
    rebuildTodos();
};
function rebuildTodos() {
    todoList.innerHTML = "";
    tasksList
        .reverse()
        .forEach((item, index) => todoList.append(createNewTask(item, index)));
}
const AddToLocalStorage = () => {
    localStorage.setItem("TASKSLIST", JSON.stringify(tasksList));
};
