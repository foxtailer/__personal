class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacles = [];
    this.numberOfObstacles = 10;
    this.gravity;
    this.speed;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', e => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });
    //mouse control
    this.canvas.addEventListener('mousedown', e => {
      this.player.flap();
    });
    //keyboard controls
    window.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        this.player.flap();
      }
    });
    //touch controls
    this.canvas.addEventListener('touchstart', e => {
      this.player.flap();
    });
  }

  render(){
    this.background.update();
    this.background.draw();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach(obstacle => {
      obstacle.update();
      obstacle.draw();
    });
  }
  resize(width, height){
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;
    this.ctx.fillStyle = 'gold';
    this.player.flapSpeed = 5 * this.ratio;
    this.speed = 3 * this.ratio;

    this.gravity = 0.1*this.ratio;
    this.player.resize();
    this.background.resize();
    this.createObstacles();
    this.obstacles.forEach(obstacle => {
      obstacle.resize();
    })
  }
  createObstacles(){
    this.obstacles = [];
    const firstX = this.baseHeight * this.ratio;
    const obstacleSpacing = 600 * this.ratio;
    for (let i = 0; i<this.numberOfObstacles; i++){
      this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
    }

  }
};

window.addEventListener('load', function(){
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 720;
  canvas.height = 720;

  const game = new Game(canvas, ctx);
  
  function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    game.render();
    requestAnimationFrame(animate);
  }
  this.requestAnimationFrame(animate);
})