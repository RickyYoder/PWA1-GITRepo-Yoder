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

var players = [playerOne,playerTwo];

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
		players[0].status.innerHTML = "";
		players[1].status.innerHTML = "";

		players[0].healthBar.value = players[0].healthValue.innerText = 100;
		players[1].healthBar.value = players[1].healthValue.innerText = 100;

		this.innerText = "FIGHT!";
		restart = false;
		return;
	}


	//once reset, or, if in the middle of fighting, we fight
	fight();
});

function fight(){
	var playerOneDamaged = Math.floor(Math.random() * (players[1].damageCounter - players[1].damageCounter/2) + players[1].damageCounter/2), //player one's damage
		playerTwoDamaged = Math.floor(Math.random() * (players[0].damageCounter - players[0].damageCounter/2) + players[0].damageCounter/2); //player two's damage

	players[0].healthBar.value = players[0].healthValue.innerText = players[0].healthBar.value - playerOneDamaged; //set player one's health bar and health value
	players[1].healthBar.value = players[1].healthValue.innerText = players[1].healthBar.value - playerTwoDamaged; //set player two's health bar and health value

	if(Number(players[0].healthValue.innerText) < 0){
		//always ensure that player health text never is a negative number
		players[0].healthBar.value = players[0].healthValue.innerText = 0;
	}
	
	if(Number(players[1].healthValue.innerText) < 0){
		players[1].healthBar.value = players[1].healthValue.innerText = 0;
	}

	roundNumber++;
	//update the current round number
	round.innerText = "Round "+roundNumber;

	//call checkWinner() to see if the fight is over
	checkWinner();
}

function checkWinner(){

	if(players[0].healthBar.value === 0){
		//player two wins
		players[1].status.innerHTML = "Winner!";
		players[0].status.innerHTML = "Loser!";
		round.innerText = "Fighter 2 Wins";

		restart = true;
		//return;
	}

	if(players[1].healthBar.value === 0){
		//player one wins
		players[0].status.innerHTML = "Winner!";
		players[1].status.innerHTML = "Loser!";
		round.innerText = "Fighter 1 Wins";

		restart = true;
		//return;
	}

	if(players[0].healthBar.value === 0 && players[1].healthBar.value === 0){
		players[0].status.innerHTML = "Tie!";
		players[1].status.innerHTML = "Tie!";
		round.innerText = "Both Fighters Die";

		restart = true;
		//return;
	}

	if(restart == true) fightButton.innerText = "Restart";
}

window.addEventListener('load',function(){
	bgmusic1.play();
});