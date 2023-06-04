class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}
const root = null
class Tree {
  constructor(arr) {
    this.arr = arr
  }

  buildTree(arr = this.sortArray(this.arr), start = 0, end = arr.length - 1) {
    if (start > end) {
      return null
    }
    const sortedArray = this.sortArray(this.arr)
    let mid = Math.ceil((start + end) / 2)
    const node = new Node(sortedArray[mid])
    node.left = this.buildTree(sortedArray, start, mid - 1)
    node.right = this.buildTree(sortedArray, mid + 1, end)
    console.log(node)
    return node
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

  prettyPrint = (node = this.buildTree(), prefix = '', isLeft = true) => {
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
}

const test = new Tree([3, 1, 4, 2,7,8,2,3,2,1,2,9,5,4,6])
test.prettyPrint()
