// A representation of a Node in a tree data structure
class Node {

	// Creates the Node instance
	constructor(isBotTurn, board, depth) {
		// Values to represent Player moves in 2D matrix
        this.BOT_NUM = 2;
	    this.USER_NUM = 1;
		
		// Initilize the turn, tic tac toe board and the graph depth
        this.isBotTurn = isBotTurn;
        this.board = board;
        this.depth = depth;
        
        this.movePlayed = [];

        this.score = 0;
        this.isGameDone = false;

        this.neighbors = [];

		this.GenerateNeighbors();
		
		var winningPlayer = this.winningPlayer();
		if (winningPlayer != 0) {
			if (winningPlayer == this.BOT_NUM) {
				this.score = 10 - depth;
			} else {
				this.score = this.depth - 10;
			}
			this.isGameDone = true;
		} else if (this.gameIsDone()) {
			this.isGameDone = true;
		}
    }
	
	// Sets the move played
    setMovePlayed(val){
        this.movePlayed = val;
    }
	
	// Checks if the Game is done
	gameIsDone() {
		for (let i=0; i<3; ++i) {
			for (let k=0; k<3; ++k) {
				if (this.board[i][k] == 0)
					return false;
			}
		}
		return true;
	}
	
	// Generates Neighboring Games States from the current one
	GenerateNeighbors() {
		for (let i=0; i<3; ++i) {
			for (let k=0; k<3; ++k) {
				if (this.board[i][k] == 0) {

					let newBoard = [[], [], []];
					for (let x=0; x<3; x++) {
						for (let y=0; y<3; y++) {
							newBoard[x][y] = this.board[x][y];
						}
					}
					
					if (this.isBotTurn) {
						newBoard[i][k] = this.BOT_NUM;
					} else {
						newBoard[i][k] = this.USER_NUM;
					}
					
					let newNode = new Node(!this.isBotTurn, newBoard, this.depth + 1);
					newNode.setMovePlayed([i, k]);
					this.neighbors.push(newNode);
				}
			}
		}
	}
	
	// Returns 0,1,2. 0 if nobody has won yet
	winningPlayer() {
		for (let i=0; i<3; ++i) {
			if (this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2] && this.board[i][0] != 0)
				return this.board[i][0];
			if (this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i] && this.board[0][i] != 0)
				return this.board[0][i];
		}
		
		if (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] && this.board[0][0] != 0)
			return this.board[0][0];
		
		if (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0] && this.board[2][0] != 0)
			return this.board[0][2];
		
		return 0;
	}
	
	// Prints the tic tac toe board to the console
    print() {
		for (let i=0; i<3; ++i) {
            console.log(this.board.join("\n"))
		}
		console.log();
	}
}
