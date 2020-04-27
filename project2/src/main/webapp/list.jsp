<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>List Posts</title>
</head>
<body>
<div>
    <form action="post" id="0" method="POST">
        <input type="hidden" name="username" value="${username}">
        <input type="hidden" name="postid" value="0">
        <button type="submit" name="action" value="open">New Post</button>
    </form>
</div>
    <table>
        <tr>
            <th>Title</th>
            <th>Created</th>
            <th>Modified</th>
            <th>&nbsp;</th>
        </tr>
        <%-- we only attempt to display the articles if we have any for that user --%>
        <c:if test = "${titles.size() == 1}"> 
        <c:forEach begin="0" end="${titles.size()-1}" varStatus="loop">
            <tr>
            <%-- title --%>
            <td><c:out value="${titles.get(loop.count-1)}"/></td>
            <%-- date created --%>
            <td><c:out value="${dates_created.get(loop.count-1)}"/></td>
            <%-- date modified --%>
            <td><c:out value="${dates_modified.get(loop.count-1)}"/></td>
            <td>
                <form action="/editor/post?username=${username}&postid=${post_ids.get(loop.count-1)}&action=open" method="POST">
                    <button type="submit" name="action" value="open">Open</button>
                </form>
                <%-- TODO: deleting stuff from database. don't wanna do it yet cause we don't have add functionality. --%>
                <form action="/editor/post?username=${username}&action=delete" method="POST">
                    <button type="submit" name="action" value="delete">Delete</button>
                </form>
            </td>
            </tr>
        </c:forEach>
        </c:if>
          </table>
       
</body>
</html>
