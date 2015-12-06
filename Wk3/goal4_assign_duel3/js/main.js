var playerOne = document.getElementById("playerOne"), //parent container for player stats/name
	playerOneName = playerOne.getElementsByTagName("strong")[0], //player name
	playerOneHealthBar = playerOne.getElementsByTagName("progress")[0], //player health bar
	playerOneHealthValue = playerOne.getElementsByTagName("span")[0], //player health value
	playerOneDamageCounter = 20, //max damage player can deal out
	playerOneStatus = playerOne.getElementsByTagName("h1")[0]; //whether they're a winner or a loser

var playerTwo = document.getElementById("playerTwo"),
	playerTwoName = playerTwo.getElementsByTagName("strong")[0],
	playerTwoHealthBar = playerTwo.getElementsByTagName("progress")[0],
	playerTwoHealthValue = playerTwo.getElementsByTagName("span")[0],
	playerTwoDamageCounter = 20,
	playerTwoStatus = playerTwo.getElementsByTagName("h1")[0];

var bgmusic1 = document.getElementsByTagName("audio")[0],
	bgmusic2 = document.getElementsByTagName("audio")[1],
	fightButton = document.getElementById("buttonred"),
	round = document.getElementById("round"),
	roundNumber = 1,
	restart = false;

bgmusic1.addEventListener('ended', function(){
    this.currentTime = 0;
    this.pause();
    bgmusic2.play();
}, false);
 
bgmusic2.addEventListener('ended', function(){
    this.currentTime = 0;
    this.pause();
    bgmusic1.play();
}, false);

fightButton.addEventListener('click',function(){
	if(restart == true){
		//if we are restarting, reset everything to its original state
		roundNumber = 1;
		round.innerText = "Round "+roundNumber;
		playerOneStatus.innerHTML = "";
		playerTwoStatus.innerHTML = "";

		playerOneHealthBar.value = playerOneHealthValue.innerText = 100;
		playerTwoHealthBar.value = playerTwoHealthValue.innerText = 100;

		this.innerText = "FIGHT!";
		restart = false;
		return;
	}


	//once reset, or, if in the middle of fighting, we fight
	fight();
});

function fight(){
	var playerOneDamaged = Math.floor(Math.random() * (playerTwoDamageCounter - playerTwoDamageCounter/2) + playerTwoDamageCounter/2), //player one's damage
		playerTwoDamaged = Math.floor(Math.random() * (playerOneDamageCounter - playerOneDamageCounter/2) + playerOneDamageCounter/2); //player two's damage

	playerOneHealthBar.value = playerOneHealthValue.innerText = playerOneHealthBar.value - playerOneDamaged; //set player one's health bar and health value
	playerTwoHealthBar.value = playerTwoHealthValue.innerText = playerTwoHealthBar.value - playerTwoDamaged; //set player two's health bar and health value

	if(Number(playerOneHealthValue.innerText) < 0){
		//always ensure that player health text never is a negative number
		playerOneHealthBar.value = playerOneHealthValue.innerText = 0;
	}
	
	if(Number(playerTwoHealthValue.innerText) < 0){
		playerTwoHealthBar.value = playerTwoHealthValue.innerText = 0;
	}

	roundNumber++;

	round.innerText = "Round "+roundNumber;

	checkWinner();
}

function checkWinner(){

	if(playerOneHealthBar.value === 0){
		//player two wins
		playerTwoStatus.innerHTML = "Winner!";
		playerOneStatus.innerHTML = "Loser!";
		restart = true;
		//return;
	}

	if(playerTwoHealthBar.value === 0){
		//player one wins
		playerOneStatus.innerHTML = "Winner!";
		playerTwoStatus.innerHTML = "Loser!";
		restart = true;
		//return;
	}

	if(playerOneHealthBar.value === 0 && playerTwoHealthBar.value === 0){
		playerOneStatus.innerHTML = "Tie!";
		playerTwoStatus.innerHTML = "Tie!";
		restart = true;
		//return;
	}

	if(restart == true) fightButton.innerText = "Restart";
}

window.addEventListener('load',function(){
	bgmusic1.play();
});