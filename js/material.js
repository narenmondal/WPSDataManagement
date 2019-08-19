$(document).ready(function () {
    var Materiallist, plantList, html, i;

    // Plant data call and table init
    $.ajax({
        type: "GET",
        url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_plant_list/?$format=json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
        },
        success: function (data) {
            plantList = data;
            $("#plantTableBody").empty();
            for (i = 0; i < plantList.d.results.length; i++) {
                html = "<tr><td>" + plantList.d.results[i].PlantText + "</td><td>" + plantList.d.results[i].SlocationText + "</td><td>" + plantList.d.results[i].Werks + "</td><td>" + plantList.d.results[i].Slocation + "</td></tr>";

                $("#plantTableBody").append(html);
            }

            $('#plantTable').DataTable({
                "paging": false,
                "ordering": false,
                "info": false,
                "searching": false,
                scrollY: '400px',
                "columnDefs": [
                    {
                        "targets": [2],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [3],
                        "visible": false,
                        "searchable": false
                    }
                ]
            });

        },
        error: function (e) {
            console.log(e);
        }
    });

    // material data call and table init
    $.ajax({
        type: "GET",
        url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_material_list/?$format=json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
        },
        success: function (data) {
            Materiallist = data;

            $("#materialTableBody").empty();
            for (i = 0; i < Materiallist.d.results.length; i++) {
                html = "<tr><td>" + Materiallist.d.results[i].MaterialNo + "</td><td>" + Materiallist.d.results[i].MaterialName + "</td><td>" + Materiallist.d.results[i].PlantText + "</td><td>" + Materiallist.d.results[i].BaseUom + "</td><td>" + Materiallist.d.results[i].MaterialGroup + "</td></tr>";

                $("#materialTableBody").append(html);

            }
            $('#materialTable').DataTable({
                "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]]
            });
        },
        error: function (e) {
            console.log(e);
        }
    });




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
            for (var i = 0; i < Materiallist.d.results.length; i++) {
                if (Materiallist.d.results[i].MaterialName.toUpperCase().indexOf(input.toUpperCase()) > -1) {
                    $("#filterList").append("<li>" + Materiallist.d.results[i].MaterialName + "</li>");
                }
            }
        }
    });
    $("#filterList").on("click", "li", function () {
        $("#materialInputName").val(this.innerText);
        $("#materialInputName").focus();
    });

    $('#materialInputName').on("keyup", function (e) {
        if (e.keyCode == 13) {
            console.log('Enter');
            for (i = 0; i < Materiallist.d.results.length; i++) {
                if ($("#materialInputName").val().toUpperCase() === Materiallist.d.results[i].MaterialName.toUpperCase()) {
                    $("#createMaterialWarning").css('display', 'block');
                    break;
                }
            }

        }
    });

    $("body").on("keyup", function (e) {
        if (e.keyCode == 27) {
            $("#materialInputName").val("");
            $("#materialInput").css('display', 'none');
            $("#createMaterialWarning").css('display', 'none');
            $("#extendMaterialTable").css('display', 'none');
            $("#filterList").empty();
        }
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
        $("#materialInputName").focus();
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


    // Extend material
    $("#extendMaterial").on("click", function () {
        $("#materialInputName").val("");
        $("#materialInput").css('display', 'none');
        $("#createMaterialWarning").css('display', 'none');
        $("#filterList").empty();

        $("#extendMaterialTable").css('display', 'flex');
    });

    $('#plantTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('rowSelct');
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
});

