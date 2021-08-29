var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
