const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 20;
const TICK_INTERVAL = 500;

let board = [];
let currentBlock = null;
let tickTimer = null;

function initBoard() {
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      board[i][j] = null;
    }
  }
}
function spawnBlock() {
    let shapes = [
        [[1, 1], [1, 1]],
        [[1, 1, 1, 1]],
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0, 0], [1, 1, 1]],
        [[0, 0, 1], [1, 1, 1]],
        [[1, 0, 0], [1, 0, 0], [1, 1, 1]]
    ];
    let randomIndex = Math.floor(Math.random() * shapes.length);
    let randomShape = shapes[randomIndex];
    currentBlock = {
        x: 4,
        y: 0,
        shape: randomShape
    };
}
function spawnBlock() {
  currentBlock = {
    x: 4,
    y: 0,
    shape: [
      [1, 1],
      [1, 1],
    ],
  };
}

function drawBoard() {
  let boardElement = document.getElementById("game-board");
  boardElement.innerHTML = "";
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    for (let j = 0; j < BOARD_WIDTH; j++) {
      if (board[i][j]) {
        let blockElement = document.createElement("div");
        blockElement.className = "block";
        blockElement.style.top = i * BLOCK_SIZE + "px";
        blockElement.style.left = j * BLOCK_SIZE + "px";
        boardElement.appendChild(blockElement);
      }
    }
  }
}

function drawCurrentBlock() {
  let boardElement = document.getElementById("game-board");
  for (let i = 0; i < currentBlock.shape.length; i++) {
    for (let j = 0; j < currentBlock.shape[i].length; j++) {
      if (currentBlock.shape[i][j]) {
        let blockElement = document.createElement("div");
        blockElement.className = "block";
        blockElement.style.top = (currentBlock.y + i) * BLOCK_SIZE + "px";
        blockElement.style.left = (currentBlock.x + j) * BLOCK_SIZE + "px";
        boardElement.appendChild(blockElement);
      }
    }
  }
}

function clearLines() {
  for (let i = BOARD_HEIGHT - 1; i >= 0; i--) {
    if (board[i].every((block) => block !== null)) {
      board.splice(i, 1);
      board.unshift(new Array(BOARD_WIDTH).fill(null));
    }
  }
}

function moveBlockDown() {
  currentBlock.y++;
  if (currentBlock.y + currentBlock.shape.length > BOARD_HEIGHT) {
    for (let i = 0; i < currentBlock.shape.length; i++) {
      for (let j = 0; j < currentBlock.shape[i].length; j++) {
        if (currentBlock.shape[i][j]) {
          board[currentBlock.y + i - 1][currentBlock.x + j] = true;
        }
      }
    }
    spawnBlock();
    clearLines();
  }
}

function moveBlockLeft() {
  currentBlock.x--;
  if (currentBlock.x < 0) {
    currentBlock.x = 0;
  }
  if (checkCollision()) {
    currentBlock.x++;
  }
  drawBoard();
  drawCurrentBlock();
}
function moveBlockLeft() {
  currentBlock.x--;
  if (currentBlock.x < 0) {
    currentBlock.x = 0;
  }
  if (checkCollision()) {
    currentBlock.x++;
  }
  drawBoard();
  drawCurrentBlock();
}
