///game background and character animation

const canvas = document.querySelector("#canvas-0");
const ctx = canvas.getContext("2d");
console.log(canvas);
canvas.width = 800;
canvas.height = 500;
const keys = [];

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
  // if (enemy.frameX < 8) {
  //   enemy.frameX++;
  // } else enemy.frameX = 0.5;
  if (enemy.x < canvas.width + enemy.width) {
    enemy.x += enemy.speed;
  } else {
    enemy.x = 0 - enemy.width;
  }
  requestAnimationFrame(animate);
}
animate();

////key down action
// window.addEventListener("keydown", function (e) {
//   keys[e.keys] = true;
//   console.log(e.keys);
// });

// window.addEventListener("keyup", function (e) {
//   delete keys[e.keys];
// });

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

// function boundry(){
//   if(){

//   }
// }
