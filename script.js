const inputs = document.querySelector("#input");
const addElement = document.querySelector("#add");
const taskContainer = document.querySelector("#task-container");
const showAll = document.querySelector("#showAll");
const showActive = document.querySelector("#showActive");

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
  // all();
  active();
};

const renderTasks = () => {
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
      <div  class="task-box">
       <input type="checkbox" name="checkbox" class="task__checkbox" ${
         task.isComplete && "checked"
       }/>
      <p class="task__text">${task.text}</p>
      </div>              
      <button class="task__delete">delete</button>
    </div>
    `;
};

const clearInput = () => {
  inputs.value = "";
};

addElement.addEventListener("click", add);

// const all = showAll.reduce((acc, taskId) => (acc += taskId), 0);

const active = showActive.filter((tasks) => {
  if (tasks.id === "checked") {
    return true;
  } else {
    return false;
  }
});

showActive.addEventListener("click", active);
