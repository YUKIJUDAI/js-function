// 栈
class Stack {
    items = [];

    push(element) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

}

// 队列
class Queue {
    items = [];

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// 优先级队列
class PriorityQueue {
    items = [];

    enqueue(element, priority) {
        var queueElement = new QueueElement(element, priority);
        if (this.items.length === 0) {
            this.items.push(queueElement);
        } else {
            var flag = false;
            for (var index = 0; index < this.items.length; index++) {
                if (queueElement.priority < this.items[index].priority) {
                    this.items.splice(index, 0, queueElement);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.items.push(queueElement);
            }
        }
    }
    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}
class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

// 单项列链表
class LinkedList {
    head1 = null;
    length = 0;

    append(data) {
        var node = new Node(data);
        if (this.length === 0) {
            this.head = node;
        } else {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    insert(position, data) {
        if (position < 0 || position > this.length) return;
        var node = new Node(data);
        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            var index = 0;
            var current = this.head;
            var previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        this.length++;
    }

    get(position) {
        if (position < 0 || position >= this.length) return null;

        var current = this.head;
        var index = 0;
        while (index++ < position) {
            current = current.data;
        }
        return current.data;
    }
}
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}