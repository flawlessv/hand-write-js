class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
  
    constructor(value: T) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree<T> {
    root: TreeNode<T> | null;
  
    constructor() {
      this.root = null;
    }
  
    insert(value: T): void {
      const newNode = new TreeNode(value);
  
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
      if (newNode.value < node.value) {
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
  
    search(value: T): boolean {
      return this.searchNode(this.root, value);
    }
  
    private searchNode(node: TreeNode<T> | null, value: T): boolean {
      if (node === null) {
        return false;
      }
  
      if (value === node.value) {
        return true;
      }
  
      if (value < node.value) {
        return this.searchNode(node.left, value);
      } else {
        return this.searchNode(node.right, value);
      }
    }
  
    inOrderTraversal(): T[] {
      const result: T[] = [];
  
      this.inOrderTraversalNode(this.root, result);
  
      return result;
    }
  
    private inOrderTraversalNode(node: TreeNode<T> | null, result: T[]): void {
      if (node !== null) {
        this.inOrderTraversalNode(node.left, result);
        result.push(node.value);
        this.inOrderTraversalNode(node.right, result);
      }
    }
  }
  
  // Usage example
  const bst = new BinarySearchTree<number>();
  
  bst.insert(8);
  bst.insert(3);
  bst.insert(10);
  bst.insert(1);
  bst.insert(6);
  bst.insert(14);
  bst.insert(4);
  bst.insert(7);
  bst.insert(13);
  
  console.log(bst.inOrderTraversal()); // Output: [1, 3, 4, 6, 7, 8, 10, 13, 14]
  console.log(bst.search(6)); // Output: true
  console.log(bst.search(9)); // Output: false