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
        this.root = new Node(value);
        return;
    }
    if (value < node.data) {
        if (node.left === null) {
            node.left = new Node(value);
        } else {
            this.insert(value, node.left);
        }
    } else {
        if (node.right === null) {
            node.right = new Node(value);
        } else {
            this.insert(value, node.right);
        }
    }
    this.rebalance();
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
      return null
    }
    if (key === currentNode.data) {
      return currentNode
    } else if (key < currentNode.data) {
      return this.find(key, currentNode.left)
    } else {
      return this.find(key, currentNode.right)
    }
  }

  levelOrder(fn) {
    if (this.root === null) {
      return null
    }
    let queue = []
    let result = []
    queue.push(this.root)
    while (queue.length > 0) {
      let current = queue.shift()
      if (fn) {
        fn(current)
      } else {
        result.push(current.data)
      }
      if (current.left) {
        queue.push(current.left)
      }
      if (current.right) {
        queue.push(current.right)
      }
    }
    if (!fn) {
      return result
    }
  }

  inorder(fn, node = this.root) {
    if (node === null) {
      return []
    }
    let result = []
    result = result.concat(this.inorder(fn, node.left))
    if (fn) {
      fn(node)
    } else {
      result.push(node.data)
    }
    result = result.concat(this.inorder(fn, node.right))
    return result
  }

  preorder(fn, node = this.root) {
    if (node === null) {
      return []
    }
    let result = []
    if (fn) {
      fn(node)
    } else {
      result.push(node.data)
    }
    result = result.concat(this.preorder(fn, node.left))
    result = result.concat(this.preorder(fn, node.right))
    return result
  }

  postorder(fn, node = this.root) {
    if (node === null) {
      return []
    }
    let result = []
    result = result.concat(this.postorder(fn, node.left))
    result = result.concat(this.postorder(fn, node.right))
    if (fn) {
      fn(node)
    } else {
      result.push(node.data)
    }
    return result
  }

  height(node) {
    if (node === null) {
      return -1
    } else {
      let leftHeight = this.height(node.left)
      let rightHeight = this.height(node.right)
      return 1 + Math.max(leftHeight, rightHeight)
    }
  }

  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) {
      return -1
    }

    if (node.data === value) {
      return currentDepth
    }

    let left = this.depth(value, node.left, currentDepth + 1)
    if (left !== -1) {
      return left
    }
    return this.depth(value, node.right, currentDepth + 1)
  }

  isBalanced(node = this.root) {
    return this.checkBalance(node) !== -1
  }

  checkBalance(node) {
    if (node === null) {
        return 0; 
    }

    let leftHeight = this.checkBalance(node.left);
    let rightHeight = this.checkBalance(node.right);

    if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    let values = [...this.inorder()];
    this.root = this.buildTree(values, 0, values.length - 1);
  }
}

function randomArray(length, max) {
  return Array.from({ length: length }, () => Math.floor(Math.random() * max));
}

let randomNumbers = randomArray(10, 100);
let tree = new Tree(randomNumbers.sort((a, b) => a - b));

console.log('Is the tree balanced? ', tree.isBalanced());

console.log('Level order: ', tree.levelOrder());
console.log('Preorder: ', tree.preorder());
console.log('Postorder: ', tree.postorder());
console.log('Inorder: ', tree.inorder());

tree.insert(101);
tree.insert(102);
tree.insert(103);

console.log('Is the tree balanced? ', tree.isBalanced());

tree.rebalance();

console.log('Is the tree balanced? ', tree.isBalanced());

console.log('Level order: ', tree.levelOrder());
console.log('Preorder: ', tree.preorder());
console.log('Postorder: ', tree.postorder());
console.log('Inorder: ', tree.inorder());
