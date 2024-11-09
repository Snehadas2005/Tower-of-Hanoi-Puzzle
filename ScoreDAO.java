package com.hanoiheights;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ScoreDAO {
    public void saveScore(int userId, int numDisks, int guessedMoves, 
                         int actualMoves, int points) throws SQLException {
        String sql = "INSERT INTO game_scores (user_id, num_disks, guessed_moves, " +
                    "actual_moves, points) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, userId);
            pstmt.setInt(2, numDisks);
            pstmt.setInt(3, guessedMoves);
            pstmt.setInt(4, actualMoves);
            pstmt.setInt(5, points);
            
            pstmt.executeUpdate();
        }
    }
    
    public List<Map<String, Object>> getUserScores(int userId) throws SQLException {
        String sql = "SELECT num_disks, guessed_moves, actual_moves, points, played_at " +
                    "FROM game_scores WHERE user_id = ? ORDER BY played_at DESC";
        
        List<Map<String, Object>> scores = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                Map<String, Object> score = new HashMap<>();
                score.put("numDisks", rs.getInt("num_disks"));
                score.put("guessedMoves", rs.getInt("guessed_moves"));
                score.put("actualMoves", rs.getInt("actual_moves"));
                score.put("points", rs.getInt("points"));
                score.put("playedAt", rs.getTimestamp("played_at"));
                scores.add(score);
            }
        }
        return scores;
    }
}