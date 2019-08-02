$(document).ready(function () {

    $("#add").click(function () {
        $("#addMenu").toggle(200);
    });

    $("#addMaterial").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addCustomer").click(function () {
        $("#addMenu").hide(200);
    });
    $("#addVendor").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addAssets").click(function () {
        $("#addMenu").hide(200);
    });
    $("#addCatalog").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addReport").click(function () {
        $("#addMenu").hide(200);
    });

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