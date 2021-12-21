///game background and character animation

const canvas = document.querySelector("#canvas-0");
const ctx = canvas.getContext("2d");
console.log(canvas);
canvas.width = 800;
canvas.height = 500;

const player = {
  x: 60,
  y: 100,
  frameY: 8.7,
  frameX: 0.5,
  /// default about .2-.5 for width of sprite defualt for height 1.8 or 13 or count the rows on the image
  height: 100,
  width: 100,
  speed: 9,
  moving: false,
  missles: [],
  // shoot(array) {
  //   for (let i = 0; i < array.missles.length; i++) {
  //     array.missles.push(new Missles(4, 5, 0, 0, 100, 80, 9, true));
  //     console.log(array.missles);
  //   }
  // },
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
};
class Missles {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// const missle = new Missles(player.x, player.y, 30, "blue", null);
// missle.draw();
let misslescahe = [];

// function intitateMissles() {
//   for (let i = 0; i < player.missles.length; i++) {
//     player.missles.push(new Missles(4, 5, 0, 0, 100, 80, 9, true));
//     console.log(player.missles);
//   }
// }
// intitateMissles();

// function handlemissels() {
//   for (let i = 0; i < misslescahe.length; i++) {
//     misslescahe[i].draw();
//   }
// }
// intitateMissles();
const playerSpriteImage = new Image();
playerSpriteImage.src = "../images/megaman.png";
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
  const missle = new Missles(player.x, player.y, 30, "blue", null);
  console.log(missle);
  missle.draw();
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

  // if (enemy.frameX < 10) {
  //   enemy.frameX++;
  // } else enemy.frameX = 0.5;
  if (enemy.x < canvas.width + enemy.width) {
    enemy.x += enemy.speed;
  } else {
    enemy.x = 0 - enemy.width;
  }

  requestAnimationFrame(animate);
  collision(player, enemy);

  // intitateMissles();
}
animate();
////key down action
const missle = new Missles(player.x, player.y, 30, "blue", null);
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
        break;
      case "Esc": // IE/Edge specific value
      case "Escape":
        // Do something for "esc" key press.
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);

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
function collision(a, b) {
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    console.log("collision");
  } else {
    console.log("no collision");
  }
}

window.onload = setInterval(animate, 100 * 1000);
