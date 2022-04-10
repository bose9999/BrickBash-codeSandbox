import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");
    this.size = 20;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.game = game;
    this.reset();
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  reset() {
    this.speed = { x: 4, y: -3 };
    this.position = { x: 10, y: 400 };
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // collisions with left and right wall
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // collision with top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // bottom wall collision
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // collision with paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
