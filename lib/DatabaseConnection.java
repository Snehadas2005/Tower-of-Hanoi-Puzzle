package com.hanoiheights;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseConnection {
    static final String URL = "jdbc:mysql://localhost:33060/hanoi_heights";
    static final String USER = "hanoitower";
    static final String PASSWORD = "ritikshailkush";
    
    public static void main(String args[]) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
        Statement stmt = conn.createStatement();) {
            String sql = "CREATE DATABASE VRD";
            stmt.executeUpdate(sql);
            System.out.println("Database created");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
} 
