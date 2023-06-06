class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr)
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null
    }
    let mid = Math.floor((start + end) / 2)
    const node = new Node(arr[mid])
    node.left = this.buildTree(arr, start, mid - 1)
    node.right = this.buildTree(arr, mid + 1, end)
    return node
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }

  insert(value, node = this.root) {
    if (this.root === null) {
      this.root = new Node(value)
      return
    }
    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value)
      } else {
        this.insert(value, node.left)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(value)
      } else {
        this.insert(value, node.right)
      }
    }
  }

  minValue(node) {
    let current = node
    while (current.left !== null) {
      current = current.left
    }
    return current.data
  }

  delete(value) {
    this.root = this.deleteRec(this.root, value)
  }

  deleteRec(node, key) {
    if (node === null) {
      return node
    }
    if (key < node.data) {
      node.left = this.deleteRec(node.left, key)
    } else if (key > node.data) {
      node.right = this.deleteRec(node.right, key)
    } else {
      if (node.left === null) {
        return node.right
      } else if (node.right === null) {
        return node.left
      }
      node.data = this.minValue(node.right)
      node.right = this.deleteRec(node.right, node.data)
    }
    return node
  }
	find(key, currentNode = this.root) {
		if (currentNode === null) {
			return null;  // If the tree is empty or we've hit a leaf node, the key is not present.
		}
		if (key === currentNode.data) {
			return currentNode;  // We've found the key.
		} else if (key < currentNode.data) {
			return this.find(key, currentNode.left);  // The key must be in the left subtree.
		} else {  // key > currentNode.data
			return this.find(key, currentNode.right);  // The key must be in the right subtree.
		}
	}

	levelOrder(fn){
		if(this.root === null) {
			return null
		}
		let queue = []; // create a new queue
		let result = []; // to store the nodes in BFS order

		queue.push(this.root); // enqueue the root node

	}
}

const test = new Tree([2, 4, 6, 8, 10])
test.find(4)
