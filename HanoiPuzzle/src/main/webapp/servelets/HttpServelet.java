package com.hanoiheights.servelets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

public abstract class HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // Service method to handle both GET and POST requests
    protected void service(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String method = request.getMethod();
        
        if (method.equals("GET")) {
            doGet(request, response);
        } else if (method.equals("POST")) {
            doPost(request, response);
        } else {
            String errMsg = "HTTP method " + method + " is not supported";
            response.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, errMsg);
        }
    }
    
    // Default implementation of doGet
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String protocol = request.getProtocol();
        String msg = "GET method not supported";
        if (protocol.endsWith("1.1")) {
            response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, msg);
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, msg);
        }
    }
    
    // Default implementation of doPost
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String protocol = request.getProtocol();
        String msg = "POST method not supported";
        if (protocol.endsWith("1.1")) {
            response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, msg);
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, msg);
        }
    }
    
    // Initialize the servlet
    public void init() throws ServletException {
        // Initialization code
    }
    
    // Clean up resources
    public void destroy() {
        // Cleanup code
    }
    
    // Get servlet information
    public String getServletInfo() {
        return "Tower of Hanoi Game Servlet";
    }
}
