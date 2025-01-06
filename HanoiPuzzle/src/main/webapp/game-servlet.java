// GameServlet.java
package com.hanoiheights.servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.hanoiheights.dao.GameDAO;
import com.hanoiheights.model.GameProgress;

@WebServlet("/game")
public class GameServlet extends HttpServlet {
    private GameDAO gameDAO;

    public void init() {
        gameDAO = new GameDAO();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            int userId = ((User) session.getAttribute("user")).getId();
            try {
                List<GameProgress> gameHistory = gameDAO.getUserGameHistory(userId);
                request.setAttribute("gameHistory", gameHistory);
                request.getRequestDispatcher("game_history.jsp").forward(request, response);
            } catch (Exception e) {
                response.sendRedirect("error.jsp");
            }
        } else {
            response.sendRedirect("login.jsp");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            int userId = ((User) session.getAttribute("user")).getId();
            int moves = Integer.parseInt(request.getParameter("moves"));
            int disks = Integer.parseInt(request.getParameter("disks"));
            String completionTime = request.getParameter("completionTime");

            GameProgress progress = new GameProgress();
            progress.setUserId(userId);
            progress.setMoves(moves);
            progress.setDisks(disks);
            progress.setCompletionTime(completionTime);

            try {
                gameDAO.saveGameProgress(progress);
                response.setContentType("application/json");
                response.getWriter().write("{\"status\":\"success\"}");
            } catch (Exception e) {
                response.setContentType("application/json");
                response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
            }
        } else {
            response.sendRedirect("login.jsp");
        }
    }
}
