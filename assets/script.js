// we'll need to make a reference to the html elements with .getElementById("")
var startButton = document.getElementById('start');
var startContainer = document.getElementById('start-container');
var questionContainer = document.getElementById('question-container');
var finalContainer = document.getElementById('final-container');
var timerElement = document.getElementById('timer-count');
var highScoreElement = document.getElementById('highscore');
var finalScoreElement = document.getElementById('finalScore')

var questionHeader = document.getElementById('question-header');
var answerA = document.getElementById('answer-a');
var answerB = document.getElementById('answer-b');
var answerC = document.getElementById('answer-c');
var answerD = document.getElementById('answer-d');

// what question we're currently on
var currentIndex = 0;
var finalScore = 0;
var currentScore = 0;
var timer;
var timerCount;

// we'll have an array of question objects
// each object will have the question itself and 4 answers
var questions = [
    {
        question: "What is JS short for?",
        a: "Cascading Style Sheet",
        b: "JavaScript",
        c: "Ji-Sung-Park",
        d: "None of the Above",
        correct: "JavaScript"
    },
    {
        question: "What number does the index start in an Array?",
        a: "0",
        b: "2",
        c: "1",
        d: "3",
        correct: "0"
    },
    {
        question: "What is one example of a 3rd party API?",
        a: "Python",
        b: "HTML",
        c: "Bootstrap",
        d: "C++",
        correct: "Bootstrap"
    },
    {
        question: "What app do you use to code?",
        a: "Google Chrome",
        b: "VS Code",
        c: "Git Bash",
        d: "Mozilla FireFox",
        correct: "VS Code"
    },
    {
        question: "Where do we store all of our repository?",
        a: "Gitlab",
        b: "Github",
        c: "GitBash",
        d: "GitWash",
        correct: "Github"
    },
]

// create a function that will start as soon as the button is pressed
function startQuiz() {
    //add the hidden class to the original container
    startContainer.setAttribute('class', 'hidden');
    // and remove it from the questions container
    questionContainer.removeAttribute('class');
    timerCount = 50;
    getQuestion();
    startTimer();
}

function questionCorrect () {
    currentScore++;
    setScore()
}

function setScore() {
    highScoreElement.textContent = currentScore;
    localStorage.setItem("Score", currentScore);
    finalScoreElement.textContent = currentScore;
}

function questionWrong () {
    currentScore = currentScore - 1;
    setLoss()
}

function setLoss() {
    highScoreElement.textContent = currentScore = currentScore - 1
    localStorage.setItem("Loss", currentScore)
}
//start a timer when the quiz starts, take off 5 seconds if wrong anwer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            endQuiz();
            clearInterval(timer);
        }
    }, 1000)
}


// populate the html
// create a function that is ran after startquiz
// that takes our questions
// and adds them to the html
function getQuestion() {
    questionHeader.textContent = questions[currentIndex].question
    answerA.textContent = questions[currentIndex].a
    answerB.textContent = questions[currentIndex].b
    answerC.textContent = questions[currentIndex].c
    answerD.textContent = questions[currentIndex].d

    answerA.onclick = checkAnswer
    answerB.onclick = checkAnswer
    answerC.onclick = checkAnswer
    answerD.onclick = checkAnswer
}

// check answer will check the current question
// and if the answer is correct, we'll move on (we'll increase currentIndex and run getQuestion again)
// if the answer is wrong, we'll take time off of the timer
// if it's the end of the questions array, we need to run the final screen (we'll use .hidden)

function checkAnswer(event) {
    var userResponse = event.target.innerHTML;

    if (userResponse === questions[currentIndex].correct) {
        // increment the currentIndex
        currentIndex++
        questionCorrect();
        // if statement that checks if the current index is = to our questions array.length
        if (currentIndex === questions.length) {
            //end quiz
            endQuiz()
            console.log('end quiz');
            // run the endQuiz function
        } else {
            // run the getQuestion function again
            getQuestion();
        }
    } else {
        console.log("wrong");
        currentScore = currentScore - 1
        highScore = currentScore
        timerCount = timerCount - 5
    } console.log(currentScore)
}

// endQuiz will hide the questions container
function endQuiz() {
    questionContainer.setAttribute('class', 'hidden')
    finalContainer.removeAttribute('class')

}
// show the final score container (make this in html)
// whatever the time left will be the high score
// ask for initials
// and save the initials and the score to local storage


// run startquiz when the button is clicked
startButton.onclick = startQuiz