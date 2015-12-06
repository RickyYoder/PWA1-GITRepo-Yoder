var p1r = document.getElementById("playerOne"), //reference to parent node for name/stats
	p2r = document.getElementById("playerTwo");

var playerOne = {
	"name":p1r.getElementsByTagName("strong")[0], //player name
	"healthBar":p1r.getElementsByTagName("progress")[0], //player health bar
	"healthValue":p1r.getElementsByTagName("span")[0], //player health value
	"damageCounter":20, //max damage player can deal out
	"status":p1r.getElementsByTagName("h1")[0] //whether they're a winner or a loser
};

var playerTwo = {
	"name":p2r.getElementsByTagName("strong")[0], //player name
	"healthBar":p2r.getElementsByTagName("progress")[0], //player health bar
	"healthValue":p2r.getElementsByTagName("span")[0], //player health value
	"damageCounter":20, //max damage player can deal out
	"status":p2r.getElementsByTagName("h1")[0] //whether they're a winner or a loser
};

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
    //we try our best to have a seamless loop for audio....
}, false);
 
bgmusic2.addEventListener('ended', function(){
    this.currentTime = 0;
    this.pause();
    bgmusic1.play();
    //...by playing another audio element with the same file after the other is over, and repeating it
}, false);

fightButton.addEventListener('click',function(){
	if(restart == true){
		//if we are restarting, reset everything to its original state
		roundNumber = 1;
		round.innerText = "Round "+roundNumber;
		playerOne.status.innerHTML = "";
		playerTwo.status.innerHTML = "";

		playerOne.healthBar.value = playerOne.healthValue.innerText = 100;
		playerTwo.healthBar.value = playerTwo.healthValue.innerText = 100;

		this.innerText = "FIGHT!";
		restart = false;
		return;
	}


	//once reset, or, if in the middle of fighting, we fight
	fight();
});

function fight(){
	var playerOneDamaged = Math.floor(Math.random() * (playerTwo.damageCounter - playerTwo.damageCounter/2) + playerTwo.damageCounter/2), //player one's damage
		playerTwoDamaged = Math.floor(Math.random() * (playerOne.damageCounter - playerOne.damageCounter/2) + playerOne.damageCounter/2); //player two's damage

	playerOne.healthBar.value = playerOne.healthValue.innerText = playerOne.healthBar.value - playerOneDamaged; //set player one's health bar and health value
	playerTwo.healthBar.value = playerTwo.healthValue.innerText = playerTwo.healthBar.value - playerTwoDamaged; //set player two's health bar and health value

	if(Number(playerOne.healthValue.innerText) < 0){
		//always ensure that player health text never is a negative number
		playerOne.healthBar.value = playerOne.healthValue.innerText = 0;
	}
	
	if(Number(playerTwo.healthValue.innerText) < 0){
		playerTwo.healthBar.value = playerTwo.healthValue.innerText = 0;
	}

	roundNumber++;
	//update the current round number
	round.innerText = "Round "+roundNumber;

	//call checkWinner() to see if the fight is over
	checkWinner();
}

function checkWinner(){

	if(playerOne.healthBar.value === 0){
		//player two wins
		playerTwo.status.innerHTML = "Winner!";
		playerOne.status.innerHTML = "Loser!";
		round.innerText = "Fighter 2 Wins";

		restart = true;
		//return;
	}

	if(playerTwo.healthBar.value === 0){
		//player one wins
		playerOne.status.innerHTML = "Winner!";
		playerTwo.status.innerHTML = "Loser!";
		round.innerText = "Fighter 1 Wins";

		restart = true;
		//return;
	}

	if(playerOne.healthBar.value === 0 && playerTwo.healthBar.value === 0){
		playerOne.status.innerHTML = "Tie!";
		playerTwo.status.innerHTML = "Tie!";
		round.innerText = "Both Fighters Die";

		restart = true;
		//return;
	}

	if(restart == true) fightButton.innerText = "Restart";
}

window.addEventListener('load',function(){
	bgmusic1.play();
});