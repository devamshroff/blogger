import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class Hello extends HttpServlet implements Servlet {
       
    public Hello() {}

    // protected void doGet(HttpServletRequest request, HttpServletResponse response)
    // throws ServletException, IOException
    // {
    //     PrintWriter out = response.getWriter();
    //     out.println("<!DOCTYPE html>");
    //     out.println("<html>");
    //     out.println("<head><title>Servlet Example</title></head>");
    //     out.println("<body>Hello, " + request.getParameter("name") + "!<br>");
    //     out.println("Greetings from a Java Servlet.</body>");
    //     out.println("</html>");
    //     out.close();
    // }
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
        String pageTitle = "Servlet Example";
        request.setAttribute("title", pageTitle);
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }
}