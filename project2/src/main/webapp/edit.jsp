<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post</title>
</head>
<body>
    <div><h1>Edit Post</h1></div>
    <form action="post" method="POST">
        <div>
            <input type="hidden" id="postid"  name="postid" value="${param.postid}"> 
            <input type="hidden" id="username" name="username" value="${param.username}"> 
        </div>
        <div>
            <button type="submit" name="action" value="save">Save</button>
            <button type="submit" name="action" value="close">Close</button>
            <button type="submit" name="action" value="preview">Preview</button>
            <button type="submit" name="action" value="delete">Delete</button>
        </div>
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" value='<%= request.getAttribute("title") %>'> 
        </div>
        <div>
            <label for="body">Body</label>
            <textarea style="height: 20rem;" id="body" name="body"><%= request.getAttribute("body") %></textarea>
        </div>
    </form>
</body>
</html>
