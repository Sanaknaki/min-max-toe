// Implementation of the Minimax Algorithm
class MinMax {
	// Returns the Best Move given the current board
    getBestMove(b) {
		// Creates a new Node
        var currentNode = new Node(true, b, 0);

		// Sets the bestValue to the smallest value possible
        var bestValue = Number.MIN_SAFE_INTEGER;
		var bestMove = [];
	
		// Iterates through all the neighbors and calculates the payoff values
        currentNode.neighbors.forEach(n => {
            let v = this.calcMinMax(n);

            n.print();
            console.log(v);

			// Tries to get the maximum valued move
			if (v > bestValue) {
				bestValue = v;
				bestMove = n.movePlayed;
			}
        });
		
		console.log(bestValue);
        console.log(bestMove);
        
        return bestMove
    }
	
	// Recursively Calculates the payoffs for each path in the game tree
	// Attempts to maximize the players payoff
	// Attempts to minimize the opponent's payoff
	calcMinMax(node) {
		if (node.isGameDone) {
			return node.score;
		}
		
		let value;
		// We are now maximizing
		if (node.isBotTurn) {
			value = Number.MIN_SAFE_INTEGER;
            
            node.neighbors.forEach(n => {
                value = Math.max(value, this.calcMinMax(n));
            });
			
		} else { // We are now minimizing
			value = Number.MAX_SAFE_INTEGER;
			
			node.neighbors.forEach(n => {
				value = Math.min(value, this.calcMinMax(n));
			});
		}
		
		return value;
	}
}
