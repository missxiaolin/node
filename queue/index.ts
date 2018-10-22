interface QueueInterface {
    empty();
    size();
    push(value);
    front();
    back();
    pop();
}
class Queue implements QueueInterface {

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
        this.store.pop()
    }

}

export default Queue;