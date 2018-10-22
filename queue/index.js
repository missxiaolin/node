"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = (function () {
    function Queue() {
        this.store = [];
    }
    Queue.prototype.empty = function () {
        return this.store.length === 0;
    };
    Queue.prototype.size = function () {
        return this.store.length;
    };
    Queue.prototype.push = function (value) {
        this.store.push(value);
    };
    Queue.prototype.front = function () {
        if (this.empty()) {
            return null;
        }
        return this.store[0];
    };
    Queue.prototype.back = function () {
        if (this.empty()) {
            return null;
        }
        var index = this.store.length - 1;
        return this.store[index];
    };
    Queue.prototype.pop = function () {
        this.store.pop();
    };
    return Queue;
}());
exports.default = Queue;
