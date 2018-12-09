// Variables
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var YOU = 1;
var BOT = -1;
var who = 1;

function selectCell(cell) {

	// You decided to go first
	var botStartButton = document.getElementById("btnStart");
	botStartButton.disabled = true;

	var x = cell.id.split("")[0];
	var y = cell.id.split("")[1];
	if(who == 1) {
		var move = placeMove(x, y, YOU);
		if (move == true) {
			cell.innerHTML = "X";
			checkWin();
			who = 0;
		}
	} else if(who == 0) {
		var move = placeMove(x, y, BOT);
		if (move == true) {
			cell.innerHTML = "O";
			checkWin();
			who = 1;
		}
	} 
}

function placeMove(x, y, val) {
	if (moveIsValid(x, y)) {
		board[x][y] = val;
		return true;
	} else {
		return false;
	}
}

function moveIsValid(x, y) {
	if(board[x][y] == 0) {
		return true;
	} else {
		return false;
	}
}

function checkWin() {
	console.log(board);
	if((board[0][0] === 1 && board[1][0] === 1 && board[2][0] === 1) ||
	   (board[0][1] === 1 && board[1][1] === 1 && board[2][1] === 1) ||
	   (board[0][2] === 1 && board[1][2] === 1 && board[2][2] === 1) ||
	   (board[0][0] === 1 && board[0][1] === 1 && board[0][2] === 1) ||
	   (board[1][0] === 1 && board[1][1] === 1 && board[1][2] === 1) ||
	   (board[2][0] === 1 && board[2][1] === 1 && board[2][2] === 1) ||
	   (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) || 
	   (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1)) {
			var mess = document.getElementById("message");
			mess.innerHTML = "X WINS!";
	} else if ((board[0][0] === -1 && board[1][0] === -1 && board[2][0] === -1) ||
	   (board[0][1] === -1 && board[1][1] === -1 && board[2][1] === -1) ||
	   (board[0][2] === -1 && board[1][2] === -1 && board[2][2] === -1) ||
	   (board[0][0] === -1 && board[0][1] === -1 && board[0][2] === -1) ||
	   (board[1][0] === -1 && board[1][1] === -1 && board[1][2] === -1) ||
	   (board[2][0] === -1 && board[2][1] === -1 && board[2][2] === -1) ||
	   (board[0][0] === -1 && board[1][1] === -1 && board[2][2] === -1) || 
	   (board[0][2] === -1 && board[1][1] === -1 && board[2][0] === -1)) {
		var mess = document.getElementById("message");
		mess.innerHTML = "O WINS!";
	}
}