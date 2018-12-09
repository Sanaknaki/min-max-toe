import java.util.Arrays;
import java.util.LinkedList;

public class Node {
	
	private int BOT_NUM = 2;
	private int USER_NUM = 1;
	
	boolean isBotTurn;
	
	int depth = 0;
	
	int[] movePlayed = new int[2];
	
	int value = 0;
	boolean isGameDone = false;
	
	int[][] board = new int[3][3];
	
	LinkedList<Node> neighbors = new LinkedList<Node>();
	
	public Node(boolean isBotTurn, int[][] board, int depth) {
		this.isBotTurn = isBotTurn;
		this.board = board;
		this.depth = depth;
		
		GenerateNeighbors();
		
		int winningPlayer = winningPlayer();
		if (winningPlayer != 0) {
			if (winningPlayer == BOT_NUM) {
				this.value = 10 - depth;
			} else {
				this.value = depth - 10;
			}
			this.isGameDone = true;
		} else if (gameIsDone()) {
			this.isGameDone = true;
		}
	}
	
	private boolean gameIsDone() {
		for (int i=0; i<3; ++i) {
			for (int k=0; k<3; ++k) {
				if (board[i][k] == 0)
					return false;
			}
		}
		return true;
	}
	
	private void GenerateNeighbors() {
		for (int i=0; i<3; ++i) {
			for (int k=0; k<3; ++k) {
				if (board[i][k] == 0) {
					int[][] newBoard = Util.boardDeepCopy(this.board);
					
					if (isBotTurn) {
						newBoard[i][k] = BOT_NUM;
					} else {
						newBoard[i][k] = USER_NUM;
					}
					
					Node newNode = new Node(!isBotTurn, newBoard, depth + 1);
					newNode.movePlayed = new int[]{i, k};
					neighbors.add(newNode);
				}
			}
		}
	}
	
	// Returns 0,1,2. 0 if nobody has won yet
	private int winningPlayer() {
		for (int i=0; i<3; ++i) {
			if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0)
				return board[i][0];
			if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0)
				return board[0][i];
		}
		
		if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0)
			return board[0][0];
		
		if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] != 0)
			return board[0][2];
		
		return 0;
	}
	
	public void print() {
		for (int i=0; i<3; ++i) {
			System.out.println(Arrays.toString(board[i]));
		}
		System.out.println();
	}
	
}
