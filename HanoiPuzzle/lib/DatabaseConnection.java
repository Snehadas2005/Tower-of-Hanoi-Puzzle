package com.hanoiheights;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/hanoi_heights";
    private static final String USERNAME = "hanoitower";
    private static final String PASSWORD = "ritikshailkush";

    // Establish database connection
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }

    // User Registration
    public static boolean registerUser(String username, String firstName, String lastName, 
                                       String email, String password) {
        String sql = "INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            pstmt.setString(2, firstName);
            pstmt.setString(3, lastName);
            pstmt.setString(4, email);
            pstmt.setString(5, hashPassword(password)); // Implement secure password hashing
            
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // User Login Validation
    public static boolean validateUser(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            pstmt.setString(2, hashPassword(password)); // Use same hashing method as registration
            
            try (ResultSet rs = pstmt.executeQuery()) {
                return rs.next(); // If user exists, return true
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Save Game Score
    public static boolean saveGameScore(String username, int disks, int guessedMoves, 
                                         int actualMoves, int points) {
        String sql = "INSERT INTO game_scores (username, num_disks, guessed_moves, actual_moves, points, game_date) " +
                     "VALUES (?, ?, ?, ?, ?, NOW())";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            pstmt.setInt(2, disks);
            pstmt.setInt(3, guessedMoves);
            pstmt.setInt(4, actualMoves);
            pstmt.setInt(5, points);
            
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Retrieve User's Game History
    public static List<GameScore> getUserGameHistory(String username) {
        List<GameScore> scores = new ArrayList<>();
        String sql = "SELECT * FROM game_scores WHERE username = ? ORDER BY game_date DESC";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    GameScore score = new GameScore(
                        rs.getInt("num_disks"),
                        rs.getInt("guessed_moves"),
                        rs.getInt("actual_moves"),
                        rs.getInt("points"),
                        rs.getDate("game_date")
                    );
                    scores.add(score);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return scores;
    }

    // Simple password hashing (replace with more secure method in production)
    private static String hashPassword(String password) {
        // Use a secure hashing method like BCrypt in production
        return password; // Placeholder
    }

    // Inner class to represent game score
    public static class GameScore {
        public int disks;
        public int guessedMoves;
        public int actualMoves;
        public int points;
        public Date gameDate;

        public GameScore(int disks, int guessedMoves, int actualMoves, int points, Date gameDate) {
            this.disks = disks;
            this.guessedMoves = guessedMoves;
            this.actualMoves = actualMoves;
            this.points = points;
            this.gameDate = gameDate;
        }
    }
}
