package com.tower.model;

public class Disc {
    private int size;
    private String color;
    
    public Disc(int size) {
        this.size = size;
        this.color = generateColor(size);
    }
    
    public int getSize() {
        return size;
    }
    
    public void setSize(int size) {
        this.size = size;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    private String generateColor(int size) {
        // Generate different colors based on disc size
        switch(size % 5) {
            case 0: return "#FF0000"; // Red
            case 1: return "#00FF00"; // Green
            case 2: return "#0000FF"; // Blue
            case 3: return "#FFD700"; // Gold
            default: return "#800080"; // Purple
        }
    }
    
    @Override
    public String toString() {
        return "Disc{" +
                "size=" + size +
                ", color='" + color + '\'' +
                '}';
    }
}
