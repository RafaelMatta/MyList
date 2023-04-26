export default class Checklist {
    #idNumber;
    #id;
    #name;
    #tasks;

    constructor (name) {
        this.#idNumber = this.#generateIDNumber();
        this.#tasks = [];
        this.name = name;
    }

    get name () {
        return this.#name;
    }

    set name (name) {
        this.#name = name;
        this.#setID();
    }

    get todo () {
        return this.#tasks.filter(t => t.status === 'to do');
    }

    get finished () {
        return this.#tasks.filter(t => t.status === 'finished');
    }

    get id () {
        return this.#id;
    }
    
    #setID () {
        this.#id = `${this.#name}${this.#idNumber}`;
    }
    
    #generateIDNumber () {
        return '#' + `${Math.trunc(Math.random() * 10000)}`.padStart(4,0);
    }
    
    addTask (task) {
        this.#tasks.push(task);
    }
    
    removeTask (task) {
        this.#tasks.splice(this.#tasks.findIndex(t => t.name === task.name), 1)
    }
}