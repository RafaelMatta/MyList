export default class Task {
    #position;
    #element;
    #name;
    #status;

    constructor () {
        this.#position = 0;
        this.name = '';
        this.status = 'todo';
    }

    get position () {
        return this.#position;
    }

    set position (position) {
        this.#position = position;
    }

    get element () {
        return this.#element;
    }

    set element (element) {
        this.#element = element;
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