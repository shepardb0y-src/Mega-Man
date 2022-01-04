const canvas = document.querySelector("#canvas-0");
const ctx = canvas.getContext("2d");
console.log(canvas);
canvas.width = 800;
canvas.height = 500;
const start = document.querySelector("#StartButton");
const game = {
  start: () => {
    canvas.classList.add("hide");
    canvas.classList.remove("hide");
  },
};

const player = {
  x: 60,
  y: 400,
  frameY: 8.7,
  frameX: 0.5,
  height: 100,
  width: 100,
  speed: 9,
  moving: false,
  alive: true,
  missle: [],
  m: [],
};

const enemy = {
  x: 620,
  y: 200,
  frameY: 0,
  frameX: 0,
  height: 100,
  width: 80,
  speed: 9,
  moving: false,
  alive: true,
};

class Healthbar {
  constructor(x, y, w, h, maxHealth, color, health) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.maxHealth = maxHealth;
    this.maxWidth = w;
    this.color = color;
    this.health = health;
  }
  show(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.maxWidth, this.h);
  }
  updateHealthplayer(val) {
    health = val;
    this.w = this.w - 2;

    health = this.w;
    console.log(health);
    if (health <= 0) {
      playerHealthbar.restartplayer();
    }
  }
  updateHealthenemy(val) {
    enemyhealth = val;
    this.w = this.w - 5;
    enemyhealth = this.w;
    console.log(health);
    if (enemyhealth <= 0) {
      enemyHealthbar.restartenemy();
    }
  }
  restartplayer() {
    if (enemy.alive && this.w === 0) {
      newhealth;
      enemyhealth = newhealth;
      this.w = newhealth;
      game.playerround = 1;
      player.alive = false;
      console.log(enemy.alive);
      console.log(game.playerround);
      ctx.font = "200px comic Sans";
      ctx.fillStyle = "orange";
      ctx.fillText("game over", 10, 300);
      location.reload();
      alert("enemy wins");
    }
  }
  restartenemy() {
    if (player.alive && this.w === 0) {
      newhealth;
      enemyhealth = newhealth;
      this.w = newhealth;
      game.playerround = 1;
      enemy.alive = false;
      console.log(enemy.alive);
      console.log(game.playerround);
      ctx.font = "200px comic Sans";
      ctx.fillStyle = "orange";
      ctx.fillText("game over", 10, 300);
      location.reload();

      alert("player wins");
    }
  }
}

let newhealth = 200;
let health = 100;
const healthbarWidth = 200;
const healthbarheight = 30;
const x = 20;
const y = 25;
const playerHealthbar = new Healthbar(
  x,
  y,
  healthbarWidth,
  healthbarheight,
  health,
  "green"
);
let enemyhealth = 300;
const enemyHealthbar = new Healthbar(
  580,
  25,
  healthbarWidth,
  healthbarheight,
  enemyhealth,
  "red"
);

const playerSpriteImage = new Image();
playerSpriteImage.src =
  "http://www.sprites-inc.co.uk/files/Classic/Megaman/MvC/m-mmmcsheet.gif";
const background = new Image();
background.src =
  "http://www.sprites-inc.co.uk/files/Classic/RMCW/Backgrounds/bg1.gif";
const enemyImage = new Image();
enemyImage.src =
  "http://www.sprites-inc.co.uk/files/Zero/Weil/Battle_Armour_1/zero_z4weil_final_1.png";

function drawSprite(img, sx, sy, sw, sh, dx, dy, dw, dh) {
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function animate() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawSprite(
    playerSpriteImage,
    player.width * player.frameX,
    player.height * player.frameY,
    // 0,
    // 0,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );

  drawSprite(
    enemyImage,
    enemy.width * enemy.frameX,
    enemy.height * enemy.frameY,
    // 0,
    // 0,
    enemy.width,
    enemy.height,
    enemy.x,
    enemy.y,
    enemy.width,
    enemy.height
  );
  playerHealthbar.show(ctx);
  enemyHealthbar.show(ctx);
  ctx.font = "30px comic Sans";
  ctx.fillStyle = "gold";
  ctx.fillText("Mega-Man", 11, 21);
  ctx.font = "30px Arial";
  ctx.fillText("Dr.Willy", 680, 25);

  if (enemy.x < canvas.width + enemy.width) {
    enemy.x += enemy.speed;
  } else {
    enemy.x = 0 - enemy.width;
  }
  drawMissle();
  for (let i = 0; i < player.missle.length; i++) {
    player.m = player.missle[i];
  }
  movemissle();
  collisionenemy(enemy, player);
  collisionplayer(player.m, enemy);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "Down":
      case "ArrowDown":
        console.log("down");
        moveSpritedown();

        break;
      case "Up":
      case "ArrowUp":
        console.log("up");
        moveSpriteup();

        break;
      case "Left":
      case "ArrowLeft":
        console.log("left");
        moveSpriteleft();

        break;
      case "Right":
      case "ArrowRight":
        console.log("right");
        moveSpriteright();

        break;
      case "Enter":
        break;
      case "Esc":
      case "Escape":
        player.missle.push({
          width: 20,
          height: 20,
          x: player.x + 75,
          y: player.y + 40,
          speedx: 20,
          speedy: 20,
        });
        break;
      default:
        return;
    }
    event.preventDefault();
  },
  true
);

function drawMissle() {
  if (player.missle.length)
    for (let i = 0; i < player.missle.length; i++) {
      ctx.fillStyle = "#f00";
      ctx.fillRect(
        player.missle[i].x,
        player.missle[i].y,
        player.missle[i].width,
        player.missle[i].height
      );
    }
}
function movemissle() {
  for (let i = 0; i < player.missle.length; i++) {
    if (player.missle[i].x > 10) {
      player.missle[i].x += player.missle[i].speedx;
    }
  }
}
function moveSpriteup(param) {
  if (player.y > 0) {
    player.y -= player.speed;
    player.frameX = 0.759;
    player.frameY = 3.56;
  }
}

function moveSpritedown(param) {
  if (player.y < 400) {
    player.y += player.speed;
    player.frameX = 0.5;
    player.frameY = 8.7;
  }
}

function moveSpriteleft(param) {
  if (player.x > 5) {
    player.x -= player.speed;
    player.frameX = 5;
    player.frameY = 23.2;
  }
}
function moveSpriteright(param) {
  if (player.x < 700) {
    player.x += player.speed;
    player.frameX = 0.9;
    player.frameY = 2.532;
  }
}

function collisionplayer(a, b) {
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    enemyHealthbar.updateHealthenemy();
  }
}

function collisionenemy(a, b) {
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    playerHealthbar.updateHealthplayer();
  }
}

window.onload = setInterval(animate, 100 * 1000);
