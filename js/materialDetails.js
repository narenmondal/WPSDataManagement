$(document).ready(function () {

    $("input").attr("disabled", true);
    $("textArea").attr("disabled", true);

    var materialNumber = sessionStorage.getItem("materialNumber");
    var materialPlant = sessionStorage.getItem("materialPlant");

    $("#number").val(materialNumber);
    $("#plant").val(materialPlant);

});