$(document).ready(function () {

    $("#openNav").click(function () {
        $("#navbar").css("width", "200px");
    });

    $("#closeNav").click(function () {
        $("#navbar").css("width", "0");
    });

    $("#profileImage").click(function () {
        $("#profileMenu").toggle(200);
    });

    $("#viewProfile").click(function () {
        $("#profileMenu").hide(200);
    });

    $("#changePassword").click(function () {
        $("#profileMenu").hide(200);
    });

    $("#logOut").click(function () {
        $("#profileMenu").hide(200);
        location.href = './login.html';
    });

    $("#material").click(function () {
        $("#profileMenu").hide(200);
        location.href = 'material.html';
    });


});