package com.tower.model;

import java.util.Stack;

public class Tower {
    private int position;
    private Stack<Disc> discs;
    private String name;
    
    public Tower(int position, String name) {
        this.position = position;
        this.name = name;
        this.discs = new Stack<>();
    }
    
    public boolean addDisc(Disc disc) {
        if (discs.isEmpty() || discs.peek().getSize() > disc.getSize()) {
            discs.push(disc);
            return true;
        }
        return false;
    }
    
    public Disc removeDisc() {
        if (!discs.isEmpty()) {
            return discs.pop();
        }
        return null;
    }
    
    public Disc peekDisc() {
        if (!discs.isEmpty()) {
            return discs.peek();
        }
        return null;
    }
    
    public int getPosition() {
        return position;
    }
    
    public String getName() {
        return name;
    }
    
    public Stack<Disc> getDiscs() {
        return discs;
    }
    
    public boolean isEmpty() {
        return discs.isEmpty();
    }
    
    public int getDiscCount() {
        return discs.size();
    }
    
    @Override
    public String toString() {
        return "Tower{" +
                "position=" + position +
                ", name='" + name + '\'' +
                ", discCount=" + discs.size() +
                '}';
    }
}
