const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const blockSize = 10;
let snake = [{ x: 10, y: 10 }];
let food = {
  x: getRandomInt(0, canvas.width / blockSize) * blockSize,
  y: getRandomInt(0, canvas.height / blockSize) * blockSize,
};
let score = 0;
let direction = "right";

function drawBlock(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawSnake() {
  snake.forEach((block) => drawBlock(block.x, block.y));
}

function drawFood() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "right":
      head.x += blockSize;
      break;
    case "left":
      head.x -= blockSize;
      break;
    case "up":
      head.y -= blockSize;
      break;
    case "down":
      head.y += blockSize;
      break;
  }
}
