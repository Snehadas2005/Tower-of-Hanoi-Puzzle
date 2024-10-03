public class Towers{
    private int maxHeight;
    private int[] Heights;
    private int[][] towers;
    public Towers(int maxHeight){
        this.maxHeight=maxHeight;
        heights=new int[3][maxHeight];
        heights[0]=maxHeight;
        for(int i=0 ; i<maxHeight;i++){
            towers[0][i]=maxHeight-i;
        }
    }

}