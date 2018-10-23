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
        this.store.shift();
    };
    return Queue;
}());
exports.Queue = Queue;
var Stack = (function () {
    function Stack() {
        this.store = [];
    }
    Stack.prototype.empty = function () {
        return this.store.length === 0;
    };
    Stack.prototype.size = function () {
        return this.store.length;
    };
    Stack.prototype.push = function (value) {
        this.store.push(value);
    };
    Stack.prototype.pop = function () {
        this.store.pop();
    };
    Stack.prototype.top = function () {
        if (this.empty()) {
            return null;
        }
        var index = this.store.length - 1;
        return this.store[index];
    };
    return Stack;
}());
exports.Stack = Stack;
