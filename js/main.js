import Checklist from './modules/checklist.js';
import Task from './modules/task.js';

const listSidebar = document.querySelector('.sidebar__list');
const listTodo = document.getElementById('tasks-todo');
const listFinished = document.getElementById('tasks-finished');

const btnAddTask = document.getElementById('add-task');
const btnAddList = document.getElementById('add-list');
const btnRemoveList = document.getElementById('remove-list');
const inputChecklistName = document.querySelector('.checklist__name');

let sidebarButtons = [];
let checklists = [];
let currentChecklist = {};

const loadSidebarList = function () {
    listSidebar.innerHTML = '';
    checklists.forEach((_, index) => {
        listSidebar.insertAdjacentHTML('beforeend', `
        <li class="sidebar__item">
            <button class="button sidebar__button" data-index="${index}">
                <i class="icon sidebar__icon fa-solid fa-scroll fa-1x"></i>
            </button>
        </li>
        `)
    })
    sidebarButtons = document.querySelectorAll('.sidebar__item .sidebar__button');
}

const loadChecklistName = function () {
    inputChecklistName.value = currentChecklist.name;
}

const loadTasks = function () {
    listTodo.innerHTML = '';
    listFinished.innerHTML = '';
    currentChecklist.sortTasks();
    currentChecklist.todo.forEach(task => listTodo.insertAdjacentElement('beforeend', task.element));

    currentChecklist.finished.forEach(task => listFinished.insertAdjacentElement('beforeend', task.element));
}

const loadChecklist = function () {
    loadChecklistName();
    loadTasks();
}

const addChecklist = function () {
    const checklist = new Checklist();
    checklists.push(checklist);
    currentChecklist = checklist;
}

const removeChecklist = function () {
    const currentIndex = checklists.indexOf(currentChecklist);
    checklists.splice(currentIndex,1);

    if (currentIndex === checklists.length)
        currentChecklist = checklists[currentIndex - 1];
    else 
        currentChecklist = checklists[currentIndex];
}

const removeFocus = function () {
    sidebarButtons.forEach(btn => btn.classList.remove('sidebar__button--active'));
}

const updateFocus = function () {
    if (!checklists.length) return;
    removeFocus();
    
    sidebarButtons.item(checklists.indexOf(currentChecklist))
    .classList.add('sidebar__button--active');;
}

const updateSidebarList = function () {
    loadSidebarList();
    updateFocus();
    loadChecklist();
}

listSidebar.addEventListener('click', (e) => {
    const sidebarButton = e.target.closest('.sidebar__button');

    if(sidebarButton) currentChecklist = checklists[sidebarButton.dataset.index];

    updateFocus();
    loadChecklist();
})

btnAddList.addEventListener('click', () => {
    addChecklist();
    updateSidebarList();
})

btnRemoveList.addEventListener('click', () => {
    removeChecklist();
    updateSidebarList();
})

btnAddTask.addEventListener('click', () => {
    const task = new Task();
    const elementTask = document.createElement('li');

    listTodo.insertAdjacentElement('beforeend', elementTask);
    elementTask.classList.add('task');
    elementTask.innerHTML = `
    <div class="task__check">
      <div class="checkbox task__checkbox">
        <input
          type="checkbox"
          class="input checkbox__input"
          id="checkbox-input"
        />
        <label for="checkbox-input" class="checkbox__label">
          <div class="checkbox__box"></div>
        </label>
      </div>
    </div>

    <div class="task__information">
      <input
        type="text"
        placeholder="Untitled"
        class="input input--text task__name"
      />

      <button class="button task__button" id="remove-task">
        <i class="icon fa-solid fa-trash fa-sm"></i>
      </button>
    </div>`;

    task.element = elementTask;
    task.position = listTodo.querySelectorAll('.task').length;
    currentChecklist.addTask(task);
    
    elementTask.querySelector('.task__name').focus();
})

inputChecklistName.addEventListener('focusout', () => {
    currentChecklist.name = inputChecklistName.value;
})

listTodo.addEventListener('click', (e) => {
    const targetTask = e.target.closest('.task');
    const btnRemove = e.target.closest('#remove-task');
            
    if (btnRemove){
        currentChecklist.removeTask(currentChecklist.todo
            .find(t => t.element === targetTask));
    }

    loadTasks();
    // const task = currentChecklist.todo.find(t => t.element === targetTask);

})




