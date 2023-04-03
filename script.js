// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const blockSize = 10;

// Snake setup
let snake = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
];
let direction = "right";

// Food setup
let food = getRandomFood();

// Game state
let score = 0;
let gameLoopId;

function getRandomFood() {
  return {
    x: Math.floor((Math.random() * canvas.width) / blockSize),
    y: Math.floor((Math.random() * canvas.height) / blockSize),
  };
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      snake[i].x * blockSize,
      snake[i].y * blockSize,
      blockSize,
      blockSize
    );
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = getRandomFood();
    score++;
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  // Check collision with walls
  if (
    head.x < 0 ||
    head.x >= canvas.width / blockSize ||
    head.y < 0 ||
    head.y >= canvas.height / blockSize
  ) {
    endGame();
    return;
  }

  // Check collision with self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
      return;
    }
  }
}

function endGame() {
  clearInterval(gameLoopId);
  alert(`Game over!\nYour score: ${score}`);
  location.reload();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();

  document.getElementById("score").textContent = `Score: ${score}`;
}

// Start the game loop
gameLoopId = setInterval(gameLoop, 100);

// Listen for keyboard input
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyPressed = event.keyCode;

  switch (keyPressed) {
    case 38:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 40:
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case 37:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 39:
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
}
