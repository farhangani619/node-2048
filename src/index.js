const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
startGame();
const grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
function generate() {
  //Generating random index to assign value 2
  randomNumberOne = Math.floor(Math.random() * 4);
  randomNumberTwo = Math.floor(Math.random() * 4);

  if (grid[randomNumberOne][randomNumberTwo] == 0) {
    grid[randomNumberOne][randomNumberTwo] = 2;
    gameOver();
  } else {
    generate();
  }
}
generate();
generate();

console.table(grid);
function Win() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        console.log("You win");
      }
    }
  }
}

function gameOver() {
  let zeros = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++)
      if (grid[i][j] === 0) {
        zeros++;
      }
  }
  if (zeros === 0) {
    console.log("You Lose");
    rl.close();
  }
}
function startGame() {
  console.log("Game Started \n");
  rl.question(
    "enter 1 for left , 2 for right , 3 for up  , 4 for down \n ",
    function (name) {
      direction(name);

      if (name == "5") {
        rl.close();
      } else startGame();
    }
  );

  rl.on("close", function () {
    console.log("\n BETTER LUCK NEXT TIME");
    process.exit(0);
  });
}
function direction(name) {
  if (name === "1") {
    moveLeft();
    generate();
    console.table(grid);
  } else if (name === "2") {
    moveRight();
    generate();
    console.table(grid);
  } else if (name === "3") {
    moveUp();
    generate();
    console.table(grid);
  } else if (name === "4") {
    moveDown();
    generate();
    console.table(grid);
  }
}

function moveUp() {
  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < 4; j++) {
      // spillting into columns
      const column = createColumnIndex(i, j);
      //moving the number on the top of the grid
      const newColumn = transformColUp(column);
      // adding the columns back to the grid
      grid[i][j] = newColumn[0];
      grid[i + 1][j] = newColumn[1];
      grid[i + 2][j] = newColumn[2];
      grid[i + 3][j] = newColumn[3];
    }
  }
  addNumbersUp();
}

function moveDown() {
  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < 4; j++) {
      const column = createColumnIndex(i, j);
      const newColumn = transformColDown(column);
      grid[i][j] = newColumn[0];
      grid[i + 1][j] = newColumn[1];
      grid[i + 2][j] = newColumn[2];
      grid[i + 3][j] = newColumn[3];
    }
  }
  addNumbersDown();
}

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 1; j++) {
      const row = createRowIndex(i, j);
      const newRow = transformRowLeft(row);
      grid[i][j] = newRow[0];
      grid[i][j + 1] = newRow[1];
      grid[i][j + 2] = newRow[2];
      grid[i][j + 3] = newRow[3];
    }
  }
  addNumbersLeft();
}
function moveRight() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 1; j++) {
      // spillting into rows
      const row = createRowIndex(i, j);
      // //moving the number on the left of the grid
      const newRow = transformRowRight(row);
      // adding the rows back to the grid
      grid[i][j] = newRow[0];
      grid[i][j + 1] = newRow[1];
      grid[i][j + 2] = newRow[2];
      grid[i][j + 3] = newRow[3];
    }
  }

  addNumbersRight();
}
function createColumnIndex(i, j) {
  const indexOne = grid[i][j];
  const indexTwo = grid[i + 1][j];
  const indexThree = grid[i + 2][j];
  const indexFour = grid[i + 3][j];

  const column = [
    parseInt(indexOne),
    parseInt(indexTwo),
    parseInt(indexThree),
    parseInt(indexFour),
  ];

  return column;
}

function createRowIndex(i, j) {
  const indexOne = grid[i][j];
  const indexTwo = grid[i][j + 1];
  const indexThree = grid[i][j + 2];
  const indexFour = grid[i][j + 3];

  const row = [
    parseInt(indexOne),
    parseInt(indexTwo),
    parseInt(indexThree),
    parseInt(indexFour),
  ];

  return row;
}

function transformRowLeft(row) {
  let newRow = row.filter((num) => num);
  for (let i = 0; i < 4; i++) {
    if (newRow.length < 4) {
      newRow.push(0);
    }
  }
  return newRow;
}
function transformRowRight(row) {
  let newRow = row.filter((num) => num);
  for (let i = 0; i < 4; i++) {
    if (newRow.length < 4) {
      newRow.unshift(0);
    }
  }
  return newRow;
}
function transformColUp(column) {
  let newColumn = column.filter((num) => num);
  for (let i = 0; i < 4; i++) {
    if (newColumn.length < 4) {
      newColumn.push(0);
    }
  }
  return newColumn;
}
function transformColDown(column) {
  let newColumn = column.filter((num) => num);
  for (let i = 0; i < 4; i++) {
    if (newColumn.length < 4) {
      newColumn.unshift(0);
    }
  }
  return newColumn;
}
function addNumbersUp() {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[j][i] === grid[j + 1][i]) {
        let add = parseInt(grid[j][i]) + parseInt(grid[j + 1][i]);

        grid[j][i] = add;
        grid[j + 1][i] = 0;
      }
    }
  }
  Win();
}
function addNumbersDown() {
  for (let i = 3; i >= 0; i--) {
    for (let j = 3; j > 0; j--) {
      if (grid[j][i] === grid[j - 1][i]) {
        let add = parseInt(grid[j][i]) + parseInt(grid[j - 1][i]);

        grid[j][i] = add;
        grid[j - 1][i] = 0;
      }
    }
  }
  Win();
}

function addNumbersLeft() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === grid[i][j + 1]) {
        let add = parseInt(grid[i][j]) + parseInt(grid[i][j + 1]);

        grid[i][j] = add;
        grid[i][j + 1] = 0;
      }
    }
  }
  Win();
}
function addNumbersRight() {
  for (let i = 3; i >= 0; i--) {
    for (let j = 3; j > 0; j--) {
      if (grid[i][j] === grid[i][j - 1]) {
        let add = parseInt(grid[i][j]) + parseInt(grid[i][j - 1]);

        grid[i][j] = add;
        grid[i][j - 1] = 0;
      }
    }
  }
  Win();
}
