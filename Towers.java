
class Towers {
    private int maxHeight;
    private int[] heights;
    private int[][] towers;

    public Towers(int maxHeight) {
        this.maxHeight = maxHeight;
        heights = new int[3];
        towers = new int[3][maxHeight];
        heights[0] = maxHeight;
        for (int i = 0; i < maxHeight; i++) {
            towers[0][i] = maxHeight - i;
        }
    }

    public void move(int source, int destination) {
        int disk = towers[source - 1][heights[source - 1] - 1];
        heights[source - 1]--;
        towers[destination - 1][heights[destination - 1]] = disk;
        heights[destination - 1]++;
    }

    public void printTowers() {
        for (int i = maxHeight - 1; i >= 0; i--) {
            for (int j = 0; j < 3; j++) {
                if (i < heights[j]) {
                    System.out.print(towers[j][i] + "\t");
                } else {
                    System.out.print("|\t");
                }
            }
            System.out.println();
        }
        System.out.println("A\tB\tC");
        System.out.println();
    }
}
