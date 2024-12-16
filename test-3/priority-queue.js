class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  push(element, priority) {
    const newNode = { element, priority };
    let added = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].priority > priority) {
        this.queue.splice(i, 0, newNode);
        added = true;
        break;
      }
    }
    if (!added) this.queue.push(newNode);
  }

  pop() {
    if (this.queue.length === 0) {
      return null;
    }
    return this.queue.shift().element;
  }

  length() {
    return this.queue.length;
  }
}

exports.PriorityQueue = PriorityQueue;
