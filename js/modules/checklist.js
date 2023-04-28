export default class Checklist {
    #name;
    #tasks;

    constructor () {
        this.#tasks = [];
        this.name = '';
    }

    get name () {
        return this.#name;
    }

    set name (name) {
        this.#name = name;
    }

    get todo () {
        return this.sortTasks(this.#tasks.filter(t => t.status === 'todo'));
    }
    
    get finished () {
        return this.sortTasks(this.#tasks.filter(t => t.status === 'finished'));
    }

    addTask (task) {
        this.#tasks.push(task);
    }

    removeTask (element) {
        const task = this.searchTaskByHTMLElement(element);
        const taskIndex = this.#tasks.indexOf(task);
        
        this.#tasks.splice(taskIndex,1);
    }

    searchTaskByHTMLElement (element) {
        return this.#tasks.find(t => t.element === element);
    }

    sortTasks(tasks) {
        return tasks.sort((ta , tb) => ta.position - tb.position);
    }
}
    