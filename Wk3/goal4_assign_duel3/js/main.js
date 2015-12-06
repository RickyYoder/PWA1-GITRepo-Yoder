var playerOne = document.getElementById("playerOne"), //parent container for player stats/name
	playerOneName = playerOne.getElementsByTagName("strong")[0], //player name
	playerOneHealthBar = playerOne.getElementsByTagName("progress")[0], //player health bar
	playerOneHealthValue = playerOne.getElementsByTagName("span")[0], //player health value
	playerOneDamageCounter = 50;

var playerTwo = document.getElementById("playerTwo"),
	playerTwoName = playerTwo.getElementsByTagName("strong")[0],
	playerTwoHealthBar = playerTwo.getElementsByTagName("progress")[0],
	playerTwoHealthValue = playerTwo.getElementsByTagName("span")[0],
	playerTwoDamageCounter = 50;

var roundNumber = 1;

document.getElementById("buttonred").addEventListener('click',function(){
	fight();
});

function fight(){
	var playerOneDamaged = Math.floor(Math.random() * (playerOneDamageCounter - playerOneDamageCounter/2) + playerOneDamageCounter/2),
		playerTwoDamaged = Math.floor(Math.random() * (playerTwoDamageCounter - playerTwoDamageCounter/2) + playerTwoDamageCounter/2);

	playerOneHealthBar.value = playerOneHealthBar.value - playerOneDamaged;
	playerTwoHealthBar.value = playerTwoHealthBar.value - playerTwoDamaged;
}

function checkWinner(){

}