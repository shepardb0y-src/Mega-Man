const canvas = document.querySelector("#canvas-0");
const ctx = canvas.getContext("2d");
console.log(canvas);
canvas.width = 800;
canvas.height = 500;
const keys = [];

const player = {
  x: 0,
  y: 0,
  framX: 0,
  frameY: 0,
  height: 100,
  width: 53,
  speed: 9,
  moving: false,
};

const playerSpriteImage = new Image();
playerSpriteImage.src = "../images/megaman.png";
const background = new Image();
background.src = "../images/boss-zone.png";
console.log(background);

function drawSprite(img, sx, sy, sw, sh, dx, dy, dw, dh) {
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawSprite(
    playerSpriteImage,
    0,
    0,
    player.width,
    player.height,
    200,
    150,
    player.width,
    player.height
  );
  requestAnimationFrame(animate);
}
animate();
