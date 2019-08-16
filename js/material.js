$(document).ready(function () {

    var materialData = {
        data: [
            {
                name: "material 1",
                number: "10001"
            },
            {
                name: "material 2",
                number: "10002"
            },
            {
                name: "material 3",
                number: "10003"
            },
            {
                name: "material 4",
                number: "10004"
            },
            {
                name: "material 5",
                number: "10005"
            },
            {
                name: "material 6",
                number: "10006"
            },
            {
                name: "material 7",
                number: "10007"
            },
            {
                name: "material 8",
                number: "10008"
            },
            {
                name: "material 9",
                number: "10009"
            },
            {
                name: "material 10",
                number: "10010"
            }
        ]
    };

    var table = $('#materialTable').DataTable({ paging: false });
    // console.log(table.data()[0][0]);
    // table events
    $('#materialTable tbody').on('click', 'tr', function () {
        if ($('#selectRow').is(":checked") === true) {
            $(this).toggleClass('selected');

        } else {
            var data = table.row(this).data();
            alert('You clicked on ' + data[0] + '\'s row');
        }
    });

    // reading the selected items on read select click event
    // $('#readSelect').click(function () {
    //     console.log(table.rows('.selected').data());
    // });

    // Search and filter of create material

    $("#materialInputName").on("keyup", function searchMaterial() {
        $("#filterList").empty();
        input = $("#materialInputName").val();
        if (input !== "") {
            for (material of materialData.data) {
                if (material.name.toUpperCase().indexOf(input.toUpperCase()) > -1) {
                    $("#filterList").append("<li>" + material.name + "</li>");
                }
            }
        }
    });
    $("#filterList").on("click", "li", function () {
        console.log(this.innerText);
    });
    // click events

    $("#selectRow").click(function () {
        if ($('#selectRow').is(":checked") === false) {
            $('#materialTable tbody tr').removeClass('selected');
        }
    });
    // add material menu controls
    $("#add").click(function () {
        $("#addMenu").toggle(200);
    });

    $("#createSingle").click(function () {
        $("#addMenu").hide(200);
        $("#materialInput").css('display', 'flex');
    });

    $("#createMultiple").click(function () {
        $("#addMenu").hide(200);
    });
    // nav open and close
    $("#openNav").click(function () {
        $("#navbar").css("width", "200px");
    });

    $("#closeNav").click(function () {
        $("#navbar").css("width", "0");
    });
    // profile controls
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
    // Creat material popup buttons
    $("#materialNextButton").click(function () {
        $("#materialInput").css('display', 'none');

    });
    $("#materialCancelButton").click(function () {
        $("#materialInput").css('display', 'none');
    });


});

