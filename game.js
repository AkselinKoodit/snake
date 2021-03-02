import {
  update as updateSnake,
  draw as drawSnake,
  snakeSpeed,
  getSnakeHead,
  eatSelf,
} from "./snake.js";

import { update as updateFood, draw as drawFood, keepScore } from "./food.js";

import { intoWall } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("field");

function main(currentTime) {
  if (gameOver) {
    if (
      confirm("You lost! Your score: " + keepScore() + ". Press ok to restart.")
    ) {

        window.location.reload();
 
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  console.log(keepScore());
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = intoWall(getSnakeHead()) || eatSelf();
}
