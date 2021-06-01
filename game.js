var userClickedPattern = []
var gamePattern = []

var buttonColours = ["red", "blue", "green", "yellow"]

var started = false;

var level = 0;

// starting the game

// detecting any keypress
$(document).keypress(function () {
    // only if started is false
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// catching id of the button pressed, and storing in user clicked pattern array
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    // reset user input for every next sequence
    userClickedPattern = [];

    // incresing game level for next sequence
    level++;

    // updating heading for increased level
    $("#level-title").text("Level " + level);

    // creating random index
    var randomNum = Math.floor(Math.random() * 4);
    // choosing random color
    var randomChosenColour = buttonColours[randomNum];
    // pushing color name to empty gamePattern array
    gamePattern.push(randomChosenColour);

    // flash animation to random chosen button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // plays required audio for the color
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

// animate user press
function animatePress(currentColor) {
    // add pressed CSS state
    $("#" + currentColor).addClass("pressed");

    // remove pressed CSS state after 100ms
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// playing sounds on keypress by user
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// game logic

// checking for correct pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct");

        // if ans is correct, and next input is equal to game pattern
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");

        // playing wrong answer's sound

        // var audio = new Audio("sounds/wrong.mp3");
        // audio.play();
        // [alternate to above]
        playSound("wrong");

        // flashing screen red to 200ms
        $("body").addClass("game-over");

        // changing heading
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // resetting flashed screen after 200ms
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // restarting the game
        startOver();
    }
}

// restarting the game after wrong answer
function startOver() {

    // re-initializing everyting
    level = 0;
    gamePattern = [];
    started = false;
}