package com.tower.model;

public class GameState {
    private int totalDiscs;
    private int moveCount;
    private long startTime;
    private long endTime;
    private boolean isComplete;
    
    public GameState(int totalDiscs) {
        this.totalDiscs = totalDiscs;
        this.moveCount = 0;
        this.startTime = System.currentTimeMillis();
        this.isComplete = false;
    }
    
    public void incrementMoves() {
        moveCount++;
    }
    
    public void completeGame() {
        endTime = System.currentTimeMillis();
        isComplete = true;
    }
    
    public int getTotalDiscs() {
        return totalDiscs;
    }
    
    public int getMoveCount() {
        return moveCount;
    }
    
    public long getElapsedTime() {
        if (isComplete) {
            return endTime - startTime;
        }
        return System.currentTimeMillis() - startTime;
    }
    
    public boolean isComplete() {
        return isComplete;
    }
    
    public int getMinimumMoves() {
        return (int) Math.pow(2, totalDiscs) - 1;
    }
    
    @Override
    public String toString() {
        return "GameState{" +
                "totalDiscs=" + totalDiscs +
                ", moveCount=" + moveCount +
                ", elapsedTime=" + getElapsedTime() +
                "ms, isComplete=" + isComplete +
                '}';
    }
}
