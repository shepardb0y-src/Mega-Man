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
  height: 22.4,
  width: 26.8,
  speed: 9,
  moving: false,
};

const playerSpriteImage = new Image();
playerSpriteImage.src = ".../images/megaman.png";
const background = new Image();
background.src = "../images/boss-zone.png";
console.log(background);

function animate() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}
animate();
