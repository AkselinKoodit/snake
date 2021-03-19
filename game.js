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
let endMessageArea = document.getElementById("placeholder");
let endMessage = document.getElementById("endMessage");

function main(currentTime) {
  endMessageArea.classList.add("invisible");
  if (gameOver) {
    function sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function () {
        this.sound.play();
      };
      this.stop = function () {
        this.sound.pause();
      };
    }
    let endSound = new sound("mixkit-losing.wav");
    endSound.play();
    console.log("Game over!");
    document.getElementById("score").classList.add("invisible");
    endMessage.innerText = `Game over! Your score: ${keepScore()} \nPress any button to restart`;
    endMessageArea.classList.remove("invisible");
    window.addEventListener("keydown", (e) => {
      window.location.reload();
    });
    return;

    // if (
    //   confirm(
    //     "Game over! Your score: " + keepScore() + ". Press ok to restart."
    //   )
    // ) {
    //   window.location.reload();
    // }
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
