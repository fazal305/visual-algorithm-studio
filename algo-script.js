const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 440;

const COLORS = {
  background: "#0a0a18",
  defaultBar: "#00f5ff",
  comparing: "#f5a623",
  swapping: "#ff3860",
  sorted: "#00ff88",
  current: "#00f5ff",
  minimum: "#bf5fff",
  shifting: "#f5a623",

  queueBox: "#111120",
  queueActive: "#00ff88",
  queueRemove: "#ff3860",
  queueWrap: "#bf5fff",

  stackBox: "#111120",
  stackPush: "#00ff88",
  stackPop: "#ff3860",
  stackTop: "#00f5ff",

  nodeBox: "#111120",
  nodeVisit: "#00f5ff",
  nodeNew: "#00ff88",
  nodeDelete: "#ff3860",
  arrow: "#8c90aa",

  treeNode: "#111120",
  treeVisit: "#f5a623",
  treeFound: "#00ff88",
  treeNew: "#00ff88",
  treeEdge: "#8c90aa",

  gridEmpty: "#111120",
  gridWall: "#05050c",
  gridStart: "#00ff88",
  gridEnd: "#ff3860",
  gridExplore: "#00f5ff",
  gridPath: "#f5ff00",

  text: "#f4f7fb",
  muted: "#8c90aa",
  grid: "#1e1e35"
};

const SPEEDS = {
  slow: 1000,
  medium: 200,
  fast: 50
};

const CATEGORY_ALGORITHMS = {
  SORTING: [
    { label: "Bubble Sort", value: "bubbleSort" },
    { label: "Selection Sort", value: "selectionSort" },
    { label: "Insertion Sort", value: "insertionSort" }
  ],
  QUEUE: [
    { label: "Circular Queue", value: "circularQueue" }
  ],
  STACK: [
    { label: "Stack Push / Pop", value: "stackPushPop" }
  ],
  LINKED_LIST: [
    { label: "Linked List Demo", value: "linkedListDemo" }
  ],
  BINARY_TREE: [
    { label: "BST Insert", value: "bstInsert" },
    { label: "BST Search", value: "bstSearch" },
    { label: "In-order", value: "inOrderTraversal" },
    { label: "Pre-order", value: "preOrderTraversal" },
    { label: "Post-order", value: "postOrderTraversal" }
  ],
  PATHFINDING: [
    { label: "BFS Grid", value: "bfsGrid" }
  ]
};

const ALGORITHM_INFO = {
  bubbleSort: {
    name: "Bubble Sort",
    title: "Bubble Sort Recorder",
    subtitle: "Compare nearby values, swap when needed, and watch the largest values move right.",
    time: "Time: O(n²)",
    space: "Space: O(1)",
    description: "Bubble Sort compares nearby values. Bigger values slowly move right, like bubbles rising to the top."
  },
  selectionSort: {
    name: "Selection Sort",
    title: "Selection Sort Scanner",
    subtitle: "Scan the unsorted area, find the smallest value, then place it in the correct position.",
    time: "Time: O(n²)",
    space: "Space: O(1)",
    description: "Selection Sort repeatedly searches for the smallest value. It then swaps that value into the next sorted position."
  },
  insertionSort: {
    name: "Insertion Sort",
    title: "Insertion Sort Builder",
    subtitle: "Take one value at a time and insert it into the already sorted left side.",
    time: "Time: O(n²)",
    space: "Space: O(1)",
    description: "Insertion Sort builds a sorted section from left to right. Each new value shifts bigger values until it fits."
  },
  circularQueue: {
    name: "Circular Queue",
    title: "Circular Queue Simulator",
    subtitle: "Watch front and rear pointers move through a fixed-size queue and wrap around.",
    time: "Time: O(1)",
    space: "Space: O(n)",
    description: "A circular queue uses a fixed-size array. Rear wraps back to the start when it reaches the end, so empty spaces can be reused."
  },
  stackPushPop: {
    name: "Stack Push / Pop",
    title: "Stack Push / Pop Simulator",
    subtitle: "Watch values enter and leave from the top of a vertical stack.",
    time: "Time: O(1)",
    space: "Space: O(n)",
    description: "A stack follows Last In, First Out. The newest value added to the top is always the first value removed."
  },
  linkedListDemo: {
    name: "Linked List Demo",
    title: "Linked List Pointer Visualizer",
    subtitle: "Watch nodes connect through arrows while insert, search, and delete operations run.",
    time: "Time: O(n)",
    space: "Space: O(n)",
    description: "A linked list stores values in separate nodes. Each node points to the next node instead of sitting beside it in an array."
  },
  bstInsert: {
    name: "BST Insert",
    title: "Binary Search Tree Insert",
    subtitle: "Watch values move left or right until they find the correct empty position.",
    time: "Time: O(log n) avg",
    space: "Space: O(n)",
    description: "A Binary Search Tree places smaller values on the left and larger values on the right. Insert follows comparisons until it finds an empty spot."
  },
  bstSearch: {
    name: "BST Search",
    title: "Binary Search Tree Search",
    subtitle: "Search moves left or right based on comparison with the current node.",
    time: "Time: O(log n) avg",
    space: "Space: O(1)",
    description: "BST search skips large parts of the tree by comparing values. If the target is smaller, go left; if larger, go right."
  },
  inOrderTraversal: {
    name: "In-order Traversal",
    title: "In-order Tree Traversal",
    subtitle: "Visit left subtree, then root, then right subtree.",
    time: "Time: O(n)",
    space: "Space: O(h)",
    description: "In-order traversal visits BST values in sorted order. It uses recursion to fully visit the left side before the current node."
  },
  preOrderTraversal: {
    name: "Pre-order Traversal",
    title: "Pre-order Tree Traversal",
    subtitle: "Visit root first, then left subtree, then right subtree.",
    time: "Time: O(n)",
    space: "Space: O(h)",
    description: "Pre-order traversal is useful when you want to process the current node before its children. It visits root, left, then right."
  },
  postOrderTraversal: {
    name: "Post-order Traversal",
    title: "Post-order Tree Traversal",
    subtitle: "Visit left subtree, then right subtree, then root.",
    time: "Time: O(n)",
    space: "Space: O(h)",
    description: "Post-order traversal processes children before the parent. It is commonly used when deleting or evaluating trees."
  },
  bfsGrid: {
    name: "BFS Grid Pathfinding",
    title: "Breadth-First Search Grid",
    subtitle: "Explore cells level by level until the shortest path is found.",
    time: "Time: O(V + E)",
    space: "Space: O(V)",
    description: "BFS uses a queue to explore nearby cells first. On an unweighted grid, it finds the shortest path from start to end."
  }
};

const appState = {
  activeCategory: "SORTING",
  activeAlgorithm: "bubbleSort",
  inputData: [34, 12, 45, 8, 67, 23],
  steps: [],
  currentStep: 0,
  isPlaying: false,
  speed: "medium",
  playInterval: null
};

const gridState = {
  rows: 10,
  cols: 16,
  startIndex: 17,
  endIndex: 142,
  walls: [35, 36, 37, 53, 69, 85, 101, 102, 103, 104],
  editMode: "start"
};

const canvas = document.getElementById("algorithmCanvas");
const ctx = canvas.getContext("2d");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stepBackBtn = document.getElementById("stepBackBtn");
const stepForwardBtn = document.getElementById("stepForwardBtn");
const resetBtn = document.getElementById("resetBtn");
const randomBtn = document.getElementById("randomBtn");
const applyDataBtn = document.getElementById("applyDataBtn");
const speedSelect = document.getElementById("speedSelect");
const dataInput = document.getElementById("dataInput");

const explanationText = document.getElementById("explanationText");
const stepCounter = document.getElementById("stepCounter");
const dataPills = document.getElementById("dataPills");
const inputError = document.getElementById("inputError");
const algorithmPills = document.getElementById("algorithmPills");

const algorithmTitle = document.getElementById("algorithmTitle");
const algorithmSubtitle = document.getElementById("algorithmSubtitle");
const infoName = document.getElementById("infoName");
const timeComplexity = document.getElementById("timeComplexity");
const spaceComplexity = document.getElementById("spaceComplexity");
const infoDescription = document.getElementById("infoDescription");

/* Sends the selected algorithm to its own step recorder. */
function generateSteps(algorithm, data) {
  if (algorithm === "bubbleSort") return generateBubbleSortSteps(data);
  if (algorithm === "selectionSort") return generateSelectionSortSteps(data);
  if (algorithm === "insertionSort") return generateInsertionSortSteps(data);
  if (algorithm === "circularQueue") return generateCircularQueueSteps(data);
  if (algorithm === "stackPushPop") return generateStackSteps(data);
  if (algorithm === "linkedListDemo") return generateLinkedListSteps(data);
  if (algorithm === "bstInsert") return generateBstInsertSteps(data);
  if (algorithm === "bstSearch") return generateBstSearchSteps(data);
  if (algorithm === "inOrderTraversal") return generateTreeTraversalSteps(data, "inOrder");
  if (algorithm === "preOrderTraversal") return generateTreeTraversalSteps(data, "preOrder");
  if (algorithm === "postOrderTraversal") return generateTreeTraversalSteps(data, "postOrder");
  if (algorithm === "bfsGrid") return generateBfsSteps();

  return [];
}

/* Records Bubble Sort comparison and swap steps. */
function generateBubbleSortSteps(data) {
  const recordedSteps = [];
  const workingData = [...data];
  const sortedIndexes = [];

  recordedSteps.push(createBarStep(workingData, [], [], [], null, null, [], "Starting Bubble Sort."));

  for (let passIndex = 0; passIndex < workingData.length - 1; passIndex++) {
    for (let compareIndex = 0; compareIndex < workingData.length - passIndex - 1; compareIndex++) {
      const leftValue = workingData[compareIndex];
      const rightValue = workingData[compareIndex + 1];

      recordedSteps.push(createBarStep(workingData, [compareIndex, compareIndex + 1], [], sortedIndexes, null, null, [], `Comparing ${leftValue} and ${rightValue}.`));

      if (leftValue > rightValue) {
        workingData[compareIndex] = rightValue;
        workingData[compareIndex + 1] = leftValue;

        recordedSteps.push(createBarStep(workingData, [], [compareIndex, compareIndex + 1], sortedIndexes, null, null, [], `${leftValue} is greater than ${rightValue}, so we swap them.`));
      }
    }

    const sortedIndex = workingData.length - 1 - passIndex;
    sortedIndexes.push(sortedIndex);
    recordedSteps.push(createBarStep(workingData, [], [], sortedIndexes, null, null, [], `${workingData[sortedIndex]} is locked into position.`));
  }

  sortedIndexes.push(0);
  recordedSteps.push(createBarStep(workingData, [], [], sortedIndexes, null, null, [], "Bubble Sort is complete."));

  return recordedSteps;
}

/* Records Selection Sort scan and swap steps. */
function generateSelectionSortSteps(data) {
  const recordedSteps = [];
  const workingData = [...data];
  const sortedIndexes = [];

  recordedSteps.push(createBarStep(workingData, [], [], [], null, null, [], "Starting Selection Sort."));

  for (let startIndex = 0; startIndex < workingData.length - 1; startIndex++) {
    let minimumIndex = startIndex;

    recordedSteps.push(createBarStep(workingData, [], [], sortedIndexes, minimumIndex, startIndex, [], `Assume ${workingData[minimumIndex]} is the smallest value.`));

    for (let scanIndex = startIndex + 1; scanIndex < workingData.length; scanIndex++) {
      recordedSteps.push(createBarStep(workingData, [minimumIndex, scanIndex], [], sortedIndexes, minimumIndex, scanIndex, [], `Comparing ${workingData[minimumIndex]} with ${workingData[scanIndex]}.`));

      if (workingData[scanIndex] < workingData[minimumIndex]) {
        minimumIndex = scanIndex;
        recordedSteps.push(createBarStep(workingData, [], [], sortedIndexes, minimumIndex, scanIndex, [], `${workingData[minimumIndex]} is the new smallest value.`));
      }
    }

    const temp = workingData[startIndex];
    workingData[startIndex] = workingData[minimumIndex];
    workingData[minimumIndex] = temp;

    recordedSteps.push(createBarStep(workingData, [], [startIndex, minimumIndex], sortedIndexes, null, null, [], "Swap the smallest value into the sorted position."));

    sortedIndexes.push(startIndex);
    recordedSteps.push(createBarStep(workingData, [], [], sortedIndexes, null, null, [], `${workingData[startIndex]} is now sorted.`));
  }

  sortedIndexes.push(workingData.length - 1);
  recordedSteps.push(createBarStep(workingData, [], [], sortedIndexes, null, null, [], "Selection Sort is complete."));

  return recordedSteps;
}

/* Records Insertion Sort shift and insert steps. */
function generateInsertionSortSteps(data) {
  const recordedSteps = [];
  const workingData = [...data];

  recordedSteps.push(createBarStep(workingData, [], [], [0], null, 0, [], "Starting Insertion Sort."));

  for (let currentIndex = 1; currentIndex < workingData.length; currentIndex++) {
    const currentValue = workingData[currentIndex];
    let compareIndex = currentIndex - 1;

    recordedSteps.push(createBarStep(workingData, [], [], getRangeIndexes(0, currentIndex - 1), null, currentIndex, [], `Pick up ${currentValue}.`));

    while (compareIndex >= 0 && workingData[compareIndex] > currentValue) {
      recordedSteps.push(createBarStep(workingData, [compareIndex, compareIndex + 1], [], getRangeIndexes(0, currentIndex - 1), null, compareIndex + 1, [compareIndex], `${workingData[compareIndex]} shifts right.`));

      workingData[compareIndex + 1] = workingData[compareIndex];
      compareIndex--;
    }

    workingData[compareIndex + 1] = currentValue;

    recordedSteps.push(createBarStep(workingData, [], [compareIndex + 1], getRangeIndexes(0, currentIndex), null, compareIndex + 1, [], `${currentValue} is inserted into place.`));
  }

  recordedSteps.push(createBarStep(workingData, [], [], getRangeIndexes(0, workingData.length - 1), null, null, [], "Insertion Sort is complete."));

  return recordedSteps;
}

/* Creates one reusable sorting snapshot object. */
function createBarStep(array, comparing, swapping, sortedIndexes, minimumIndex, currentIndex, shifting, explanation) {
  return {
    type: "bars",
    array: [...array],
    comparing: [...comparing],
    swapping: [...swapping],
    sortedIndexes: [...sortedIndexes],
    minimumIndex,
    currentIndex,
    shifting: [...shifting],
    explanation
  };
}

/* Records Circular Queue steps. */
function generateCircularQueueSteps(data) {
  const capacity = 6;
  const queue = new Array(capacity).fill(null);
  const recordedSteps = [];
  let front = -1;
  let rear = -1;
  let size = 0;

  recordedSteps.push(createQueueStep(queue, front, rear, null, null, null, "Starting Circular Queue."));

  for (let index = 0; index < Math.min(data.length, capacity); index++) {
    if (size === 0) {
      front = 0;
      rear = 0;
    } else {
      rear = (rear + 1) % capacity;
    }

    queue[rear] = data[index];
    size++;

    recordedSteps.push(createQueueStep(queue, front, rear, rear, null, rear === 0 && size > 1 ? rear : null, `Enqueue ${data[index]} at the rear.`));
  }

  for (let count = 0; count < 2; count++) {
    const removedValue = queue[front];

    recordedSteps.push(createQueueStep(queue, front, rear, null, front, null, `Dequeue ${removedValue} from the front.`));

    queue[front] = null;
    size--;
    front = size === 0 ? -1 : (front + 1) % capacity;

    recordedSteps.push(createQueueStep(queue, front, rear, front, null, null, "Front moves to the next item."));
  }

  const extraValues = [77, 88];

  for (let index = 0; index < extraValues.length; index++) {
    rear = (rear + 1) % capacity;
    queue[rear] = extraValues[index];

    recordedSteps.push(createQueueStep(queue, front, rear, rear, null, rear === 0 ? rear : null, `Enqueue ${extraValues[index]}. Rear may wrap around.`));
  }

  recordedSteps.push(createQueueStep(queue, front, rear, null, null, null, "Circular Queue demo complete."));

  return recordedSteps;
}

/* Creates one reusable queue snapshot object. */
function createQueueStep(queue, front, rear, activeIndex, removeIndex, wrapIndex, explanation) {
  return {
    type: "queue",
    queue: [...queue],
    front,
    rear,
    activeIndex,
    removeIndex,
    wrapIndex,
    explanation
  };
}

/* Records Stack push and pop steps. */
function generateStackSteps(data) {
  const capacity = 6;
  const stack = [];
  const recordedSteps = [];

  recordedSteps.push(createStackStep(stack, capacity, null, null, "", "Starting Stack."));

  for (let index = 0; index < Math.min(data.length, capacity); index++) {
    stack.push(data[index]);
    recordedSteps.push(createStackStep(stack, capacity, stack.length - 1, null, "", `Push ${data[index]} on top.`));
  }

  recordedSteps.push(createStackStep(stack, capacity, null, null, "Stack overflow warning: capacity is full.", "The stack is full."));

  for (let count = 0; count < 2; count++) {
    const topIndex = stack.length - 1;
    const removedValue = stack[topIndex];

    recordedSteps.push(createStackStep(stack, capacity, null, topIndex, "", `Pop ${removedValue} from the top.`));
    stack.pop();
    recordedSteps.push(createStackStep(stack, capacity, stack.length - 1, null, "", "The top pointer moves down."));
  }

  recordedSteps.push(createStackStep(stack, capacity, null, null, "", "Stack demo complete."));

  return recordedSteps;
}

/* Creates one reusable stack snapshot object. */
function createStackStep(stack, capacity, activeIndex, removeIndex, warning, explanation) {
  return {
    type: "stack",
    stack: [...stack],
    capacity,
    activeIndex,
    removeIndex,
    warning,
    explanation
  };
}

/* Records linked list insert, search, and delete steps. */
function generateLinkedListSteps(data) {
  const recordedSteps = [];
  let nodes = [];

  recordedSteps.push(createLinkedListStep(nodes, null, null, null, "Starting Linked List. Head is null because the list is empty."));

  const headValue = data[0] ?? 34;
  nodes.unshift({ id: createNodeId(), value: headValue });

  recordedSteps.push(createLinkedListStep(nodes, 0, 0, null, `Insert ${headValue} at head. The new node becomes the first node.`));

  const tailValues = data.slice(1, 5);

  for (let index = 0; index < tailValues.length; index++) {
    const newValue = tailValues[index];

    recordedSteps.push(createLinkedListStep(nodes, nodes.length - 1, null, null, `Move to the current tail node ${nodes[nodes.length - 1].value}.`));

    nodes.push({ id: createNodeId(), value: newValue });

    recordedSteps.push(createLinkedListStep(nodes, nodes.length - 1, nodes.length - 1, null, `Insert ${newValue} at tail. The previous tail now points to this new node.`));
  }

  const searchValue = nodes[Math.min(2, nodes.length - 1)].value;

  for (let index = 0; index < nodes.length; index++) {
    recordedSteps.push(createLinkedListStep(nodes, index, null, null, `Searching for ${searchValue}. Visiting node with value ${nodes[index].value}.`));

    if (nodes[index].value === searchValue) {
      recordedSteps.push(createLinkedListStep(nodes, index, null, null, `Found ${searchValue}. Search stops here.`));
      break;
    }
  }

  const deleteIndex = Math.min(2, nodes.length - 1);
  const deletedValue = nodes[deleteIndex].value;

  recordedSteps.push(createLinkedListStep(nodes, deleteIndex, null, deleteIndex, `Delete node ${deletedValue}. First we highlight the node that will be removed.`));

  nodes.splice(deleteIndex, 1);

  recordedSteps.push(createLinkedListStep(nodes, deleteIndex < nodes.length ? deleteIndex : nodes.length - 1, null, null, `${deletedValue} is removed. The previous node now points to the next node.`));

  recordedSteps.push(createLinkedListStep(nodes, null, null, null, "Linked List demo complete."));

  return recordedSteps;
}

/* Creates one linked list snapshot object. */
function createLinkedListStep(nodes, visitIndex, newIndex, deleteIndex, explanation) {
  return {
    type: "linkedList",
    nodes: nodes.map(node => ({ ...node })),
    visitIndex,
    newIndex,
    deleteIndex,
    explanation
  };
}

/* Creates a simple unique id for linked list nodes. */
function createNodeId() {
  return `node-${Date.now()}-${Math.random()}`;
}

/* Records BST insert comparisons and new node placement. */
function generateBstInsertSteps(data) {
  const values = data.slice(0, 7);
  const treeData = { root: null };
  const recordedSteps = [];

  recordedSteps.push(createTreeStep(null, [], null, null, "Starting BST insert. The tree is empty."));

  for (let index = 0; index < values.length; index++) {
    insertTreeValue(treeData, values[index], recordedSteps);
  }

  recordedSteps.push(createTreeStep(treeData.root, [], null, null, "BST insert demo complete. Smaller values went left, larger values went right."));

  return recordedSteps;
}

/* Inserts one value into the BST while recording the path. */
function insertTreeValue(treeData, value, recordedSteps) {
  if (!treeData.root) {
    treeData.root = createTreeNode(value);
    recordedSteps.push(createTreeStep(treeData.root, [], treeData.root.id, null, `${value} becomes the root node.`));
    return;
  }

  let currentNode = treeData.root;
  const pathIds = [];

  while (currentNode) {
    pathIds.push(currentNode.id);

    recordedSteps.push(createTreeStep(treeData.root, [...pathIds], null, null, `Compare ${value} with ${currentNode.value}.`));

    if (value < currentNode.value) {
      if (!currentNode.left) {
        currentNode.left = createTreeNode(value);
        recordedSteps.push(createTreeStep(treeData.root, [...pathIds], currentNode.left.id, null, `${value} is smaller, so it is inserted on the left.`));
        return;
      }

      currentNode = currentNode.left;
    } else {
      if (!currentNode.right) {
        currentNode.right = createTreeNode(value);
        recordedSteps.push(createTreeStep(treeData.root, [...pathIds], currentNode.right.id, null, `${value} is larger or equal, so it is inserted on the right.`));
        return;
      }

      currentNode = currentNode.right;
    }
  }
}

/* Records BST search path for a target value. */
function generateBstSearchSteps(data) {
  const values = data.slice(0, 7);
  const treeData = { root: null };
  const recordedSteps = [];

  for (let index = 0; index < values.length; index++) {
    insertTreeValueWithoutSteps(treeData, values[index]);
  }

  const targetValue = values[Math.min(3, values.length - 1)];
  let currentNode = treeData.root;
  const pathIds = [];

  recordedSteps.push(createTreeStep(treeData.root, [], null, null, `Starting BST search for ${targetValue}.`));

  while (currentNode) {
    pathIds.push(currentNode.id);

    recordedSteps.push(createTreeStep(treeData.root, [...pathIds], null, null, `Visiting ${currentNode.value}. Compare it with ${targetValue}.`));

    if (currentNode.value === targetValue) {
      recordedSteps.push(createTreeStep(treeData.root, [...pathIds], null, currentNode.id, `Found ${targetValue}. Search complete.`));
      return recordedSteps;
    }

    if (targetValue < currentNode.value) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }

  recordedSteps.push(createTreeStep(treeData.root, pathIds, null, null, `${targetValue} was not found.`));
  return recordedSteps;
}

/* Records in-order, pre-order, or post-order traversal steps. */
function generateTreeTraversalSteps(data, traversalType) {
  const values = data.slice(0, 7);
  const treeData = { root: null };
  const recordedSteps = [];
  const visitedIds = [];

  for (let index = 0; index < values.length; index++) {
    insertTreeValueWithoutSteps(treeData, values[index]);
  }

  recordedSteps.push(createTreeStep(treeData.root, [], null, null, `Starting ${traversalType} traversal.`));

  traverseTree(treeData.root, traversalType, visitedIds, recordedSteps, treeData.root);

  recordedSteps.push(createTreeStep(treeData.root, visitedIds, null, null, `${traversalType} traversal complete.`));

  return recordedSteps;
}

/* Recursively visits tree nodes in the selected traversal order. */
function traverseTree(node, traversalType, visitedIds, recordedSteps, root) {
  if (!node) return;

  if (traversalType === "preOrder") {
    visitedIds.push(node.id);
    recordedSteps.push(createTreeStep(root, [...visitedIds], null, node.id, `Visit ${node.value} first, then move to its children.`));
  }

  traverseTree(node.left, traversalType, visitedIds, recordedSteps, root);

  if (traversalType === "inOrder") {
    visitedIds.push(node.id);
    recordedSteps.push(createTreeStep(root, [...visitedIds], null, node.id, `Visit ${node.value} after its left subtree.`));
  }

  traverseTree(node.right, traversalType, visitedIds, recordedSteps, root);

  if (traversalType === "postOrder") {
    visitedIds.push(node.id);
    recordedSteps.push(createTreeStep(root, [...visitedIds], null, node.id, `Visit ${node.value} after both children.`));
  }
}

/* Inserts a value into the tree without recording steps. */
function insertTreeValueWithoutSteps(treeData, value) {
  if (!treeData.root) {
    treeData.root = createTreeNode(value);
    return;
  }

  let currentNode = treeData.root;

  while (currentNode) {
    if (value < currentNode.value) {
      if (!currentNode.left) {
        currentNode.left = createTreeNode(value);
        return;
      }

      currentNode = currentNode.left;
    } else {
      if (!currentNode.right) {
        currentNode.right = createTreeNode(value);
        return;
      }

      currentNode = currentNode.right;
    }
  }
}

/* Creates one tree node object. */
function createTreeNode(value) {
  return {
    id: `tree-${Date.now()}-${Math.random()}`,
    value,
    left: null,
    right: null
  };
}

/* Creates one reusable tree snapshot object. */
function createTreeStep(root, visitedIds, newNodeId, foundNodeId, explanation) {
  return {
    type: "tree",
    root: cloneTree(root),
    visitedIds: [...visitedIds],
    newNodeId,
    foundNodeId,
    explanation
  };
}

/* Copies the tree so old steps do not change later. */
function cloneTree(node) {
  if (!node) return null;

  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right)
  };
}

/* Records BFS exploration and final shortest path steps. */
function generateBfsSteps() {
  const totalCells = gridState.rows * gridState.cols;
  const visited = new Array(totalCells).fill(false);
  const parent = new Array(totalCells).fill(null);
  const queue = [gridState.startIndex];
  const explored = [];
  const recordedSteps = [];

  visited[gridState.startIndex] = true;

  recordedSteps.push(createGridStep([], [], gridState.startIndex, "Starting BFS. The start cell enters the queue first."));

  while (queue.length > 0) {
    const currentIndex = queue.shift();
    explored.push(currentIndex);

    recordedSteps.push(createGridStep([...explored], [], currentIndex, `Exploring cell ${currentIndex}. BFS checks its neighbours.`));

    if (currentIndex === gridState.endIndex) {
      const path = reconstructPath(parent, gridState.endIndex);
      recordedSteps.push(createGridStep([...explored], path, currentIndex, "End found. Now we reconstruct the shortest path using parent links."));
      return recordedSteps;
    }

    const neighbours = getGridNeighbours(currentIndex);

    for (let index = 0; index < neighbours.length; index++) {
      const neighbourIndex = neighbours[index];

      if (!visited[neighbourIndex] && !gridState.walls.includes(neighbourIndex)) {
        visited[neighbourIndex] = true;
        parent[neighbourIndex] = currentIndex;
        queue.push(neighbourIndex);

        recordedSteps.push(createGridStep([...explored, neighbourIndex], [], neighbourIndex, `Cell ${neighbourIndex} is added to the queue. Its parent is cell ${currentIndex}.`));
      }
    }
  }

  recordedSteps.push(createGridStep([...explored], [], null, "No path found. The queue became empty before reaching the end."));
  return recordedSteps;
}

/* Creates one reusable grid snapshot object. */
function createGridStep(explored, path, currentIndex, explanation) {
  return {
    type: "grid",
    rows: gridState.rows,
    cols: gridState.cols,
    startIndex: gridState.startIndex,
    endIndex: gridState.endIndex,
    walls: [...gridState.walls],
    explored: [...explored],
    path: [...path],
    currentIndex,
    explanation
  };
}

/* Gets valid up, down, left, and right neighbours for one cell. */
function getGridNeighbours(index) {
  const neighbours = [];
  const row = Math.floor(index / gridState.cols);
  const col = index % gridState.cols;

  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
  ];

  for (let i = 0; i < directions.length; i++) {
    const nextRow = row + directions[i].row;
    const nextCol = col + directions[i].col;

    if (nextRow >= 0 && nextRow < gridState.rows && nextCol >= 0 && nextCol < gridState.cols) {
      neighbours.push(nextRow * gridState.cols + nextCol);
    }
  }

  return neighbours;
}

/* Rebuilds the shortest path by walking parent links backward. */
function reconstructPath(parent, endIndex) {
  const path = [];
  let currentIndex = endIndex;

  while (currentIndex !== null) {
    path.unshift(currentIndex);
    currentIndex = parent[currentIndex];
  }

  return path;
}

/* Creates a list of indexes from start to end. */
function getRangeIndexes(start, end) {
  const indexes = [];

  for (let index = start; index <= end; index++) {
    indexes.push(index);
  }

  return indexes;
}

/* Renders the current recorded step and updates the UI text. */
function renderStep(step) {
  if (!step) return;

  if (step.type === "queue") {
    drawQueue(step);
    renderDataPills(step.queue);
  } else if (step.type === "stack") {
    drawStack(step);
    renderDataPills(step.stack);
  } else if (step.type === "linkedList") {
    drawLinkedList(step);
    renderDataPills(step.nodes.map(node => node.value));
  } else if (step.type === "tree") {
    drawTree(step);
    renderDataPills(flattenTreeValues(step.root));
  } else if (step.type === "grid") {
    drawGrid(step);
    renderDataPills(["START", "END", "WALLS", step.walls.length]);
  } else {
    drawBars(step);
    renderDataPills(step.array);
  }

  explanationText.textContent = step.explanation;

  const currentNumber = String(appState.currentStep).padStart(2, "0");
  const totalNumber = String(appState.steps.length - 1).padStart(2, "0");

  stepCounter.textContent = `Step ${currentNumber} / ${totalNumber}`;
}

/* Starts automatic playback using the selected speed. */
function play() {
  pause();

  appState.isPlaying = true;

  appState.playInterval = setInterval(() => {
    if (appState.currentStep >= appState.steps.length - 1) {
      pause();
      return;
    }

    stepForward();
  }, SPEEDS[appState.speed]);
}

/* Stops automatic playback. */
function pause() {
  appState.isPlaying = false;

  if (appState.playInterval) {
    clearInterval(appState.playInterval);
    appState.playInterval = null;
  }
}

/* Moves one recorded step forward. */
function stepForward() {
  appState.currentStep = Math.min(appState.currentStep + 1, appState.steps.length - 1);
  renderStep(appState.steps[appState.currentStep]);
}

/* Moves one recorded step backward. */
function stepBack() {
  appState.currentStep = Math.max(appState.currentStep - 1, 0);
  renderStep(appState.steps[appState.currentStep]);
}

/* Resets the visualizer back to the first recorded step. */
function reset() {
  pause();
  appState.currentStep = 0;
  renderStep(appState.steps[appState.currentStep]);
}

/* Loads an algorithm and renders its first step. */
function loadAlgorithm(category, algorithm) {
  pause();

  appState.activeCategory = category;
  appState.activeAlgorithm = algorithm;
  appState.steps = generateSteps(algorithm, appState.inputData);
  appState.currentStep = 0;

  updateAlgorithmInfo();
  updateActiveCategoryButton();
  renderAlgorithmPills();
  renderStep(appState.steps[appState.currentStep]);
}

/* Creates random numbers for the visualizer. */
function generateRandomData(size) {
  const randomValues = [];

  for (let index = 0; index < size; index++) {
    randomValues.push(Math.floor(Math.random() * 95) + 5);
  }

  return randomValues;
}

/* Converts comma-separated text into numbers. */
function parseInputData(inputText) {
  const textParts = inputText.split(",");
  const parsedNumbers = [];

  for (let index = 0; index < textParts.length; index++) {
    const trimmedValue = textParts[index].trim();
    const numberValue = Number(trimmedValue);

    if (trimmedValue !== "" && !Number.isNaN(numberValue)) {
      parsedNumbers.push(numberValue);
    }
  }

  return parsedNumbers;
}

/* Validates custom data before rebuilding the visualizer. */
function applyCustomData() {
  const parsedNumbers = parseInputData(dataInput.value);

  if (parsedNumbers.length < 2) {
    inputError.textContent = "Please enter at least 2 valid numbers.";
    return;
  }

  if (parsedNumbers.length > 12) {
    inputError.textContent = "Use 12 numbers or fewer so the Canvas stays readable.";
    return;
  }

  inputError.textContent = "";
  appState.inputData = parsedNumbers;
  loadAlgorithm(appState.activeCategory, appState.activeAlgorithm);
}

/* Updates title, complexity, description, and grid tool visibility. */
function updateAlgorithmInfo() {
  const selectedInfo = ALGORITHM_INFO[appState.activeAlgorithm];

  algorithmTitle.textContent = selectedInfo.title;
  algorithmSubtitle.textContent = selectedInfo.subtitle;
  infoName.textContent = selectedInfo.name;
  timeComplexity.textContent = selectedInfo.time;
  spaceComplexity.textContent = selectedInfo.space;
  infoDescription.textContent = selectedInfo.description;

  const gridTools = document.getElementById("gridTools");

  if (gridTools) {
    gridTools.classList.toggle("show", appState.activeAlgorithm === "bfsGrid");
  }
}

/* Updates the active category button. */
function updateActiveCategoryButton() {
  const categoryButtons = document.querySelectorAll(".category-btn");

  for (let index = 0; index < categoryButtons.length; index++) {
    const button = categoryButtons[index];

    if (button.dataset.category === appState.activeCategory) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }
}

/* Rebuilds the algorithm pills for the active category. */
function renderAlgorithmPills() {
  const algorithms = CATEGORY_ALGORITHMS[appState.activeCategory];
  algorithmPills.innerHTML = "";

  for (let index = 0; index < algorithms.length; index++) {
    const button = document.createElement("button");
    button.className = "algorithm-pill";
    button.textContent = algorithms[index].label;
    button.dataset.algorithm = algorithms[index].value;

    if (algorithms[index].value === appState.activeAlgorithm) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      loadAlgorithm(appState.activeCategory, algorithms[index].value);
    });

    algorithmPills.appendChild(button);
  }
}

/* Draws sorting bars on Canvas. */
function drawBars(step) {
  clearCanvas();
  drawCanvasGrid();

  const data = step.array;
  const gap = 14;
  const availableWidth = CANVAS_WIDTH - 80;
  const barWidth = (availableWidth - gap * (data.length - 1)) / data.length;
  const maxValue = Math.max(...data);

  for (let index = 0; index < data.length; index++) {
    const value = data[index];
    const barHeight = (value / maxValue) * 300;
    const x = 40 + index * (barWidth + gap);
    const y = CANVAS_HEIGHT - barHeight - 60;

    let barColor = COLORS.defaultBar;

    if (step.currentIndex === index) barColor = COLORS.current;
    if (step.minimumIndex === index) barColor = COLORS.minimum;
    if (step.comparing.includes(index)) barColor = COLORS.comparing;
    if (step.shifting.includes(index)) barColor = COLORS.shifting;
    if (step.swapping.includes(index)) barColor = COLORS.swapping;
    if (step.sortedIndexes.includes(index)) barColor = COLORS.sorted;

    drawGlowRect(x, y, barWidth, barHeight, barColor);

    ctx.fillStyle = COLORS.text;
    ctx.font = "700 16px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText(value, x + barWidth / 2, y - 12);
  }
}

/* Draws the circular queue boxes and pointers. */
function drawQueue(step) {
  clearCanvas();

  const boxSize = 92;
  const gap = 18;
  const totalWidth = step.queue.length * boxSize + (step.queue.length - 1) * gap;
  const startX = (CANVAS_WIDTH - totalWidth) / 2;
  const boxY = 170;

  for (let index = 0; index < step.queue.length; index++) {
    const x = startX + index * (boxSize + gap);
    let borderColor = COLORS.grid;

    if (index === step.activeIndex) borderColor = COLORS.queueActive;
    if (index === step.removeIndex) borderColor = COLORS.queueRemove;
    if (index === step.wrapIndex) borderColor = COLORS.queueWrap;

    drawGlowRect(x, boxY, boxSize, boxSize, borderColor);

    ctx.fillStyle = COLORS.text;
    ctx.font = "700 18px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText(step.queue[index] === null ? "EMPTY" : step.queue[index], x + boxSize / 2, boxY + 54);
  }

  drawQueuePointer("front", step.front, startX, boxY, boxSize, gap, COLORS.gridStart, -55);
  drawQueuePointer("rear", step.rear, startX, boxY, boxSize, gap, COLORS.purple, 145);
}

/* Draws a queue pointer label. */
function drawQueuePointer(label, pointerIndex, startX, boxY, boxSize, gap, color, offsetY) {
  if (pointerIndex === -1) {
    ctx.fillStyle = color;
    ctx.font = "700 16px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText(`${label}: -1`, CANVAS_WIDTH / 2, label === "front" ? 85 : 340);
    return;
  }

  const x = startX + pointerIndex * (boxSize + gap) + boxSize / 2;
  const y = boxY + offsetY;

  ctx.fillStyle = color;
  ctx.font = "700 15px JetBrains Mono";
  ctx.textAlign = "center";
  ctx.fillText(label.toUpperCase(), x, y);
}

/* Draws the vertical stack boxes and top pointer. */
function drawStack(step) {
  clearCanvas();

  const boxWidth = 170;
  const boxHeight = 48;
  const gap = 10;
  const startX = CANVAS_WIDTH / 2 - boxWidth / 2;
  const baseY = 350;

  for (let index = 0; index < step.stack.length; index++) {
    const value = step.stack[index];
    const y = baseY - index * (boxHeight + gap) - boxHeight;

    let borderColor = COLORS.grid;

    if (index === step.activeIndex) borderColor = COLORS.stackPush;
    if (index === step.removeIndex) borderColor = COLORS.stackPop;

    drawGlowRect(startX, y, boxWidth, boxHeight, borderColor);

    ctx.fillStyle = COLORS.text;
    ctx.font = "700 18px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText(value, startX + boxWidth / 2, y + 31);
  }

  drawStackTopPointer(step, startX, baseY, boxHeight, gap);

  if (step.warning) {
    ctx.fillStyle = COLORS.swapping;
    ctx.font = "700 18px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText(step.warning, CANVAS_WIDTH / 2, 58);
  }
}

/* Draws the TOP pointer beside the newest stack value. */
function drawStackTopPointer(step, startX, baseY, boxHeight, gap) {
  if (step.stack.length === 0) {
    ctx.fillStyle = COLORS.muted;
    ctx.font = "700 17px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText("TOP: -1 / empty stack", CANVAS_WIDTH / 2, 95);
    return;
  }

  const topIndex = step.stack.length - 1;
  const y = baseY - topIndex * (boxHeight + gap) - boxHeight / 2;

  ctx.fillStyle = COLORS.stackTop;
  ctx.font = "700 16px JetBrains Mono";
  ctx.textAlign = "right";
  ctx.fillText("TOP", startX - 42, y + 5);
}

/* Draws linked list nodes with arrows between them. */
function drawLinkedList(step) {
  clearCanvas();

  if (step.nodes.length === 0) {
    ctx.fillStyle = COLORS.muted;
    ctx.font = "700 24px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText("HEAD → null", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    return;
  }

  const nodeWidth = 92;
  const nodeHeight = 62;
  const gap = 55;
  const totalWidth = step.nodes.length * nodeWidth + (step.nodes.length - 1) * gap;
  const startX = Math.max(40, (CANVAS_WIDTH - totalWidth) / 2);
  const y = 190;

  for (let index = 0; index < step.nodes.length - 1; index++) {
    const fromX = startX + index * (nodeWidth + gap) + nodeWidth;
    const toX = startX + (index + 1) * (nodeWidth + gap);
    drawArrow(fromX + 8, y + nodeHeight / 2, toX - 8, y + nodeHeight / 2);
  }

  for (let index = 0; index < step.nodes.length; index++) {
    const node = step.nodes[index];
    const x = startX + index * (nodeWidth + gap);

    let borderColor = COLORS.grid;

    if (index === step.visitIndex) borderColor = COLORS.nodeVisit;
    if (index === step.newIndex) borderColor = COLORS.nodeNew;
    if (index === step.deleteIndex) borderColor = COLORS.nodeDelete;

    drawGlowRect(x, y, nodeWidth, nodeHeight, borderColor);

    ctx.fillStyle = COLORS.text;
    ctx.font = "700 20px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText(node.value, x + nodeWidth / 2, y + 38);
  }

  ctx.fillStyle = COLORS.muted;
  ctx.font = "700 18px JetBrains Mono";
  ctx.textAlign = "left";
  ctx.fillText("null", startX + step.nodes.length * (nodeWidth + gap) - gap + 22, y + 38);
}

/* Draws the binary tree edges first, then nodes on top. */
function drawTree(step) {
  clearCanvas();

  if (!step.root) {
    ctx.fillStyle = COLORS.muted;
    ctx.font = "700 24px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText("EMPTY TREE", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    return;
  }

  const positionedNodes = [];
  calculateTreePositions(step.root, CANVAS_WIDTH / 2, 70, 230, positionedNodes);

  for (let index = 0; index < positionedNodes.length; index++) {
    const item = positionedNodes[index];

    if (item.parentX !== null && item.parentY !== null) {
      ctx.strokeStyle = COLORS.treeEdge;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(item.parentX, item.parentY);
      ctx.lineTo(item.x, item.y);
      ctx.stroke();
    }
  }

  for (let index = 0; index < positionedNodes.length; index++) {
    const item = positionedNodes[index];
    let color = COLORS.grid;

    if (step.visitedIds.includes(item.node.id)) color = COLORS.treeVisit;
    if (step.newNodeId === item.node.id) color = COLORS.treeNew;
    if (step.foundNodeId === item.node.id) color = COLORS.treeFound;

    drawTreeNode(item.x, item.y, item.node.value, color);
  }
}

/* Recursively calculates x/y positions for every tree node. */
function calculateTreePositions(node, x, y, horizontalGap, positionedNodes, parentX = null, parentY = null) {
  if (!node) return;

  positionedNodes.push({ node, x, y, parentX, parentY });

  calculateTreePositions(node.left, x - horizontalGap, y + 90, horizontalGap / 2, positionedNodes, x, y);
  calculateTreePositions(node.right, x + horizontalGap, y + 90, horizontalGap / 2, positionedNodes, x, y);
}

/* Draws one circular tree node. */
function drawTreeNode(x, y, value, color) {
  ctx.fillStyle = COLORS.treeNode;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;

  ctx.beginPath();
  ctx.arc(x, y, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.fillStyle = COLORS.text;
  ctx.font = "700 15px JetBrains Mono";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value, x, y);
  ctx.textBaseline = "alphabetic";
}

/* Converts tree nodes into a simple value array for the data panel. */
function flattenTreeValues(root) {
  const values = [];

  function visit(node) {
    if (!node) return;

    values.push(node.value);
    visit(node.left);
    visit(node.right);
  }

  visit(root);
  return values;
}

/* Draws the BFS grid on Canvas. */
function drawGrid(step) {
  clearCanvas();

  const cellSize = 34;
  const gap = 4;
  const gridWidth = step.cols * cellSize + (step.cols - 1) * gap;
  const gridHeight = step.rows * cellSize + (step.rows - 1) * gap;
  const startX = (CANVAS_WIDTH - gridWidth) / 2;
  const startY = (CANVAS_HEIGHT - gridHeight) / 2;

  for (let row = 0; row < step.rows; row++) {
    for (let col = 0; col < step.cols; col++) {
      const index = row * step.cols + col;
      const x = startX + col * (cellSize + gap);
      const y = startY + row * (cellSize + gap);

      let color = COLORS.gridEmpty;

      if (step.explored.includes(index)) color = COLORS.gridExplore;
      if (step.path.includes(index)) color = COLORS.gridPath;
      if (step.walls.includes(index)) color = COLORS.gridWall;
      if (index === step.startIndex) color = COLORS.gridStart;
      if (index === step.endIndex) color = COLORS.gridEnd;

      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = index === step.currentIndex ? 18 : 0;
      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.shadowBlur = 0;
    }
  }
}

/* Handles mouse clicks on the grid for start, end, walls, and erase. */
function handleCanvasClick(event) {
  if (appState.activeAlgorithm !== "bfsGrid") return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = CANVAS_WIDTH / rect.width;
  const scaleY = CANVAS_HEIGHT / rect.height;
  const mouseX = (event.clientX - rect.left) * scaleX;
  const mouseY = (event.clientY - rect.top) * scaleY;

  const cellSize = 34;
  const gap = 4;
  const gridWidth = gridState.cols * cellSize + (gridState.cols - 1) * gap;
  const gridHeight = gridState.rows * cellSize + (gridState.rows - 1) * gap;
  const startX = (CANVAS_WIDTH - gridWidth) / 2;
  const startY = (CANVAS_HEIGHT - gridHeight) / 2;

  const col = Math.floor((mouseX - startX) / (cellSize + gap));
  const row = Math.floor((mouseY - startY) / (cellSize + gap));

  if (row < 0 || row >= gridState.rows || col < 0 || col >= gridState.cols) return;

  const index = row * gridState.cols + col;

  if (gridState.editMode === "start") {
    gridState.startIndex = index;
    gridState.walls = gridState.walls.filter(wall => wall !== index);
  }

  if (gridState.editMode === "end") {
    gridState.endIndex = index;
    gridState.walls = gridState.walls.filter(wall => wall !== index);
  }

  if (gridState.editMode === "wall" && index !== gridState.startIndex && index !== gridState.endIndex) {
    if (gridState.walls.includes(index)) {
      gridState.walls = gridState.walls.filter(wall => wall !== index);
    } else {
      gridState.walls.push(index);
    }
  }

  if (gridState.editMode === "erase") {
    gridState.walls = gridState.walls.filter(wall => wall !== index);
  }

  loadAlgorithm("PATHFINDING", "bfsGrid");
}

/* Updates which grid edit mode button is active. */
function updateGridToolButtons() {
  const gridButtons = document.querySelectorAll(".grid-tool");

  for (let index = 0; index < gridButtons.length; index++) {
    if (gridButtons[index].dataset.mode === gridState.editMode) {
      gridButtons[index].classList.add("active");
    } else {
      gridButtons[index].classList.remove("active");
    }
  }
}

/* Draws an arrow line between two Canvas points. */
function drawArrow(fromX, fromY, toX, toY) {
  const headSize = 9;

  ctx.strokeStyle = COLORS.arrow;
  ctx.fillStyle = COLORS.arrow;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headSize, toY - headSize / 2);
  ctx.lineTo(toX - headSize, toY + headSize / 2);
  ctx.closePath();
  ctx.fill();
}

/* Clears the Canvas and fills the dark background. */
function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/* Draws a glowing rectangle. */
function drawGlowRect(x, y, width, height, color) {
  ctx.fillStyle = "rgba(17, 17, 32, 0.95)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
  ctx.shadowBlur = 0;
}

/* Draws subtle background guide lines on the Canvas. */
function drawCanvasGrid() {
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;

  for (let y = 80; y < CANVAS_HEIGHT - 40; y += 60) {
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(CANVAS_WIDTH - 30, y);
    ctx.stroke();
  }
}

/* Shows current data as number pills. */
function renderDataPills(data) {
  dataPills.innerHTML = "";

  for (let index = 0; index < data.length; index++) {
    const pill = document.createElement("span");
    pill.className = "data-pill";
    pill.textContent = data[index] === null ? "empty" : data[index];
    dataPills.appendChild(pill);
  }
}

/* Connects buttons and inputs to app actions. */
function setupEventListeners() {
  const categoryButtons = document.querySelectorAll(".category-btn");

  for (let index = 0; index < categoryButtons.length; index++) {
    categoryButtons[index].addEventListener("click", () => {
      const selectedCategory = categoryButtons[index].dataset.category;

      if (!selectedCategory) return;

      const firstAlgorithm = CATEGORY_ALGORITHMS[selectedCategory][0].value;
      loadAlgorithm(selectedCategory, firstAlgorithm);
    });
  }

  const gridButtons = document.querySelectorAll(".grid-tool");

  for (let index = 0; index < gridButtons.length; index++) {
    gridButtons[index].addEventListener("click", () => {
      gridState.editMode = gridButtons[index].dataset.mode;
      updateGridToolButtons();
    });
  }

  canvas.addEventListener("click", handleCanvasClick);

  playBtn.addEventListener("click", play);
  pauseBtn.addEventListener("click", pause);
  stepForwardBtn.addEventListener("click", stepForward);
  stepBackBtn.addEventListener("click", stepBack);
  resetBtn.addEventListener("click", reset);
  applyDataBtn.addEventListener("click", applyCustomData);

  randomBtn.addEventListener("click", () => {
    appState.inputData = generateRandomData(8);
    dataInput.value = appState.inputData.join(", ");
    inputError.textContent = "";
    loadAlgorithm(appState.activeCategory, appState.activeAlgorithm);
  });

  speedSelect.addEventListener("change", () => {
    appState.speed = speedSelect.value;

    if (appState.isPlaying) {
      play();
    }
  });
}

/* Starts the app. */
function initApp() {
  setupEventListeners();
  updateGridToolButtons();
  renderAlgorithmPills();
  loadAlgorithm("SORTING", "bubbleSort");
}

initApp();