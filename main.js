const tasks = [];
let tiempo = 0;
let timer = null;
let timerBreak = null;
let current = null;

const btnAdd = document.querySelector("#btnAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTasks();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };
  tasks.unshift(newTask);
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
      <div class="task">
        <div class="completed">${
          task.completed
            ? `<span class="done">Done</span>`
            : `<button class="start-button" data-id="${task.id}">Start</button>`
        }</div>
        <div class="title">${task.title}</div>
      </div>
    `;
  });
  const taksContainer = document.querySelector("#tasks");
  taksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll("#tasks .task .start-button");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.getAttribute("data-id");

      if (!timer) {
        startButtonHandler(id);
        button.textContent = "In progress...";
      }
    });
  });
}

function startButtonHandler(id) {
  tiempo = 5;
  current = id;

  const taskIndex = tasks.findIndex((taks) => taks.id === id);
  taskName.textContent = tasks[taskIndex].title;

  renderTime();

  timer = setInterval(() => {
    timeHandler(id);
  }, 1000);
}

function timeHandler(id) {
  tiempo--;

  renderTime();

  if (tiempo === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTasks();
    startBreak();
  }
}

function startBreak() {
  tiempo = 3;
  taskName.textContent = "Break";
  renderTime();
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
}

function timerBreakHandler() {
  tiempo--;
  renderTime();

  if (tiempo === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTasks();
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(tiempo / 60);
  const seconds = parseInt(tiempo % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""} ${minutes}:${
    seconds < 10 ? "0" : ""
  } ${seconds}`;
}

function markCompleted(id) {
  const taskIndex = tasks.findIndex((taks) => taks.id === id);
  tasks[taskIndex].completed = true;
}
