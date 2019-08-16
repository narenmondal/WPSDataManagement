$(document).ready(function () {
    var Materiallist;
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

    $.ajax({
        type: "GET",
        url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_material_list/?$format=json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
        },
        success: function (data) {
            console.log(data);
            Materiallist = data;
            console.log(Materiallist.d.results[0].BaseUom);

            var html;
            $("#materialTableBody").empty();
            for (var i = 0; i < Materiallist.d.results.length; i++) {
                html = "<tr><td>" + Materiallist.d.results[i].MaterialNo + "</td><td>" + Materiallist.d.results[i].MaterialName + "</td><td>" + Materiallist.d.results[i].PlantText + "</td><td>" + Materiallist.d.results[i].BaseUom + "</td><td>" + Materiallist.d.results[i].MaterialGroup + "</td></tr>";

                $("#materialTableBody").append(html);

            }
            $('#materialTable').DataTable({
                "paging": true,
                "ordering": false,
                "info": false
            });
        },
        error: function (e) {
            console.log(e);
        }
    });



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

