class Node {
	constructor(isBotTurn, board, depth) {
        this.BOT_NUM = 2;
	    this.USER_NUM = 1;
        
        this.isBotTurn = isBotTurn;
        this.board = board;
        this.depth = depth;
        
        this.movePlayed = [];

        this.value = 0;
        this.isGameDone = false;

        this.neighbors = [];

		this.GenerateNeighbors();
		
		var winningPlayer = this.winningPlayer();
		if (winningPlayer != 0) {
			if (winningPlayer == this.BOT_NUM) {
				this.value = 10 - depth;
			} else {
				this.value = depth - 10;
			}
			this.isGameDone = true;
		} else if (this.gameIsDone()) {
			this.isGameDone = true;
		}
    }
    
    setMovePlayed(val){
        this.movePlayed = val;
    }
	
	gameIsDone() {
		for (let i=0; i<3; ++i) {
			for (let k=0; k<3; ++k) {
				if (board[i][k] == 0)
					return false;
			}
		}
		return true;
	}
	
	GenerateNeighbors() {
		for (let i=0; i<3; ++i) {
			for (let k=0; k<3; ++k) {
				if (board[i][k] == 0) {
					var newBoard = board
					// var newBoard = board.map(inner => inner.slice());
					
					if (this.isBotTurn) {
						newBoard[i][k] = this.BOT_NUM;
					} else {
						newBoard[i][k] = this.USER_NUM;
					}
					
					var newNode = new Node(!this.isBotTurn, newBoard, this.depth + 1);
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
    
    print() {
		for (let i=0; i<3; ++i) {
            console.log(board.join("\n"))
		}
		console.log();
	}
}
