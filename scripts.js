class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}
let root = null
class Tree {
  constructor(arr) {
    this.arr = arr
  }

  buildTree(arr = this.sortArray(this.arr), start = 0, end = arr.length - 1) {
    if (start > end) {
      // console.log(`Returning null: start (${start}) > end (${end})`);
      return null;
    }
    const sortedArray = this.sortArray(this.arr);
    let mid = Math.floor((start + end) / 2);
    const node = new Node(sortedArray[mid]);
    // console.log(`Creating node with data: ${node.data}`);
    // console.log(`Creating left child: start (${start}), end (${mid - 1})`);
    node.left = this.buildTree(sortedArray, start, mid - 1);
    // console.log(`Creating right child: start (${mid + 1}), end (${end})`);
    node.right = this.buildTree(sortedArray, mid + 1, end);
    // console.log(node);
    return node;
}

  sortArray(array) {
    const sortedArray = this.mergeSort(array)
    let uniqueSortedArray = [...new Set(sortedArray)]
    return uniqueSortedArray
  }
  mergeSort(arr) {
    if (arr.length === 1) {
      return arr
    }
    let half = Math.ceil(arr.length / 2)
    let firstHalf = arr.slice(0, half)
    let secondHalf = arr.slice(half)
    return this.merge(this.mergeSort(firstHalf), this.mergeSort(secondHalf))
  }
  merge(firstHalf, secondHalf) {
    const arr = []
    while (firstHalf.length && secondHalf.length)
      if (firstHalf[0] <= secondHalf[0]) {
        arr.push(firstHalf.shift())
      } else {
        arr.push(secondHalf.shift())
      }
    return arr.concat(firstHalf.slice().concat(secondHalf.slice()))
  }

  prettyPrint (node = this.buildTree(), prefix = '', isLeft = true) {
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
		const arr = this.arr
		const n = arr.length
		root = this.buildTree(this.arr, 0, n - 1);
  }
	insert(value) {

	}
}

const test = new Tree([1,2,3,4,5])
test.prettyPrint()
