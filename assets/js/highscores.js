var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

var totalScores = localStorage.getItem("totalScores");
totalScores = JSON.parse(totalScores);

if (totalScores !== null) {
  for (var i = 0; i < totalScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = totalScores[i].initials + " " + totalScores[i].score;
    highScore.appendChild(createLi);
  }
}

back.addEventListener("click", function () {
  window.history.back();
});
