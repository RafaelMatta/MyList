import Checklist from './modules/checklist.js';
import Task from './modules/task.js';

const sidebarList = document.querySelector('.sidebar__list');
const btnAddList = document.getElementById('add-list');
const inputChecklistName = document.querySelector('.checklist__name');

let sidebarButtons = [];
let checklists = [];
let currentChecklist = {};

const loadSidebarList = function () {
    sidebarList.innerHTML = '';
    checklists.forEach((_, index) => {
        sidebarList.insertAdjacentHTML('beforeend', `
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

}

const loadChecklist = function () {
    
}

const addChecklist = function () {
    const checklist = new Checklist('Untitled');
    checklists.push(checklist);
    currentChecklist = checklist;
}

const removeChecklist = function (checklist) {
    checklists.splice(checklists.findIndex(list => list.id === checklist.id),1);
}

const removeFocus = function () {
    sidebarButtons.forEach(btn => btn.classList.remove('sidebar__button--active'));
}

const updateFocus = function () {
    removeFocus();
    sidebarButtons.item(checklists.indexOf(currentChecklist))
    .classList.add('sidebar__button--active');;
}




sidebarList.addEventListener('click', (e) => {
    const sidebarButton = e.target.closest('.sidebar__button');
    currentChecklist = checklists[sidebarButton.dataset.index];
    loadChecklistName();
    
    updateFocus();
})

btnAddList.addEventListener('click', () => {
    addChecklist();
    loadSidebarList();
    updateFocus();
    loadChecklistName();
})






