var score = 0;
var timerEl = document.getElementById('timer');
var startBtn = document.getElementById('start');
var wrapperEl = document.getElementById('wrapper');
var quizEl = document.getElementById('quiz');
var timeLeft = 75;
var lastQuestion = false;
var choices = document.getElementById("choices");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var currentIndex = 0;
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var userInput = document.getElementById("initials");
var scoreBoard = document.getElementById("score-screen");
var scoreList = document.getElementById('score-results');
var clear = document.getElementById("clear");
var playAgain = document.getElementById("playAgain");

var quizQuestions = [{
    question: "Commonly used data types DO NOT include:",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "alerts",
    choiceD: "numbers",
    correct: "choiceC"
},
{
    question: "The condition in an if / else statement is enclosed with ____________.",
    choiceA: "quotes",
    choiceB: "curly brackets",
    choiceC: "parenthesis",
    choiceD: "square brackets",
    correct: "choiceC"
},
{
    question: "String values must be enclosed within _______ when being assigned to variables",
    choiceA: "commas",
    choiceB: "quotes",
    choiceC: "curly brackets",
    choiceD: "parenthesis",
    correct: "choiceB"
},
{
    question: "Arrays in JavaScript can be used to store ___________.",
    choiceA: "numbers and strings",
    choiceB: "other arrays",
    choiceC: "booleans",
    choiceD: "all of the above",
    correct: "choiceD"
},
{
    question: "A very useful toll used during development and debugging for printing content to the debugger is:",
    choiceA: "console.log",
    choiceB: "terminal/bash",
    choiceC: "for loops",
    choiceD: "JavaScript",
    correct: "choiceA"
}]
 
function countdown() {
 
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = 'Time Left: ' + timeLeft;
            if (lastQuestion) return clearInterval(timeInterval);
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            quizOver();
        }
    }, 1000);
    quizDisplay(currentIndex);
};

 
function quizDisplay(index) {
    quizEl.innerHTML = quizQuestions[index].question;
    startBtn.remove();
    choices.style.display = "inline-block";
    choiceA.innerHTML = quizQuestions[index].choiceA;
    choiceB.innerHTML = quizQuestions[index].choiceB;
    choiceC.innerHTML = quizQuestions[index].choiceC;
    choiceD.innerHTML = quizQuestions[index].choiceD;
};
 

choiceA.addEventListener("click", checkAnswer);
choiceB.addEventListener("click", checkAnswer);
choiceC.addEventListener("click", checkAnswer);
choiceD.addEventListener("click", checkAnswer);
var result = document.getElementById("result");
 
function checkAnswer(e) {

    var userInput = e.target.id;
    if (userInput === quizQuestions[currentIndex].correct) {
        result.innerHTML = "CORRECT!";
        console.log("correct!");
 
    } else {
        result.innerHTML = "WRONG";
        timeLeft -= 20;
        console.log("wrong");
 
    }
    currentIndex++;
 
    if (currentIndex === quizQuestions.length || timeLeft === 0) {
        quizOver();
 
    } else {
 
        setTimeout(function () {
            quizDisplay(currentIndex);
            result.innerHTML = "";
        }, 500);
    }
};
 
function quizOver() {
    quizEl.remove();
    choices.remove();
    result.remove();
    lastQuestion = true;
    endScreen.classList.remove('hide');
    finalScore.innerHTML = timeLeft;
 
    var submit = document.getElementById("submit")
        submit.addEventListener("click", function highscore() {
        var userInitials = userInput.value;
        if (userInitials === null) {
            alert("Please add Initials")
            return;
        } else {
            var finalScore = {
                initials: userInitials,
                score: timeLeft
            };
            console.log(finalScore);
            var userScore = localStorage.getItem('userScore');
            if (userScore === null) {
                userScore = [];
            } else {
                userScore = JSON.parse(userScore);
            }
            userScore.push(finalScore);
            var newScore = JSON.stringify(userScore);
            localStorage.setItem("userScore", newScore);
            score();
        }
    })
 
};

function score() {
    endScreen.classList.add('hide');
    scoreBoard.classList.remove('hide');

    var userScore = localStorage.getItem("userScore");
    userScore = JSON.parse(userScore);
    console.log(userScore);

    if (userScore !== null) {
        for (var i = 0; i < userScore.length; i++) {
            var createLi = document.createElement("li");
            createLi.innerText = userScore[i].initials + " " + userScore[i].score;
            scoreList.appendChild(createLi);
        }
    }
};
 
clear.addEventListener("click", function clearScore() {
    window.localStorage.clear();
    scoreList.remove();
});

playAgain.addEventListener("click", function playAgain() {
    location.reload();
})
 
startBtn.onclick = countdown;