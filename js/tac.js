// Variables
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var YOU = 1;
var BOT = 2;
var who = 1;
var gameIsDone = false;

/* 
 * It's the bots turn.
*/
function botTurn() {
	var x, y;
	var move;
	var cell;

	// Grabs all available cells.
	cellsAvail = cellsAvailable(board);

	if(cellsAvail.length > 0 && gameIsDone == false) {
		// Picks the first instance for now.
		x = cellsAvail[0][0];
		y = cellsAvail[0][1];


		// console.log("x : " + x);
		// console.log("y : " + y);

		// Place the move.
		if (placeMove(x, y, BOT)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			who = 1;
		}
	} else {

	}
}

/* 
 * Cells that are left on the board to be chosen
*/
function cellsAvailable(currentState){
	var cellsAvailable = [];

	// Go over the board 'currentState' and find all open cells.
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (currentState[x][y] == 0)
				cellsAvailable.push([x, y]);
		}
	}

	// Return list of cells.
	return cellsAvailable;
}

/* 
 * Select a cell on the board and place move.
*/
function selectCell(cell) {

	// You decided to go first
	var botStartButton = document.getElementById("btnStart");
	botStartButton.disabled = true;

	var x = cell.id.split("")[0];
	var y = cell.id.split("")[1];
	
	// You clicked .. ?
	if(who == 1 && gameIsDone == false) {
		var move = placeMove(x, y, YOU);
		if (move == true) {
			cell.innerHTML = "X";
			who = 0;
		}
	}

	// Check the states after each click.
	if (gameIsOver(board) > 0) {
		var mess = document.getElementById("message");
		mess.innerHTML = "YOU WIN!";
		gameIsDone = true;
	} else if (gameIsOver(board) < 0) {
		var mess = document.getElementById("message");
		mess.innerHTML = "YOU LOSE!";
		gameIsDone = true;	
	}

	if(cellsAvailable(board).length == 0 && gameIsOver(board) == 0) {
		var mess = document.getElementById("message");
		mess.innerHTML = "DRAW";
		gameIsDone = true;
	}

	if(who == 0) {
		botTurn();
	}
}

/* 
 * Place a move at position (x,y).
 * Assign player value to board.
*/
function placeMove(x, y, playerValue) {
	if (moveIsValid(x, y)) {
		board[x][y] = playerValue;
		return true;
	} else {
		return false;
	}
}

/* 
 * Check if a movie is value before placing at position (x,y).
*/
function moveIsValid(x, y) {
	if(board[x][y] == 0) {
		return true;
	} else {
		return false;
	}
}

// function checkWin() {
// 	console.log(board);
// 	if((board[0][0] === 1 && board[1][0] === 1 && board[2][0] === 1) ||
// 	   (board[0][1] === 1 && board[1][1] === 1 && board[2][1] === 1) ||
// 	   (board[0][2] === 1 && board[1][2] === 1 && board[2][2] === 1) ||
// 	   (board[0][0] === 1 && board[0][1] === 1 && board[0][2] === 1) ||
// 	   (board[1][0] === 1 && board[1][1] === 1 && board[1][2] === 1) ||
// 	   (board[2][0] === 1 && board[2][1] === 1 && board[2][2] === 1) ||
// 	   (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) || 
// 	   (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1)) {
// 			var mess = document.getElementById("message");
// 			mess.innerHTML = "X WINS!";
// 	} else if ((board[0][0] === -1 && board[1][0] === -1 && board[2][0] === -1) ||
// 	   (board[0][1] === -1 && board[1][1] === -1 && board[2][1] === -1) ||
// 	   (board[0][2] === -1 && board[1][2] === -1 && board[2][2] === -1) ||
// 	   (board[0][0] === -1 && board[0][1] === -1 && board[0][2] === -1) ||
// 	   (board[1][0] === -1 && board[1][1] === -1 && board[1][2] === -1) ||
// 	   (board[2][0] === -1 && board[2][1] === -1 && board[2][2] === -1) ||
// 	   (board[0][0] === -1 && board[1][1] === -1 && board[2][2] === -1) || 
// 	   (board[0][2] === -1 && board[1][1] === -1 && board[2][0] === -1)) {
// 		var mess = document.getElementById("message");
// 		mess.innerHTML = "O WINS!";
// 	}
// }

/* 
 * Given a game state and a player number, check if either of them win.
*/
function checkGameOver(currentState, playerValue) {
	// All states where someone wins
	var allStates = [[currentState[0][0], currentState[0][1], currentState[0][2]],
					 [currentState[1][0], currentState[1][1], currentState[1][2]],
					 [currentState[2][0], currentState[2][1], currentState[2][2]],
					 [currentState[0][0], currentState[1][0], currentState[2][0]],
					 [currentState[0][1], currentState[1][1], currentState[2][1]],
					 [currentState[0][2], currentState[1][2], currentState[2][2]],
					 [currentState[0][0], currentState[1][1], currentState[2][2]],
					 [currentState[2][0], currentState[1][1], currentState[0][2]]];

	// For all possible states, check if you won.
	for (var i = 0; i < 8; i++) {
		var singleWinState = allStates[i];
		var hasPlayer = 0;

		// Check a win state if you won.
		for (var j = 0; j < 3; j++) {
			if (singleWinState[j] == playerValue)
				hasPlayer++;
		}

		// 3 in a row = win!
		if (hasPlayer == 3)
			return true;
	}

	return false;
}

/* 
 * Send same state, with both player and bot value.
 * Return the winner.
*/
function gameIsOver(currentState) {
	if(checkGameOver(currentState, YOU) == true) {
		// You win
		return 1;
	} else {
		if(checkGameOver(currentState, BOT) == true) {
			// You lose
			return -1;
		}

		// So far nothing
		return 0;
	}
}