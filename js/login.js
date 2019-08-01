$(document).ready(function () {
    $("#login").click(function () {

        var userName = $("#userName").val();
        var password = $("#password").val();

        if (userName === "admin" && password === "login") {
            $("#error").hide();
            location.href = './dashboard.html';
        } else {
            $("#error").show();
            $("#password").val("");
        }
    });
});