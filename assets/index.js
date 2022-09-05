

// DOM Elements 

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesE1 = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#startbutton");
var initialsEl = document.querySelector("#initials")
var feedbackEl = document.querySelector("#feedback");

// quiz state variables

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {

    //hide start screen
    var startscreenEl = document.getElementById("welcomescreen");
    startscreenEl.setAttribute("class", "hide");

    //unhide questions sections
    questionsEl.removeAttribute("class");

    //start timer

    timerEl.textContent = time;
    clockTick();
    getQuestion();
}

function getQuestion(){
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    //update title with current question
    var titleE1 = document.getElementById("questions-title");
    titleE1.textContent = currentQuestion.title;

    //clear out any old question choices
    choicesE1.innerHTML = "";
    //loop over choices
    currentQuestion.choices.forEach(function(choice, i){
        // create new button for each choice 
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice")
        choiceNode.setAttribute("value", choice)

        choiceNode.textContent = i + 1 + ". " + choice;

        //attach click event listener to each choice
        choiceNode.addEventListener("click", questionClick);
        
        // display on the page
        choicesE1.appendChild(choiceNode);
    });
}

function questionClick() {
    //check user choice(if it is wrong)
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 10;

        if (time < 0) {
            time = 0;
        }

        //display new time on page
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong";
        feedbackEl.style.color =  "red";
        feedbackEl.style.fontsize = "400%";
    } else 
    {feedbackEl.textContent = "Correct";
    feedbackEl.style.color =  "Green";
    feedbackEl.style.fontsize = "400%";}

    feedbackEl.setAttribute("class" , "feedback");
        setTimeout(function() {
            feedbackEl.setAttribute("class", "feedback hide");
        }, 500);
   

    // next question
    currentQuestionIndex++;

    // time checker
    if (currentQuestionIndex === questions.length) {
        quizend();
    } else {
        getQuestion();
    }
}

function quizend() {
    // stop timer
    clearInterval(timerId);
    timerEl.setAttribute("class", "hide");

    // show end screen
    var endScreenEl = document.getElementById("finalscreen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function timeEnd() {
    // show end screen
    var endScreenEl = document.getElementById("finalscreen");
    endScreenEl.removeAttribute("class");
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    // hide questions section
    questionsEl.setAttribute("class", "hide");
 }

function clockTick() {
    //update time
    var timeinterval = setInterval(function(){
        time--;
        timerEl.textContent = time;
    
        //check if user ran out of time
        if (time <= 0) {
            timeEnd();
            clearInterval(timeinterval);
        }
    }, 1000)
   
}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set empty array
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        //save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;