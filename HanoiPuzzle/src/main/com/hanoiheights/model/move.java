package com.tower.model;

public class Move {
    private Tower sourceTower;
    private Tower destinationTower;
    private Disc disc;
    private long timestamp;
    
    public Move(Tower sourceTower, Tower destinationTower, Disc disc) {
        this.sourceTower = sourceTower;
        this.destinationTower = destinationTower;
        this.disc = disc;
        this.timestamp = System.currentTimeMillis();
    }
    
    public Tower getSourceTower() {
        return sourceTower;
    }
    
    public Tower getDestinationTower() {
        return destinationTower;
    }
    
    public Disc getDisc() {
        return disc;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
    
    @Override
    public String toString() {
        return "Move{" +
                "from=" + sourceTower.getName() +
                ", to=" + destinationTower.getName() +
                ", disc=" + disc.getSize() +
                '}';
    }
}
