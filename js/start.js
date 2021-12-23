const start = document.querySelector("#StartButton");
const splash = document.querySelector("#SplashScreen");
const ctx = document.querySelector("#GameCanvas");

// $("#StartButton").click(function () {
//   $("#SplashScreen").hide();
//   $("#GameCanvas").show();
// });

const game = {
  start: () => {
    // console.log('We are starting a game!')
    canvas.classList.add("hide");
    canvas.classList.remove("hide");
  },
};
