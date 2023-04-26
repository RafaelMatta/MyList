export default class Task {
    #name = '';
    #status = '';

    constructor (name, status) {
        this.name = name;
        this.status = status;
    }

    get name () {
        return this.#name;
    }

    set name (name) {
        this.#name = name;
    }

    get status () {
        return this.#status;
    }

    set status (status) {
        this.#status = status
    }
}