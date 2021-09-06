var gamePattern=[];
var buttoncolors=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});

function nextSequence(){
   userClickedPattern=[];
   level++;
   $("#level-title").text("Level "+level);
   var randomNumber=Math.floor(Math.random()*4);
   var randomChosenColour=buttoncolors[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(pressedcolor){
    if(userClickedPattern[pressedcolor]==gamePattern[pressedcolor]){
        console.log("Success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Failure");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    started=false;
    level=0;
    gamePattern=[];
}