(function(){

  var canvas = document.createElement('canvas'),
  ctx =canvas.getContext('2d'),
  w = canvas.width    = innerWidth,
  h = canvas.height   = innerHeight,
  particles           = [],
  properties          = {
    bgColor             : 'rgba(17, 17, 19, 1)',
    particleColor       : '255, 40, 40',
    lineStyle           : '255, 40, 40',
    particleRadius      : 10,
    lineWidth           : '0.5',
    particleCount       : 150,
    particleMaxVelocity : 1,
    lineLength          : 150,
    particleLife        : 60,
    particleMinLife     : 10,
  };

  document.querySelector('body').appendChild(canvas);
  canvas.id = 'canvas';
  var canvas = document.getElementById('canvas');

  window.onresize = function() {
    w = canvas.width    = innerWidth,
    h = canvas.height   = innerHeight;
  }

  let mouse = {
    x     : null,
    y     : null,
    radius: 150,
  }

  window.addEventListener('mousemove',
    (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    }
  )

  class Particle{
    constructor() {
      this.x                  = Math.random() * w;
      this.y                  = Math.random() * h;
      this.velocityX          = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.velocityY          = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.life               = Math.random() * (properties.particleLife * 60 - properties.particleMinLife * 60) + properties.particleMinLife * 60;
      this.particleRadiusLife = (properties.particleRadius - this.life / (properties.particleLife * 60) * (properties.particleRadius - 0.5)) > (properties.particleRadius - 0.5) ? properties.particleRadius - 0.5 : properties.particleRadius - this.life / (properties.particleLife * 60) * (properties.particleRadius - 0.5);
    }
    position(){
      this.x  + this.velocityX + this.particleRadiusLife > w && this.velocityX > 0 || this.x + this.velocityX - this.particleRadiusLife < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
      this.y  + this.velocityY + this.particleRadiusLife > h && this.velocityY > 0 || this.y + this.velocityY - this.particleRadiusLife < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
      this.x  += this.velocityX;
      this.y  += this.velocityY;

      let distance = Math.sqrt(Math.pow(mouse.x - this.x ,2) + Math.pow(mouse.y - this.y ,2));

      if (distance < mouse.radius ) {

        let v_x = (mouse.radius - distance)*Math.cos(Math.atan((this.y - mouse.y) / (this.x - mouse.x)));
        let v_y = (mouse.radius - distance)*Math.sin(Math.atan((this.y - mouse.y) / (this.x - mouse.x)));


        if (mouse.x < this.x && mouse.y < this.y) {
          this.x += v_x;
          this.y += v_y;

        }
        if (mouse.x > this.x && mouse.y > this.y) {
          this.x -= v_x;
          this.y -= v_y;

        }
        if (mouse.x < this.x && mouse.y > this.y) {
          this.x -= -v_x;
          this.y -= -v_y;

        }
        if (mouse.x > this.x && mouse.y < this.y) {
          this.x += -v_x;
          this.y += -v_y;
        }

     }
    }
    reDraw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius - this.particleRadiusLife < 0 ? 0 : properties.particleRadius - this.particleRadiusLife, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(' + properties.particleColor + ', 1)';
      ctx.fill();
    }
    reCalculateLife(){
      if (this.life < 1) {
        this.x          = Math.random() * w;
        this.y          = Math.random() * h;
        this.velocityX  = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY  = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life       = Math.random() * (properties.particleLife * 60 - properties.particleMinLife * 60) + properties.particleMinLife * 60;
      }
      this.life--;
      this.particleRadiusLife = (properties.particleRadius - this.life / (properties.particleLife * 60) * (properties.particleRadius - 0.5)) > (properties.particleRadius - 0.5) ? properties.particleRadius - 0.5 : properties.particleRadius - this.life / (properties.particleLife * 60) * (properties.particleRadius - 0.5);
    }
  }

///////////

  class AddParticle extends Particle {
    constructor(clientX, clientY) {
      super();
      this.x          = clientX;
      this.y          = clientY;
      this.life       = properties.particleLife * 60;
    }
  }

  function addParticles(e) {
    particles.push(new AddParticle(e.clientX, e.clientY));
  }

  canvas.addEventListener('click', addParticles);

  /////////////

  function reDrawBackground() {
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, w, h);
  }

  function drawLines() {
    var x1, y1, x2, x2, length, opacity;
    for (var i in particles) {
      for (var j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length <properties.lineLength) {
          opacity         = 1 - length / properties.lineLength;
          ctx.lineWidth   = properties.lineWidth;
          ctx.strokeStyle = 'rgba(' + properties.lineStyle + ', '+ opacity +')';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for (var i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    reDrawBackground();
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
  }

  function init() {
    for (var i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle);
    }
    console.log(particles);
    loop();
  }

  init();

}())
