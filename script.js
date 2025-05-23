let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
let score = 0;

function randomTile() {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomCell.x][randomCell.y] = Math.random() > 0.5 ? 2 : 4;
}

function updateBoard() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const tile = document.createElement('div');
      const value = board[row][col];
      if (value !== 0) {
        tile.textContent = value;
        tile.classList.add(`tile-${value}`);
      }
      grid.appendChild(tile);
    }
  }
  document.getElementById('score').textContent = `Score: ${score}`;
}

function moveLeft() {
  for (let row = 0; row < 4; row++) {
    let newRow = board[row].filter(val => val !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        score += newRow[i];
        newRow.splice(i + 1, 1);
      }
    }
    while (newRow.length < 4) {
      newRow.push(0);
    }
    board[row] = newRow;
  }
  randomTile();
  updateBoard();
}

function moveRight() {
  for (let row = 0; row < 4; row++) {
    board[row].reverse();
  }
  moveLeft();
  for (let row = 0; row < 4; row++) {
    board[row].reverse();
  }
}

function moveUp() {
  board = rotateBoardClockwise();
  moveLeft();
  board = rotateBoardClockwise();
  board = rotateBoardClockwise();
  board = rotateBoardClockwise();
}

function moveDown() {
  board = rotateBoardClockwise();
  moveRight();
  board = rotateBoardClockwise();
  board = rotateBoardClockwise();
  board = rotateBoardClockwise();
}

function rotateBoardClockwise() {
  let newBoard = [];
  for (let col = 0; col < 4; col++) {
    let newRow = [];
    for (let row = 3; row >= 0; row--) {
      newRow.push(board[row][col]);
    }
    newBoard.push(newRow);
  }
  return newBoard;
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    moveLeft();
  } else if (e.key === 'ArrowRight') {
    moveRight();
  } else if (e.key === 'ArrowUp') {
    moveUp();
  } else if (e.key === 'ArrowDown') {
    moveDown();
  }
});

randomTile();
updateBoard();
