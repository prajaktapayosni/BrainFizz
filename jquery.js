
// ===============================
// BRAIN FIZZ - QUIZ QUESTIONS
// ===============================

const allQuestions = {
    Easy: [
        {
            question: "🧩 What has hands but can’t clap?",
            options: ["Clock", "Fan", "Door", "Robot"],
            answer: 0
        },
        {
            question: "🍬 What has to be broken before you can use it?",
            options: ["Glass", "Mirror", "Egg", "Code"],
            answer: 2
        },
        {
            question: "🌼 Which color is a mix of red and white?",
            options: ["Pink", "Purple", "Green", "Orange"],
            answer: 0
        },
        {
            question: "👣 How many legs does a spider have?",
            options: ["6", "8", "10", "12"],
            answer: 1
        },
        {
            question: "📚 What is 5 + 3?",
            options: ["7", "8", "9", "10"],
            answer: 1
        }
    ],

    Medium: [
        {
            question: "🌍 Which planet spins the fastest?",
            options: ["Jupiter", "Mars", "Earth", "Saturn"],
            answer: 0
        },
        {
            question: "🦉 Which bird can fly backward?",
            options: ["Parrot", "Crow", "Hummingbird", "Owl"],
            answer: 2
        },
        {
            question: "🍕 Which food is shaped like a triangle?",
            options: ["Pizza", "Burger", "Dosa", "Cake"],
            answer: 0
        },
        {
            question: "💡 What invention lets you look right through a wall?",
            options: ["Glass", "Window", "X-ray", "Camera"],
            answer: 1
        },
        {
            question: "🌧️ What comes down but never goes up?",
            options: ["Rain", "Smoke", "Shadow", "Sunlight"],
            answer: 0
        }
    ],

    Hard: [
        {
            question: "🧠 What comes once in a minute, twice in a moment, but never in a thousand years?",
            options: ["Time", "Letter M", "Shadow", "Breath"],
            answer: 1
        },
        {
            question: "🧩 The more of me you take, the more you leave behind. What am I?",
            options: ["Shadow", "Air", "Footsteps", "Memory"],
            answer: 2
        },
        {
            question: "🔢 What 3-digit number reads the same backward?",
            options: ["101", "202", "212", "All of the above"],
            answer: 3
        },
        {
            question: "🎶 What has many keys but can’t open a single lock?",
            options: ["Keyboard", "Piano", "Locksmith", "Flute"],
            answer: 1
        },
        {
            question: "🌫️ What disappears as soon as you say its name?",
            options: ["Silence", "Dark", "Fog", "Ghost"],
            answer: 0
        }
    ]
};


// ===============================
// GLOBAL VARIABLES
// ===============================

let currentLevel = "";
let current = 0;
let score = 0;
let timer;
let timeLeft = 10;
let quizData = [];
let isAnswering = false;


// ===============================
// START QUIZ
// ===============================

function startQuiz(level) {

    currentLevel = level;
    quizData = allQuestions[level];

    $("#start-screen").hide();
    $("#quiz-screen").show();

    current = 0;
    score = 0;

    $("#result").empty();

    showQuestion();
}


// ===============================
// DISPLAY QUESTION
// ===============================

function showQuestion() {

    const q = quizData[current];

    $("#question").text(q.question);

    $("#difficulty").text("Difficulty: " + currentLevel);

    $("#options").empty();

    // Display options using jQuery

    $.each(q.options, function(index, option) {

        const optionHTML = `
            <div>
                <label>
                    <input type="radio" name="option" value="${index}">
                    ${option}
                </label>
            </div>
        `;

        $("#options").append(optionHTML);

    });

    $("#submitBtn").show();

    isAnswering = false;

    startTimer();
}


// ===============================
// START TIMER
// ===============================

function startTimer() {

    clearInterval(timer);

    timeLeft = 10;

    $("#timer").text("Time Left: " + timeLeft + "s");

    timer = setInterval(function() {

        timeLeft--;

        $("#timer").text("Time Left: " + timeLeft + "s");

        if (timeLeft <= 0) {

            clearInterval(timer);

            handleSubmit();

        }

    }, 1000);
}


// ===============================
// HANDLE SUBMIT
// ===============================

function handleSubmit() {

    if (isAnswering || current >= quizData.length) {
        return;
    }

    isAnswering = true;

    clearInterval(timer);

    const selected = $('input[name="option"]:checked');

    const correct = quizData[current].answer;

    if (selected.length > 0 && parseInt(selected.val()) === correct) {

        // Correct answer sound

        $("#correctSound").get(0).currentTime = 0;
        $("#correctSound").get(0).play();

        score++;

        $("#result").text("✅ Correct! 🎉");

    } else {

        // Wrong answer sound

        $("#wrongSound").get(0).currentTime = 0;
        $("#wrongSound").get(0).play();

        $("#result").text(
            "❌ Oops! Correct: " + quizData[current].options[correct]
        );

    }

    current++;

    setTimeout(function() {

        $("#result").empty();

        if (current < quizData.length) {

            showQuestion();

        } else {

            showResult();

        }

    }, 1500);
}


// ===============================
// SHOW FINAL RESULT
// ===============================

function showResult() {

    $("#question").text("🎯 Quiz Over!");

    $("#options").empty();

    $("#difficulty").empty();

    $("#timer").empty();

    $("#submitBtn").hide();

    $("#playAgainBtn").show();

    $("#result").html(
        `✨ You scored <strong>${score}</strong> out of
        <strong>${quizData.length}</strong> 🎉`
    );
}


// ===============================
// GO BACK TO HOME
// ===============================

function goToHome() {

    clearInterval(timer);

    $("#quiz-screen").hide();

    $("#start-screen").show();

    $("#playAgainBtn").hide();

    $("#submitBtn").show();

    $("#result").empty();

    $("#question").text("Loading...");

    $("#options").empty();

    $("#difficulty").empty();

    $("#timer").text("Time Left: 10s");

    current = 0;

    score = 0;

    isAnswering = false;
}


// ===============================
// JQUERY DOCUMENT READY
// ===============================

$(document).ready(function() {

    // Difficulty level buttons

    $(".level-btn").click(function() {

        const level = $(this).data("level");

        startQuiz(level);

    });


    // Submit button

    $("#quizForm").submit(function(event) {

        event.preventDefault();

        handleSubmit();

    });


    // Play Again button

    $("#playAgainBtn").click(function() {

        goToHome();

    });

});
