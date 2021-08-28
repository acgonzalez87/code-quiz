var score = 0;
var questionIndex = 0;
var quizTimer = document.querySelector("#quizTimer");
var timer = document.querySelector("#startQuiz");
var quizQuestions = document.querySelector("#quizQuestions");
var container = document.querySelector("#container");

var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var questionCreate = document.createElement("ul");

var questions = [
  {
    title: "The logical operator that represents 'or' is ____.",
    choices: ["||", "OR", "&&", "==="],
    answer: "||",
  },
  {
    title: "The condition in an if/else statement is enclosed within ______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title:
      "A tool used during development and debugging for printing content to the console is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
  {
    title: "Within a loop, what is the 'break' keyword being used for?",
    choices: [
      "break your competitors code",
      "exit the loop immediately",
      "repeat the loop",
      "indicate a stopping condition",
    ],
    answer: "exit the loop immediately",
  },
  {
    title: "What is a DOM?",
    choices: [
      "Data of Mine",
      "Document of Master",
      "Data Object Modal",
      "Document Object Model",
    ],
    answer: "Document Object Model",
  },
];

function render(questionIndex) {
  quizQuestions.innerHTML = "";
  questionCreate.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    var playerQuestion = questions[questionIndex].title;
    var playerChoices = questions[questionIndex].choices;
    quizQuestions.textContent = playerQuestion;
  }

  playerChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    quizQuestions.appendChild(questionCreate);
    questionCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}

function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");

    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent = "Correct! 😀";
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent = "Incorrect! 😖";
    }
  }
  questionIndex++;

  if (questionIndex >= questions.length) {
    quizDone();
    createDiv.textContent =
      "End of quiz! " + "You got a score of " + score + "!";
  } else {
    render(questionIndex);
  }
  quizQuestions.appendChild(createDiv);
}

function quizDone() {
  quizQuestions.innerHTML = "";
  quizTimer.innerHTML = "";

  var createHeader = document.createElement("h1");
  createHeader.setAttribute("id", "createHeader");
  createHeader.textContent = "End of Quiz!";

  quizQuestions.appendChild(createHeader);

  var createFinalScore = document.createElement("p");
  createFinalScore.setAttribute("id", "createFinalScore");

  quizQuestions.appendChild(createFinalScore);

  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP = document.createElement("p");
    clearInterval(holdInterval);
    createFinalScore.textContent = "Your final score is: " + timeRemaining;

    quizQuestions.appendChild(createP);
  }

  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  quizQuestions.appendChild(createInput);

  var createSubmit = document.createElement.length("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "submit");
  createSubmit.textContent = "Submit";

  quizQuestions.appendChild(createSubmit);

  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      window.location.replace("./HighScores.html");
    }
  });
}

timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});
