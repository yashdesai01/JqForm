$(document).ready(function () {

    $("#AddRecord").click(function () {
        $.ajax({
            url: '/Home/AddRow',
            success: function (partialView) {
                $('#AddNewRow').append(partialView);
            }
        });
    });
});
function btnSubmit(element) {
    var EmpData = [];
    var row = $(element).closest('tr');
    var obj = {
        "Name": row.find(".name").val(),
        "Salary": $(row).find(".salary").val(),
        "DOB": $(row).find(".dob").val(),
        "Age": $(row).find(".age").val(),
        "Language": $(row).find(".language").val()
    }
    EmpData.push(obj);
    SaveList(EmpData);
}

function SaveList(EmpData) {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        url: "/Home/Index",
        type: 'Post',
        data: JSON.stringify(EmpData),
        success: function (response) {
            window.location.reload();
        },
        error: function (xhr, exception, thrownError) {
            alert("Error");
        }
    })
}

function btnSaveAll() {
    var EmpData = [];
    var rows = $('#Emptab > tbody>tr.new');
    rows.each(function (index, row) {
        var obj = {
            "Name": $(row).find(".name").val(),
            "Salary": $(row).find(".salary").val(),
            "DOB": $(row).find(".dob").val(),
            "Age": $(row).find(".age").val(),
            "Language": $(row).find(".language").val()
        }
        EmpData.push(obj);
    });
    SaveList(EmpData);
}

function DeleteRecord(EmpId) {
    $.ajax({
        url: "/Home/Delete?EmpId=" + EmpId,
        type: "POST",
        success: function (data) {
            alert("Record Deleted sucessfully");
            window.location.reload();
        },
        error: function (xhr, exception, thrownError) {
            alert("Error");
        }
    });
}

function EditRecord(EmpId) {
    $.ajax({
        url: '/Home/Edit?id=' + EmpId,
        success: function (partialView) {
            console.log(partialView);
            $('#AddNewRow').append(partialView);
        }
    });
}

function EditSubmit(element) {
    var EmpData = [];
    var row = $(element).closest('tr');
    var obj = {
        //"EmpID": row.find(".EmpID").val(),
        "EmpID": $('.EmpID').val(),
        "Name": row.find(".name").val(),
        "Salary": $(row).find(".salary").val(),
        "DOB": $(row).find(".dob").val(),
        "Age": $(row).find(".age").val(),
        "Language": $(row).find(".language").val()
    }
    EmpData.push(obj);
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        url: "/Home/Edit",
        type: 'Post',
        data: JSON.stringify(EmpData),
        success: function (response) {
            window.location.reload();
        },
        error: function (xhr, exception, thrownError) {
            alert("Error");
        }
    })
}

function DeleteAll() {
    var selectedIDs = [];
    var rows = $('#Emptab > tbody>tr .EmpId:checked');
    rows.each(function (index, row) {
        var id = $(row).val();
        if (id) {
            selectedIDs.push(id);
        }
    });
    console.log(selectedIDs);
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        url: "/Home/Delete",
        type: 'Post',
        data: JSON.stringify(selectedIDs),
        success: function (response) {
            window.location.reload();
        },
        error: function (xhr, exception, thrownError) {
            alert("Error");
        }
    })
   
}