//variables
const quizRules = $("#quiz-rules");
const quizBox = $("#quiz-box");
const scoreBox = $("#score-box");
const startQuiz = $("#start-quiz");
const highScores = $("#high-scores-box");

//================ Home Page ================
//quiz box & score box hidden
function homePage() {
    $(quizRules).show(); //quiz rules should show at home
    $(quizBox).hide();
    $(scoreBox).hide();
    $(highScores).hide();
}


//================ Quiz Event ================
//relevant variables defined
const questionTitle = $("#quiz-questions");
const btnOne = $("#button-one");
const btnTwo = $("#button-two");
const btnThree = $("#button-three");
const btnFour = $("#button-four");
const questChoices = $("question-choices");
let timerInterval = 0;
let totalTime = 30;
let i = 0;

function quizEvent() {
    //quiz box shows & quiz rules & score box still hidden
    $(quizBox).show();
    $(quizRules).hide();
    $(questionTitle).empty();
    
    //timer
    timerInterval = setInterval(function() {
        totalTime--;
        $("#countdown-timer").text(totalTime + "sec");
        showQuestion();

        if(totalTime === 0) {
            showScores();
        }
    }, 1000);
};

function showQuestion() {
    $(questionTitle).text("");
    $(btnOne).text("");
    $(btnTwo).text("");
    $(btnThree).text("");
    $(btnFour).text("");

    $(questionTitle).text(JSON.stringify(questionsArray[i].quest));
    //append answer choice to the coorisponding buttons
    $(btnOne).append(JSON.stringify(questionsArray[i].choice[0])); //appends answer choices to buttons from an object as a string
    $(btnTwo).append(JSON.stringify(questionsArray[i].choice[1])); 
    $(btnThree).append(JSON.stringify(questionsArray[i].choice[2])); 
    $(btnFour).append(JSON.stringify(questionsArray[i].choice[3])); 
};



//questions
//object/array format so easier to access 
const questionsArray = [
    {
        quest: "What is not an example of a logical operator?",
        choice: ["||", "&&", "!", "***"],
        ans: "***"
    },
    {
        quest: "What is an array's values encompassed in?",
        choice: [".value.", "<value>", "$value$", "[value]"],
        ans: "[value]"
    },
    {
        quest: "What language is used to dynamically style and insert elements?",
        choice: ["JavaScript", "Java", "HTML", "Fetch API"],
        ans: "JavaScript"
    },
    {
        quest: "What is used to denote an element in JavaScript?",
        choice: ["camelCasing", "tallManLettering", "ScriptCASING", "javaCasing"],
        ans: "camelCasing"
    },
    {
        quest: "What is the name of a common JavaScript library used to simplify JavaScript programming?",
        choice: ["Bootstrap", "jQuery", "Facebook", "CSS"],
        ans: "jQuery"
    },
    {
        quest: "What does JS stand for?",
        choice: ["JavaScreen", "JavaStyle", "JavaShow", "JavaScript"],
        ans: "JavaScript"
    }
];

//click answer event listener
$(".answer-button").on("click", function() {
    if (i > 4) {
        clearInterval(timerInterval);
        showScores();
    } else {
        showQuestion();
        i++; 
    };
});

function calculateScore (ans) {
    if (ans = questionsArray[i].choice) {
        //add to score/time
        totalTime += 5;
    } else {
        //reduce score/time
        totalTime -= 5; 
    }

    

}
//check if user answer choice is correct
//================ End of Quiz ================
//relevant variables
const finalScore = $("#final-score");

//quiz box hiden & score box appears
function showScores() {
    $(quizBox).hide();
    $(scoreBox).show();

    $(finalScore).empty();
    $(finalScore).text("Final Score: " + totalTime); //time left at end of quiz equals the score
};


//================ Store Scores ================
const submitScore = $("#submit-score");

//submit button event listener
$(submitScore).on("click", ".input", saveUserInput());

function saveUserInput() {
    let userInput = $(".input").val;
    showHighScores(userInput);
    
}

//================ Display High Scores ================
//relevant variables
let goBack = $("#go-back"); //button for going back to home page
let clearScores = $("#clear-scores"); //button for clear the list of high scores

function showHighScores(userInput, totalTime) {
    $(scoreBox).hide();
    $(highScores).show();
    $("#ul").append("<li>" + userInput + "-" + totalTime + "</li>");

}


//================ Event Listeners ================
homePage();
//click start button --> quiz event happens
$(startQuiz).on("click", quizEvent);



//submit score button

//go back & clear high scores buttons
