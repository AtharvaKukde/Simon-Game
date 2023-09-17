
var buttoncolors = ["red", "green", "blue", "yellow"] ; // color array

// decide 
gameStarted = 0 ;


var level = 0 ; var i = 0 ;

gamePattern = [] ; // to store the random pattern of the game
userClickedPattern = [] ; // to store the pattern(ans) given by the user


// When the site is loaded and Game starts
function nextSequence(){

    level++ ;
    $("h1").text(`Level ${level}`) ;

    var randNo = Math.floor(Math.random()*4) ;
    var randColor = buttoncolors[randNo] ;
    gamePattern.push(randColor) ;// push 

    // animate
    idColorSelected = "#" + randColor ;
    $(idColorSelected).addClass("pressed") ;
    setTimeout(function(){
        $(idColorSelected).removeClass("pressed") ;
    }, 100) ;
    // sound
    var soundFile = "sounds/" + randColor + ".mp3" ;
    console.log(soundFile);
    var myAudio = new Audio(soundFile) ;
    myAudio.play();

    gameStarted=1 ;
    userClickedPattern= [] ;
    i = 0 ;
}

// listen keypress and start when not started
$("body").keypress(function() {
    if (gameStarted==0) {
        nextSequence();
    }
}) ;



// Listen when we completed showing our next color
    // when user clicks
    $(".btn").click(function(event) {
        colorClicked = event.target.id ;
        idColorClicked = "#" + colorClicked ;
        userClickedPattern.push(colorClicked)
        
        // animate
        $(idColorClicked).addClass("pressed") ;
        setTimeout(function() {
            $(idColorClicked).removeClass("pressed") ;
        }, 100)
        // sound
        var soundFile = colorClicked + ".mp3" ;
        var myAudio = new Audio(`sounds/${soundFile}`) ;
        myAudio.play();



        // compare
        var i = userClickedPattern.length - 1;

        // user clicked on correct ans
        if (gamePattern[i] == userClickedPattern[i]) {
            console.log("sucess !") ;

            if (gamePattern.length == userClickedPattern.length) {

                setTimeout(function(){
                        nextSequence() ;
                }, 1000)
            }
        }

        // user clicked on the a wrong ans
        else {
            console.log("Wrong ans");
            $("body").addClass("game-over") ;
            setTimeout(function(){
                $("body").removeClass("game-over") ;
                $("h1").text("Game over, Press any key to restart") ;

                myAudio = new Audio("sounds/wrong.mp3") ;
                myAudio.play() ;

                gameStarted = 0 ;
                gamePattern = [] ;
                userClickedPattern = [] ;
                level = 0 ;
            }, 200)
        }
        
        
    })



