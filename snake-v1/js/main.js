const canvas    = document.querySelector("#canvas");
const ctx       = canvas.getContext("2d");
const scale     = 10;
const rows      = canvas.height / scale;
const columns   = canvas.width / scale;

var snake;

function Snake() {
  this.x      = 0;
  this.y      = 0;
  this.Speed = 'Left';
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total  = 1;
  this.tail   = [];

  this.draw = function(){
    ctx.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.tail.length; i++){
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function(){
    for (let i = 0; i < this.tail.length - 1; i++){
      this.tail[i] = this.tail[i+1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y};

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.y > canvas.height) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    }
  }

  this.changeDirection = function(direction){
    if (direction != this.Speed) {
      switch(direction){
        case 'Up':
          this.xSpeed = 0;
          this.ySpeed = -scale * 1;
          this.Speed = 'Down';
          break;
        case 'Down':
          this.xSpeed = 0;
          this.ySpeed = scale * 1;
          this.Speed = 'Up';
          break;
        case 'Left':
          this.xSpeed = -scale * 1;
          this.ySpeed = 0;
          this.Speed = 'Right';
          break;
        case 'Right':
          this.xSpeed = scale * 1;
          this.ySpeed = 0;
          this.Speed = 'Left';
          break;
      }
    }

  }

  this.eat = function(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }
  }

  this.myself = function() {
    for (let i = 0; i < this.tail.length; i++){
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        return true;
      }
    }
  }

}

function Fruit(){
  this.x;
  this.y;

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  }

  this.draw = function(){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x, this.y, scale, scale);
  }
}


(function setup(){
  snake = new Snake();
  fruit = new Fruit();

  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    snake.draw();
    fruit.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    if (snake.myself()) {
      snake.x      = 0;
      snake.y      = 0;
      this.Speed   = 'Left';
      snake.xSpeed = scale * 1;
      snake.ySpeed = 0;
      snake.total  = 1;
      snake.tail   = [];
    }

  }, 70)
}());

window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}))
