import java.util.Arrays;

public class MinMax {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		System.out.println("MIN/MAX");
		
		int[][] startingBoard = {
			{1,2,1},
			{2,2,1},
			{0,1,0}
		};
		
		MinMax mm = new MinMax(startingBoard);
		
	}
	
	public MinMax(int[][] board) {
		Node currentNode = new Node(true, board, 0);
		
		int bestValue = Integer.MIN_VALUE;
		int[] bestMove = new int[2];
		
	
		for (Node n : currentNode.neighbors) {
			int v = calcMinMax(n);
			n.print();
			System.out.println(v);
			System.out.println();
			if (v > bestValue) {
				bestValue = v;
				bestMove = n.movePlayed;
			}
		}
		
		System.out.println(bestValue);
		System.out.println(Arrays.toString(bestMove));
	}
	
	private int calcMinMax(Node node) {
		if (node.isGameDone) {
			return node.value;
		}
		
		int value;
		// We are now maximizing
		if (node.isBotTurn) {
			value = Integer.MIN_VALUE;
			
			for (Node n : node.neighbors) {
				value = Math.max(value, calcMinMax(n));
			}
			
		} else { // We are now minimizing
			value = Integer.MAX_VALUE;
			
			for (Node n : node.neighbors) {
				value = Math.min(value, calcMinMax(n));
			}
			
		}
		
		return value;
	}

}
