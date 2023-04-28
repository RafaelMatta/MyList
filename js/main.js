import Checklist from './modules/checklist.js';
import Task from './modules/task.js';

const divContent = document.querySelector('.checklist__content');
const listSidebar = document.querySelector('.sidebar__list');
const listTodo = document.getElementById('tasks-todo');
const listFinished = document.getElementById('tasks-finished');

const btnAddTask = document.getElementById('add-task');
const btnAddChecklist = document.getElementById('add-list');
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
    listTasks(currentChecklist.todo, listTodo);
    listTasks(currentChecklist.finished, listFinished);    
}

const listTasks = function (tasks, listElement) {
    listElement.innerHTML = '';
    tasks.forEach(task => {
        listElement.insertAdjacentElement('beforeend', task.element)
        task.element.querySelector('.task__name').value = task.name;
        console.log('a');
    });
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

const updateFocus = function () {
    if (!checklists.length) return;
    removeFocus();
    
    sidebarButtons.item(checklists.indexOf(currentChecklist))
    .classList.add('sidebar__button--active');;
}

const removeFocus = function () {
    sidebarButtons.forEach(btn => btn.classList.remove('sidebar__button--active'));
}

const updateSidebarList = function () {
    loadSidebarList();
    updateFocus();
    loadChecklist();
}

const createTaskElement = function() {
    const taskElement = document.createElement('li');
    listTodo.insertAdjacentElement('beforeend', taskElement);
    taskElement.classList.add('task');
    taskElement.innerHTML = `
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

    return taskElement;
}

listSidebar.addEventListener('click', (e) => {
    const sidebarButton = e.target.closest('.sidebar__button');

    if(sidebarButton) currentChecklist = checklists[sidebarButton.dataset.index];

    updateFocus();
    loadChecklist();
})

btnAddChecklist.addEventListener('click', () => {
    addChecklist();
    updateSidebarList();
    document.querySelector('.checklist__name').focus();
})

btnRemoveList.addEventListener('click', () => {
    removeChecklist();
    updateSidebarList();
})

btnAddTask.addEventListener('click', () => {
    const task = new Task(createTaskElement());
    task.position = listTodo.querySelectorAll('.task').length;
    currentChecklist.addTask(task);
    
    task.element.querySelector('.task__name').focus();
})

inputChecklistName.addEventListener('focusout', () => {
    currentChecklist.name = inputChecklistName.value;
})

divContent.addEventListener('click', (e) => {
    const task = e.target.closest('.task');
    const btnRemove = e.target.closest('#remove-task');
      
    if (btnRemove) {
        currentChecklist.removeTask(task);
        loadTasks();
    }

})

divContent.addEventListener('focusout', (e) => {
    const task = currentChecklist.searchTaskByHTMLElement(e.target.closest('.task'));
    const inputName = e.target.closest('.task__name');

    if(inputName) task.name = inputName.value;
})



