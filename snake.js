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
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: getRandomInt(0, canvas.width / blockSize) * blockSize,
      y: getRandomInt(0, canvas.height / blockSize) * blockSize,
    };
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  switch (event.keyCode) {
    case 37:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 38:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 39:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 40:
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
}

function gameOver() {
  clearInterval(gameLoop);
  alert(`Game over! Your score is ${score}`);
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    gameOver();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

document.addEventListener("keydown", changeDirection);
const gameLoop = setInterval(gameLoop, 100);
