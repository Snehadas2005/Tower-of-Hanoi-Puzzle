package com.hanoiheights;

import java.sql.*;

public class UserDAO {
    public boolean createUser(String username, String firstName, String lastName, 
                            String password, String email) throws SQLException {
        String sql = "INSERT INTO users (username, first_name, last_name, password, email) " +
                    "VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            pstmt.setString(2, firstName);
            pstmt.setString(3, lastName);
            pstmt.setString(4, password); // In production, use password hashing
            pstmt.setString(5, email);
            
            return pstmt.executeUpdate() > 0;
        }
    }
    
    public boolean validateUser(String username, String password) throws SQLException {
        String sql = "SELECT password FROM users WHERE username = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return rs.getString("password").equals(password); // Use proper password comparison in production
            }
            return false;
        }
    }
}