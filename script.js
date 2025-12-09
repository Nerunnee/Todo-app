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
            task.isComplete && "checked"
          } onclick="completedTask(${task.id})"/>
           <p class="task__text ${
             task.isComplete && "task__text--complete"
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
    if (filter === "all") {
      return true;
    }

    if (filter === "active") {
      return task.isComplete === false;
    }
    if (filter === "completed") {
      return task.isComplete === true;
    }
  });

  renderTasks(filteredtasks);
};

const completedTask = (id) => {
  tasks.forEach((task) => {
    if (task.id === id) {
      task.isComplete = !task.isComplete;
    }
  });
  renderTasks(tasks);
};

const deleteTask = (taskId) => {
  // const remainingTasks = tasks.filter((task) => task.id !== taskId);
  // tasks.length = 0;
  // tasks.push(...remainingTasks);
  const remainingTask = tasks.filter((task) => {
    if (task.id === taskId) {
      return false;
    } else {
      return true;
    }
  });

  tasks = remainingTask;

  renderTasks(tasks);
};

showAll.onclick = () => onChangeFilter("all");
showActive.onclick = () => onChangeFilter("active");
showCompleted.onclick = () => onChangeFilter("completed");

addElement.addEventListener("click", add);

const updateCompletedCount = () => {
  // const completedCount = tasks.filter((task) => {
  //   if (task.isComplete == true) {
  //     return completedCount;
  //   } else {
  //     return 0;
  //   }
  // });

  const completedCount = tasks.filter((task) => task.isComplete).length;
  const totalCount = tasks.length;

  taskCompleted.innerHTML = `
      <div class="taskCompleted">
        <p> ${completedCount} of ${totalCount} tasks completed</p>
        <button>Clear completed</button>
      </div>`;
};

const clearCompleted = () => {
  tasks = tasks.filter((task) => !task.isComplete);
  renderTasks(tasks);
  updateCompletedCount();
};

const checkCompletedTask = (id) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, isComplete: !task.isComplete } : task
  );

  renderTasks(tasks);
  updateCompletedCount();
};
