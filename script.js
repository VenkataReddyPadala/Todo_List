const task = document.getElementById("taskName");
const dateEle = document.getElementById("date");
const priorityEle = document.getElementById("priority");
const submitBtn = document.getElementById("submit");
const form = document.querySelector("form");
dateEle.addEventListener("focus", () => (dateEle.type = "date"));
dateEle.addEventListener("blur", () => (dateEle.type = "text"));
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function renderAll() {
  renderToday();
  renderFuture();
  renderCompletedTodo();
}
function taskDelete(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderAll();
}
function taskComplete(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderAll();
}
function renderToday() {
  window.taskDelete = taskDelete;
  window.taskComplete = taskComplete;

  let todaycount = 1;
  let todayOutput = ``;
  const todaySection = document.querySelector(".today");
  todaySection.innerHTML = "<h2>Today's TodoList</h2>";
  const todayHeader = todaySection.querySelector("h2");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  tasks.forEach((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    if (taskDate.getTime() === today.getTime() && !task.completed) {
      todayOutput += `
          <div class="todoContainer notCompleted">
            <div class="todo">${todaycount++}.${task.name}</div>
            <div class="todo">${task.date}</div>
            <div class="todo">${task.priority}</div>
            <div class="todo">
              <img
                src="https://surjeet-todo-list.netlify.app/img/check-circle%201.png"
                alt=""
                onClick="taskComplete('${task.id}')"
              />
              <img
                src="https://surjeet-todo-list.netlify.app/img/trash%201.png"
                alt=""
                onClick="taskDelete('${task.id}')"
              />
            </div>
          </div>`;
    }
  });
  todayHeader.insertAdjacentHTML("afterend", todayOutput);
}
function renderFuture() {
  let futurecount = 1;
  let futureOutput = ``;
  const futureSection = document.querySelector(".future");
  futureSection.innerHTML = "<h2>Future TodoList</h2>";
  const futureHeader = futureSection.querySelector("h2");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  tasks.forEach((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    if (taskDate.getTime() > today.getTime() && !task.completed) {
      futureOutput += `
          <div class="todoContainer notCompleted">
            <div class="todo">${futurecount++}.${task.name}</div>
            <div class="todo">${task.date}</div>
            <div class="todo">${task.priority}</div>
            <div class="todo">
              <img
                src="https://surjeet-todo-list.netlify.app/img/check-circle%201.png"
                alt=""
                onClick="taskComplete('${task.id}')"
              />
              <img
                src="https://surjeet-todo-list.netlify.app/img/trash%201.png"
                alt=""
                onClick="taskDelete('${task.id}')"
              />
            </div>
          </div>`;
    }
  });
  futureHeader.insertAdjacentHTML("afterend", futureOutput);
}
function renderCompletedTodo() {
  let completedTodocount = 1;
  let completedTodoOutput = ``;
  const completedTodoSection = document.querySelector(".completedTodo");
  completedTodoSection.innerHTML = "<h2>Completed TodoList</h2>";
  const completedTodoHeader = completedTodoSection.querySelector("h2");
  tasks.forEach((task) => {
    if (task.completed) {
      completedTodoOutput += `
          <div class="todoContainer completed">
            <div class="todo">${completedTodocount++}.${task.name}</div>
            <div class="todo">${task.date}</div>
            <div class="todo">${task.priority}</div>
            <div class="todo">
              <img
                src="https://surjeet-todo-list.netlify.app/img/2.png"
                alt=""
                onClick="taskDelete('${task.id}')"
              />
            </div>
          </div>`;
    }
  });
  completedTodoHeader.insertAdjacentHTML("afterend", completedTodoOutput);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = task.value.trim();
  const date = dateEle.value;
  const priority = priorityEle.value;
  if (priority === "Priority" || !priority || !taskName || !date) {
    alert("Please Enter all details");
    return;
  }
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("You cannot enter past date");
    return;
  }
  const newTask = {
    id: crypto.randomUUID(),
    name: taskName,
    date,
    priority,
    completed: false,
  };
  tasks = [...tasks, newTask];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderAll();
});
renderAll();
