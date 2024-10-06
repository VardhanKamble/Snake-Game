const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Size of the grid square
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "";
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;

// Control the snake
document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

// Draw the snake and food on the canvas
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Check if snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
        };
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add new head
    let newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (
        snakeX < 0 ||
        snakeX >= canvas.width ||
        snakeY < 0 ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Your score: " + score);
    }

    snake.unshift(newHead);
}

// Check for collision with snake body
function collision(head, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (head.x == snakeArray[i].x && head.y == snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

// Refresh the game every 100ms
let game = setInterval(drawGame, 100);
