package com.hanoiheights.servelets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import com.hanoiheights.model.GameProgress;
import com.hanoiheights.model.User;
import com.hanoiheights.dao.GameDAO;

@WebServlet("/game")
public class GameServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private DatabaseConnection dbConnection;
    private GameDAO gameDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        dbConnection = new DatabaseConnection();
        gameDAO = new GameDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.jsp");
            return;
        }

        String action = request.getParameter("action");
        if (action == null) {
            // Show game history by default
            try {
                User user = (User) session.getAttribute("user");
                List<GameProgress> gameHistory = gameDAO.getUserGameHistory(user.getId());
                request.setAttribute("gameHistory", gameHistory);
                request.getRequestDispatcher("game_history.jsp").forward(request, response);
                return;
            } catch (Exception e) {
                response.sendRedirect("error.jsp");
                return;
            }
        }

        switch (action) {
            case "getState":
                getGameState(request, response);
                break;
            case "getScores":
                getHighScores(response);
                break;
            default:
                response.sendRedirect("game.html");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String action = request.getParameter("action");
        if (action == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        switch (action) {
            case "move":
                handleMove(request, response);
                break;
            case "saveScore":
                saveScore(request, response, session);
                break;
            case "reset":
                resetGame(request, response);
                break;
            case "saveProgress":
                saveGameProgress(request, response, session);
                break;
            default:
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    // ... [Previous methods remain the same: getGameState, initializeGame, handleMove, 
    //     isValidMove, isGameWon remain unchanged] ...

    private void saveScore(HttpServletRequest request, HttpServletResponse response, HttpSession session) 
            throws IOException {
        User user = (User) session.getAttribute("user");
        JSONObject gameState = (JSONObject) session.getAttribute("gameState");
        
        if (!gameState.getBoolean("completed")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        try (Connection conn = dbConnection.getConnection()) {
            String sql = "INSERT INTO scores (user_id, moves, time_elapsed) VALUES (?, ?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, user.getId());
                pstmt.setInt(2, gameState.getInt("moves"));
                pstmt.setLong(3, gameState.getLong("timeElapsed"));
                pstmt.executeUpdate();
            }
            
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"status\":\"success\"}");
            out.flush();
        } catch (SQLException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private void saveGameProgress(HttpServletRequest request, HttpServletResponse response, HttpSession session) 
            throws IOException {
        try {
            User user = (User) session.getAttribute("user");
            int moves = Integer.parseInt(request.getParameter("moves"));
            int disks = Integer.parseInt(request.getParameter("disks"));
            String completionTime = request.getParameter("completionTime");

            GameProgress progress = new GameProgress();
            progress.setUserId(user.getId());
            progress.setMoves(moves);
            progress.setDisks(disks);
            progress.setCompletionTime(completionTime);

            gameDAO.saveGameProgress(progress);
            
            response.setContentType("application/json");
            response.getWriter().write("{\"status\":\"success\"}");
        } catch (Exception e) {
            response.setContentType("application/json");
            response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    @Override
    public void destroy() {
        super.destroy();
        if (dbConnection != null) {
            dbConnection.closeConnection();
        }
    }
}
