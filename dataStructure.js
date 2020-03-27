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
    head = null;
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
            current = current.next;
        }
        return current.data;
    }

    indexOf(data) {
        var current = this.head;
        var index = 0;
        while (current) {
            if ((current.data = data)) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    update(position, newData) {
        if (position < 0 || position >= this.length) return false;
        var current = this.head;
        var index = 0;
        while (index++ < position) {
            current = current.next;
        }
        current.data = newData;
        return true;
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) return false;

        if (position === 0) {
            this.head = this.head.next;
        } else {
            var index = 0;
            var current = this.head;
            var previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
            this.length -= 1;
        }
    }

    remove(data) {
        var position = this.indexOf(data);
        this.removeAt(position);
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }
}
// class Node {
//     constructor(data) {
//         this.data = data;
//         this.next = null;
//     }
// }

// 双向链表
class DoublyLinkList {
    head = null;
    tail = null;
    length = 0;

    append(data) {
        var node = new Node(data);
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    insert(position, data) {
        if (position < 0 || position > this.length) return;
        var node = new Node(data);
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
            this.length++;
            return;
        }
        if (position === 0) {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        } else if (position === this.length) {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        } else {
            var index = 0;
            var current = this.head;
            var previous = null;
            var next = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
                next = current.next;
            }
            node.prev = previous;
            node.next = current;
            previous.next = node;
            next.prev = node;
        }
        this.length++;
    }

    get(position) {
        if (position < 0 || position >= this.length) return null;

        var current = this.head;
        var index = 0;
        while (index++ < position) {
            current = current.next;
        }
        return current.data;
    }

    indexOf(data) {
        var current = this.head;
        var index = 0;
        while (current) {
            if ((current.data = data)) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    update(position, newData) {
        if (position < 0 || position >= this.length) return false;
        var current = this.head;
        var index = 0;
        while (index++ < position) {
            current = current.next;
        }
        current.data = newData;
        return true;
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) return false;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length--;
            return;
        }

        if (position === 0) {
            this.head.next.prev = null;
            this.head = this.head.next;
        } else if (position === this.length) {
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        } else {
            var index = 0;
            var current = this.head;
            var previous = null;
            var next = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
                next = current.next;
            }
            previous.next = next;
            next.prev = previous;
            this.length--;
        }
    }

    remove(data) {
        var position = this.indexOf(data);
        this.removeAt(position);
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }
}
// class Node {
//     constructor(data) {
//         this.data = data;
//         this.prev = null;
//         this.next = null;
//     }
// }

// 集合
class Set {
    items = {};

    has(value) {
        return this.items.hasOwnProperty(value);
    }

    add(value) {
        if (this.has(value)) return;
        this.items[value] = value;
    }

    remove(value) {
        if (this.has(value)) {
            delete this.items[value];
        }
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    values() {
        return Object.keys(this.items);
    }

    union(otherSet) {
        var unionSet = new Set();
        var values = this.values();
        for (var index = 0; index < values.length; index++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for (var index = 0; index < values.length; index++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    }

    intersection(otherSet) {
        var intersectionSet = new Set();
        var values = this.values();
        for (var index = 0; index < values.length; index++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    difference(otherSet) {
        var differenceSet = new Set();
        var values = this.values();
        for (var index = 0; index < values.length; index++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    }

    subset() {
        var subsetSet = new Set();
        var values = this.values();
        for (var index = 0; index < values.length; index++) {
            if (!otherSet.has(values[i])) {
                return false;
            }
        }
        return true;
    }
}

// 哈希表
class HashTable {
    storage = [];
    count = 0;
    limit = 7;

    hashFunc(str, size) {
        var hashCode = 0;
        for (var i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i);
        }
        return hashCode % size;
    }

    isPrime(num) {
        var temp = +Math.sqrt(num);
        for (var i = 0; i = < temp; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    put(key, value) {
        var index = this.hashFunc(key, this.limit);
        var bucket = this.storage[index];
        if (bucket === null) {
            bucket = [];
            this.storage[index] = bucket;
        }
        for (let i = 0; i < bucket.length; i++) {
            var item = bucket[i];
            if (item[0] === key) {
                item[1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.count++;

        if (this.count > this.limit * 0.75) {
            var newPrime = new getPrime(this.limit * 2);
            this.resize(newPrime);
        }
    }

    get(key) {
        var index = this.hashFunc(key, this.limit);
        var bucket = this.storage[index];
        if (bucket === null) {
            return null;
        }
        for (let i = 0; i < bucket.length; i++) {
            var item = bucket[i];
            if (item[0] === key) {
                return item[1];
            }
        }
        return null;
    }

    remove(key) {
        var index = this.hashFunc(key, this.limit);
        var bucket = this.storage[index];
        if (bucket === null) {
            return;
        }
        for (let i = 0; i < bucket.length; i++) {
            var item = bucket[i];
            if (item[0] === key) {
                bucket.splice(i, 1);
                this.count--;
                if (this.limit > 7 && this.count < this.limit * 0.25
                    var newPrime = new getPrime(~~(this.limit / 2));
                this.resize(newPrime);
            }
            return;
        }
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    resize(newLimt) {
        var oldStorage = this.storage;
        this.storage = [];
        this.count = 0;
        this.limit = newLimt;

        for (var i = 0; i < oldStorage.length; i++) {
            var bucket = oldStorage[i];
            if (bucket === null) {
                continue;
            }
            for (var j = 0; j < bucket.length; j++) {
                var item = bucket[j];
                this.put(item[0], item[1]);
            }
        }
    }

    getPrime(num) {
        while (!this.isPrime(num)) {
            num++;
        }
        return num;
    }
}

// 二叉搜索数
class BinarySerachTree {
    root = null;

    insert(key) {
        var node = new Node(key);
        if (this.root === null) {
            this.root = node;
        } else {
            this.insertNode(this.root, newNode);
        }
    }
    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 先序遍历
    preOrderTraversal(callback) {
        this.preOrderTraversalNode(this.node, callback);
    }
    preOrderTraversalNode(node, callback) {
        if (node !== null) {
            callback(node.key);
            this.preOrderTraversalNode(node.left, callback);
            this.preOrderTraversalNode(node.right, callback);
        }
    }

    min() {
        var node = this.root;
        var key = node.key;
        while (node !== null) {
            key = node.key;
            node = node.left;
        }
        return key;
    }

    max() {
        var node = this.root;
        var key = node.key;
        while (node != null) {
            key = node.key;
            node = node.right;
        }
        return key;
    }

    seach(key) {
        var node = this.root;
        while (node !== null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        var current = this.root;
        var parent = null;
        var isLeftChild = true;

        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }
            if (current === null) return false;
        }

        if (current.left === null && current.right = null) {
            if (current === this.root) {
                this.root = null;
            } else {
                isLeftChild ? parent.left = null : parent.right = null;
            }
        } else if (current.right === null || current.left === null) {
            if (current === this.root) {
                this.root = isLeftChild ? current.left : current.right;
            } else {
                isLeftChild ? parent.left = null : parent.right = null;
            }
        } else {
            var successor = this.getSuccessor(current);
            if (current === this.root) {
                this.root = successor;
            } else if (isLeftChild) {
                parent.left = successor;
            } else {
                parent.right = successor;
            }

            successor.left = current.left;
        }

    }
    getSuccessor(delNode) {
        var successor = delNode;
        var current = delNode.right;
        var successorParent = delNode;

        while (current !== null) {
            successorParent = successor;
            successor = current;
            current = current.left;
        }

        if (successor !== delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }

        return successor;
    }

}
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
