export default class Checklist {
    #name;
    #todo;
    #finished;

    constructor () {
        this.#todo = [];
        this.#finished = [];
        this.name = '';
    }

    get name () {
        return this.#name;
    }

    set name (name) {
        this.#name = name;
    }

    get todo () {
        return this.#todo;
    }

    get finished () {
        return this.#finished;
    }

    #addTodo (task) {
        this.#todo.push(task);
    }

    #addFinished (task) {
        this.#finished.push(task);
    }
    
    addTask (task) {
        if (task.status === 'todo') this.#todo.push(task);
        else this.#finished.push(task);   
    }

    removeTask (task) {
        if (task.status === 'todo') this.#todo.splice(this.#todo.indexOf(task),1);
        else this.#finished.splice(this.#finished.indexOf(task),1);
    }

    sortTasks () {
        this.#todo.sort((ta , tb) => ta.position - tb.position);
    }

    searchTaskByHTMLElement () {
        return
    }
}
    