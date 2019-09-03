
$(document).ready(function () {
    var Materiallist, plantList, html, i, materialDataTable, plantDataTable;

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

            plantDataTable = $('#plantTable').DataTable({
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
            materialDataTable = $('#materialTable').DataTable({
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
            var data = materialDataTable.row(this).data();
            // alert('You clicked on ' + data[0] + '\'s row');
            sessionStorage.setItem("materialNumber", data[0]);
            sessionStorage.setItem("materialPlant", data[2]);
            location.href = "./materialDetails.html";
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
        $("#materialInputName").focus();
        $("#materialInputName").val(this.innerText);
    });

    // enter press on material name
    $('#materialInputName').on("keyup", function (e) {
        if (e.keyCode == 13) {
            for (i = 0; i < Materiallist.d.results.length; i++) {
                if ($("#materialInputName").val().toUpperCase() === Materiallist.d.results[i].MaterialName.toUpperCase()) {
                    $("#createMaterialWarning").css('display', 'block');
                    break;
                }
            }

        }
    });

    // escape press
    $("body").on("keyup", function (e) {
        if (e.keyCode == 27) {
            $("#materialInputName").val("");
            $("#materialInput").css('display', 'none');
            $("#createMaterialWarning").css('display', 'none');
            $("#extendMaterialTable").css('display', 'none');
            $("#filterList").empty();
            $('#plantTable tbody tr').removeClass('plantSelct');
        }
    });

    // select enable and disable
    $("#selectRow").click(function () {
        if ($('#selectRow').is(":checked") === false) {
            $('#materialTable tbody tr').removeClass('selected');
            $("#materialselectAll").hide(250);
            $("#materialunselectAll").hide(250);
            $("#materialExtendToSelected").hide(250);
        } else {
            $("#materialselectAll").show(250);
            $("#materialunselectAll").show(250);
            $("#materialExtendToSelected").show(250);
        }
    });

    // create single and multiple
    $("#createSingle").click(function () {
        $("#addMenu").hide(200);
        $("#materialInput").css('display', 'flex');
        $("#materialInputName").focus();
    });

    $("#createMultiple").click(function () {
        $("#addMenu").hide(200);
    });

    // Extend material
    $("#extendMaterial").on("click", function () {
        $("#materialInputName").val("");
        $("#materialInput").css('display', 'none');
        $("#createMaterialWarning").css('display', 'none');
        $("#filterList").empty();

        $("#extendMaterialTable").css('display', 'flex');
        plantDataTable.draw(false);
    });

    $('#plantTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('plantSelct');
    });

    $("#selectAll").on("click", function () {
        $('#plantTable tbody tr').addClass('plantSelct');
    });

    $("#unselectAll").on("click", function () {
        $('#plantTable tbody tr').removeClass('plantSelct');
    });

    $("#materialselectAll").on("click", function () {
        $('#materialTable tbody tr').addClass('selected');
    });

    $("#materialunselectAll").on("click", function () {
        $('#materialTable tbody tr').removeClass('selected');
    });

    $("#viewMaterial").on("click", function () {
        // $("#materialInputName").val()
        for (i = 0; i < Materiallist.d.results.length; i++) {
            if ($("#materialInputName").val().toUpperCase() === Materiallist.d.results[i].MaterialName.toUpperCase()) {
                console.log(Materiallist.d.results[i]);
                sessionStorage.setItem("materialNumber", Materiallist.d.results[i].MaterialNo);
                sessionStorage.setItem("materialPlant", Materiallist.d.results[i].PlantText);
                location.href = "./materialDetails.html";
                break;
            }
        }
    });


});

