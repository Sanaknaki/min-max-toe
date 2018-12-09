
public class Util {

	public static int[][] boardDeepCopy(int[][] board) {
		int[][] newBoard = new int[3][3];
		
		for (int i=0; i<3; ++i) {
			for (int k=0; k<3; ++k) {
				newBoard[i][k] = board[i][k];
			}
		}
		
		return newBoard;
	}
	
}
