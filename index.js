var buttonColors = ["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];

var level = 0; // to indicate current level of player
var started = false; // to check whether game has started or not

//any key press will start the game
$(document).keypress(function(event){
	if(!started){		
		started = true;;
		nextSequence();
	}
});

// if colored-tiles are clicked then play sound and check if its in correct sequence
$(".colored-tiles").click(function(event){
	var userColorChosen = $(this).attr('id');
	playSound(userColorChosen);
	animatePress(userColorChosen);
	userClickedPattern.push(userColorChosen);
	check(userClickedPattern.length-1);
});

//will check each tile in order they are pressed 
function check(pos) {
	if(userClickedPattern[pos] == gamePattern[pos] ){
  		if(userClickedPattern.length == gamePattern.length){ // user has successfully completed current level;
  			setTimeout(function(){
  				if(level >= 2) shuffle_buttons(); // shuffle start after level 2 
  			},100);
   			setTimeout(function(){
  				nextSequence();   //game completed successfully, so gives next tile in sequence
  			},1000);
  		}
  	}
  	else{                            // user has failed this level, so reset all values to initial i.e start of game
  		startOver();
  	}
}


function shuffle_buttons(){
	var colors = ["red","yellow","blue","green"];
    var allButtons = $(".colored-tiles");
    colors.sort(() => Math.random() - 0.5);    // function to shuffle colors , in which they get displayed on screen
    for(var i = 0; i < allButtons.length;i++){
        var idandclass = $(allButtons[i]).attr('id');
        $("#"+idandclass).removeClass(idandclass);  
        $("#"+idandclass).addClass(colors[i]);   //change class of each tile
    }
    for(var i=0;i<colors.length;i++){
        $("."+colors[i]).attr('id',colors[i]);  //change id of each tile
    }
}

//if player lost call this function
function startOver() {
	level = 0;
	started = false;
	gamePattern = [];
	userClickedPattern = [];
	$("#level-title").html("<button type='button' id='game-btn' class='btn btn-lg btn-dark' " +
	 " onclick='nextSequence()'> Game Over Restart </button>");
	$("body").addClass('game-over');
	playSound("wrong");
	setTimeout(()=>{ $("body").removeClass('game-over')}, 200);
}

// will get next tile for the series
function nextSequence() {
	started = true;
	userClickedPattern = [];

	level++;
	var levelinfo = document.querySelector("#level-title").innerHTML = "Level " + level;

	randomNumber = Math.round(Math.random()*3);
	var randomChosenColor = buttonColors[randomNumber];
	console.log(randomChosenColor);
	gamePattern.push(randomChosenColor);

	$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
}

//play sound of the tile name
function playSound(tilename){
	var audio = new Audio("sounds/"+tilename+".mp3");
	audio.play();
}
//animate the specified colored tile
function animatePress(currentColor){
	$("#"+currentColor).addClass('pressed');
	setTimeout(() => { $("#"+currentColor).removeClass('pressed');}, 100);
}
