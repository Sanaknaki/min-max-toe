// Variables
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var YOU = 1;
var BOT = -1;
var who = 1;


/* 
 * It's the bots turn.
*/
function botTurn() {
	var x, y;
	var move;
	var cell;

	cellsAvail = cellsAvailable(board);
	x = cellsAvail[0][0];
	y = cellsAvail[0][1];


	console.log("x : " + x);
	console.log("y : " + y);

	if (placeMove(x, y, BOT)) {
		cell = document.getElementById(String(x) + String(y));
		cell.innerHTML = "O";
		who = 1;
	}
}

/* 
 * Cells that are left on the board to be chosen
*/
function cellsAvailable(current_state){
	var cellsAvailable = [];

	// Go over the board 'current_state' and find all open cells.
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (current_state[x][y] == 0)
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
	if(who == 1) {
		var move = placeMove(x, y, YOU);
		if (move == true) {
			cell.innerHTML = "X";
			who = 0;
			botTurn();
		}
	}

	// Check the states after each click.
	if (gameIsOver(board) > 0) {
		var mess = document.getElementById("message");
		mess.innerHTML = "YOU WIN!";
	} else if (gameIsOver(board) < 0) {
		var mess = document.getElementById("message");
		mess.innerHTML = "YOU LOSE!";	
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
function checkGameOver(current_state, playerValue) {
	// All states where someone wins
	var allStates = [[current_state[0][0], current_state[0][1], current_state[0][2]],
					 [current_state[1][0], current_state[1][1], current_state[1][2]],
					 [current_state[2][0], current_state[2][1], current_state[2][2]],
					 [current_state[0][0], current_state[1][0], current_state[2][0]],
					 [current_state[0][1], current_state[1][1], current_state[2][1]],
					 [current_state[0][2], current_state[1][2], current_state[2][2]],
					 [current_state[0][0], current_state[1][1], current_state[2][2]],
					 [current_state[2][0], current_state[1][1], current_state[0][2]]];

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
function gameIsOver(current_state) {
	if(checkGameOver(current_state, YOU) == true) {
		console.log("You win!")
		return 1;
	} else {
		if(checkGameOver(current_state, BOT) == true) {
			console.log("You win!")
			return -1;
		}

		return 0;
	}
}
