interface QueueInterface {
    empty();
    size();
    push(value);
    pop();
}
export class Queue implements QueueInterface {

    store = [];

    empty() {
        return this.store.length === 0;
    }

    size() {
        return this.store.length;
    }

    push(value) {
        this.store.push(value);
    }

    front() {
        if (this.empty()) {
            return null;
        }
        return this.store[0];
    }

    back() {
        if (this.empty()) {
            return null;
        }
        const index = this.store.length - 1;
        return this.store[index];
    }

    pop() {
        this.store.shift();
    }

}

export class Stack implements QueueInterface {

    store = [];

    empty() {
        return this.store.length === 0;
    }

    size() {
        return this.store.length;
    }

    push(value: any) {
        this.store.push(value);
    }

    pop() {
        this.store.pop();
    }

    top() {
        if (this.empty()) {
            return null;
        }
        const index = this.store.length - 1;
        return this.store[index];
    }

}

