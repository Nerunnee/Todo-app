const inputs = document.querySelector("#input");
const addElement = document.querySelector("#add");
const taskContainer = document.querySelector("#task-container");

const tasks = [];

let taskId = 1;

const add = () => {
  const todoText = inputs.value;

  const task = {
    id: taskId,
    text: todoText,
    isComplete: false,
  };

  tasks.push(task);

  taskId++;

  clearInput();
  renderTasks();
};

const renderTasks = () => {
  let taskElenmentsHTML = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    taskElenmentsHTML += taskElement;
  });

  console.log(taskElenmentsHTML);
  taskContainer.innerHTML = taskElenmentsHTML;
};

const createTaskElement = (task) => {
  return `<div class="task">
    <input type="checkbox" name="checkbox" class="task__checkbox" ${
      task.isComplete && "checked"
    }/>
    <p class="task__text">${task.text}</p>
    <button class="task__delete">delete</button>
    </div>`;
};

const clearInput = () => {
  inputs.value = "";
};

addElement.addEventListener("click", add);
