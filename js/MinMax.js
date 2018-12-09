class MinMax {

	main() {
		console.log("MIN/MAX");
		
		let startingBoard = [
			[1,2,1],
			[2,2,1],
			[0,1,0]
        ];
		
		let mm = new MinMax(startingBoard);
	}

	constructor(board) {
        this.board = board;
    }
    
    getBestMove() {
        var currentNode = new Node(true, board, 0);

        var bestValue = Number.MIN_SAFE_INTEGER;
		var bestMove = [];
		
    
        currentNode.neighbors.forEach(n => {
            let v = this.calcMinMax(n);
			if (v > bestValue) {
				bestValue = v;
				bestMove = n.movePlayed;
			}
        });
		
		console.log(bestValue);
        console.log(bestMove);
        
        return bestMove
    }
	
	calcMinMax(node) {
		if (node.isGameDone) {
			return node.value;
		}
		
		let value;
		// We are now maximizing
		if (node.isBotTurn) {
			value = Number.MIN_SAFE_INTEGER;
            
            currentNode.neighbors.forEach(n => {
                value = Math.max(value, calcMinMax(n));
            });
			
		} else { // We are now minimizing
			value = Number.MAX_SAFE_INTEGER;
			
			currentNode.neighbors.forEach(n => {
				value = Math.min(value, calcMinMax(n));
			});
		}
		
		return value;
	}
}
