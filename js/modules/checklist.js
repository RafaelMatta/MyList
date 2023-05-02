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

    removeTask (task) {
        const taskIndex = this.#tasks.indexOf(task);
        const animKeys = [
            { opacity: 1, transform: "translateY(0px) scale(1)" },
            { opacity: 0, transform: "translateY(50px) scale(0)" }
        ]
        const animOptions ={ 
            duration: 200,
            iterations: 1,
        }
        
        task.element.animate(animKeys, animOptions);

        this.#tasks.splice(taskIndex,1);
    }

    removeTaskByElement (element) {
        const task = this.searchTaskByHTMLElement(element);
        
        this.removeTask(task);
    }

    changeTaskStatus (element) {
        const task = this.searchTaskByHTMLElement(element);

        task.status = task.status === 'todo' ? 'finished' : 'todo';
    }

    searchTaskByHTMLElement (element) {
        return this.#tasks.find(t => t.element === element);
    }

    sortTasks(tasks) {
        return tasks.sort((ta , tb) => ta.position - tb.position);
    }
}
    