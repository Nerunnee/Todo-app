const inputs = document.querySelector("#input");
const addElement = document.querySelector("#add");
const taskContainer = document.querySelector("#task-container");
const showAll = document.querySelector("#showAll");
const showActive = document.querySelector("#showActive");
const showCompleted = document.querySelector("#showCompleted");
const taskCompleted = document.querySelector("#task-completed");

let tasks = [];
let taskId = 1;

const add = () => {
  const taskText = inputs.value;
  if (!taskText) return;

  const task = {
    id: taskId,
    text: taskText,
    isComplete: false,
  };

  tasks.push(task);

  taskId++;

  clearInput();
  renderTasks(tasks);
  updateCompletedCount();
};

const renderTasks = (tasks) => {
  let taskElenmentsHTML = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    taskElenmentsHTML += taskElement;
  });

  taskContainer.innerHTML = taskElenmentsHTML;
};

const createTaskElement = (task) => {
  return `
    <div class="task-container">
      <div class="task-box">
          <input type="checkbox" name="checkbox" class="task__checkbox"  ${
            task.isComplete ? "checked" : ""
          } onclick="toggleCompleted(${task.id})"/>
           <p class="task__text ${
             task.isComplete ? "task__text--complete" : ""
           }" >${task.text}</p>
      </div>       
      <button class="task__delete" onclick="deleteTask(${
        task.id
      })">delete</button>
    </div>`;
};

const clearInput = () => {
  inputs.value = "";
};

const onChangeFilter = (filter) => {
  const filteredtasks = tasks.filter((task) => {
    if (filter === "all") return true;

    if (filter === "active") return !task.isComplete;

    if (filter === "completed") return task.isComplete;
  });

  renderTasks(filteredtasks);
};

const toggleCompleted = (taskId) => {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.isComplete = !task.isComplete;
    }
  });

  renderTasks(tasks);
  updateCompletedCount();
};

const deleteTask = (taskId) => {
  const remainingTask = tasks.filter((task) => {
    if (task.id === taskId) {
      return false;
    } else {
      return true;
    }
  });

  tasks = remainingTask;

  renderTasks(tasks);
  updateCompletedCount();
};

const updateCompletedCount = () => {
  const completedCount = tasks.filter((task) => task.isComplete).length;
  const totalCount = tasks.length;

  taskCompleted.innerHTML = `
      <div class="taskCompleted">
        <p class="taskC__text"> ${completedCount} of ${totalCount} tasks completed</p>
        <button onclick="clearCompleted()" class="taskC__delete">Clear completed</button>
      </div>`;
};

const clearCompleted = () => {
  tasks = tasks.filter((task) => !task.isComplete);

  renderTasks(tasks);
  updateCompletedCount();
};

showAll.onclick = () => onChangeFilter("all");
showActive.onclick = () => onChangeFilter("active");
showCompleted.onclick = () => onChangeFilter("completed");

addElement.addEventListener("click", add);
