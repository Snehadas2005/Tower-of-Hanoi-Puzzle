package com.tower;

import com.tower.model.Disc;
import com.tower.model.Tower;
import com.tower.model.GameState;
import com.tower.model.Move;

public class Main {
    public static void main(String[] args) {
        System.out.println("Tower of Hanoi Game");
        
        try {
            // Initialize game components
            int numberOfDiscs = 3;
            GameState gameState = new GameState(numberOfDiscs);
            
            // Create towers
            Tower sourceTower = new Tower(1, "Source");
            Tower auxiliaryTower = new Tower(2, "Auxiliary");
            Tower destinationTower = new Tower(3, "Destination");
            
            // Initialize source tower with discs
            for (int i = numberOfDiscs; i > 0; i--) {
                Disc disc = new Disc(i);
                sourceTower.addDisc(disc);
            }
            
            // Print initial state
            System.out.println("\nInitial Game State:");
            System.out.println("Source Tower: " + sourceTower);
            System.out.println("Number of discs: " + sourceTower.getDiscCount());
            System.out.println("Minimum moves required: " + gameState.getMinimumMoves());
            
            // Test a sample move
            if (!sourceTower.isEmpty()) {
                Disc discToMove = sourceTower.removeDisc();
                if (destinationTower.addDisc(discToMove)) {
                    Move move = new Move(sourceTower, destinationTower, discToMove);
                    gameState.incrementMoves();
                    System.out.println("\nMove made: " + move);
                }
            }
            
            // Print game statistics
            System.out.println("\nGame Statistics:");
            System.out.println("Moves made: " + gameState.getMoveCount());
            System.out.println("Time elapsed: " + gameState.getElapsedTime() + "ms");
            
            // Test tower states after move
            System.out.println("\nTower States After Move:");
            System.out.println("Source Tower discs: " + sourceTower.getDiscCount());
            System.out.println("Destination Tower discs: " + destinationTower.getDiscCount());
            
        } catch (Exception e) {
            System.out.println("Error occurred during game initialization!");
            e.printStackTrace();
        }
    }
}
