const canvas = document.querySelector("#canvas-0");
const ctx = canvas.getContext("2d");
console.log(canvas);
canvas.width = 800;
canvas.height = 500;
const start = document.querySelector("#StartButton");

const game = {
  start: () => {
    // console.log('We are starting a game!')
    canvas.classList.add("hide");
    canvas.classList.remove("hide");
  },
  playerround: "",
  enemyround: "",
};

const player = {
  x: 60,
  y: 400,
  frameY: 8.7,
  frameX: 0.5,
  /// default about .2-.5 for width of sprite defualt for height 1.8 or 13 or count the rows on the image
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
  /// default about .2-.5 for width of sprite defualt for height 1.8 or 13 or count the rows on the image
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
    // console.log(this.w);
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
    // if (player.w === 0 && player.missle) {
    //   player.alive = false;
    // }
    if (enemy.alive && this.w === 0) {
      newhealth;
      enemyhealth = newhealth;
      this.w = newhealth;
      game.playerround = 1;
      player.alive = false;
      console.log(enemy.alive);
      console.log(game.playerround);
      location.reload();
      alert("enemy wins");
      // console.log(`${this.w} here `);
    } else if (enemy.alive && player.alive) {
      alert("both dead");
    }
    // if (!player.alive && !enemy.alive) {
    //   // location.reload();
    //   ctx.font = "200px comic Sans";
    //   ctx.fillStyle = "gold";
    //   ctx.fillText("game over", 10, 150);
    //   // alert(" game over");
    //   console.log("winn conditoion");
    // }
    // if (player.alive && !enemy.alive) {
    //   alert("game continues ");
    //   console.log("winn conditoion");
    // }
    // if (!enemy.alive && this.w === 0 && !game.enemyround) {
    //   newhealth;
    //   health = newhealth;
    //   this.w = newhealth;
    //   game.enemyround = 1;
    //   game.playerround = 1;
    //   player.alive = false;
    //   console.log(game.enemyround);
    //   alert("endround 2");
    // }

    // if (player.alive && enemy.alive) {
    //   alert("player wins");
    //   console.log("winn conditoion");
    // }
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
background.src = "../images/boss-zone.png";
const enemyImage = new Image();
enemyImage.src = "../images/dr-willy.png";

function drawSprite(img, sx, sy, sw, sh, dx, dy, dw, dh) {
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        console.log("down");
        moveSpritedown();
        // Do something for "down arrow" key press.
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        console.log("up");
        moveSpriteup();
        // Do something for "up arrow" key press.
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        console.log("left");
        moveSpriteleft();
        // Do something for "left arrow" key press.
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        console.log("right");
        moveSpriteright();
        // Do something for "right arrow" key press.
        break;
      case "Enter":
        // Do something for "enter" or "return" key press.
        // const missle = new Missles(player.x, player.y, 30, "blue", null);
        // missle.draw();
        // console.log(missle.draw());
        // animatemissle();
        // console.log(animatemissle());
        // console.log(animate.missle);
        // attaack();

        break;
      case "Esc": // IE/Edge specific value
      case "Escape":
        // Do something for "esc" key press.
        player.missle.push({
          width: 20,
          height: 20,
          x: player.x + 75,
          y: player.y + 40,
          speedx: 20,
          speedy: 20,
        });
        for (let i = 0; i < player.missle.length; i++) {
          if (player.missle[i].x < canvas.width + player.missle[i].x.width) {
            player.missle[i].x += player.speed;
          } else {
            player.missle[i].x += player.speed;
          }

          // player.missle[i].x = player.x;
          // player.missle[i].y = player.y + player.missle[i].y;
          // console.log(player.missle[i].x);
        }

        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
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

/// Collision detection
function collisionplayer(a, b) {
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    console.log("collision");

    enemyHealthbar.updateHealthenemy();
  } else {
    console.log("no collision");
    // playerHealthbar.updateHealthplayer();
  }
}

function collisionenemy(a, b) {
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    console.log("collision");
    playerHealthbar.updateHealthplayer();
    // enemyHealthbar.updateHealthenemy();
  } else {
    console.log("no collision");

    // enemyHealthbar.updateHealthenemy();
  }
}
// game.win();

window.onload = setInterval(animate, 100 * 1000);
