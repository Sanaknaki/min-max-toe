class MinMax {

	constructor() {
    }
    
    getBestMove(b) {
        var currentNode = new Node(true, b, 0);

        var bestValue = Number.MIN_SAFE_INTEGER;
		var bestMove = [];
    
        currentNode.neighbors.forEach(n => {
            let v = this.calcMinMax(n);

            n.print();
            console.log(v);


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
