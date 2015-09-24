$('body').on('dblclick','td', function(e) {
    var t = e.target || e.srcElement;
        var elm_name = t.tagName.toLowerCase();
        if(elm_name == 'input')	{return false;}
        var val = $(this).html();
        var code = '<input type="text" id="edit" value="'+val+'"/>';
        $(this).empty().append(code);
        $('#edit').focus();
        $('#edit').blur(function()	{
            var val = $(this).val();
            $(this).parent().empty().html(val);
        });
});

$(document).ready(function () {
    $('#createExtraButton').click(function() {
        $('#myTable > tbody:last').append('<tr><td>название</td><td>население</td><td>дата</td></tr>');
    });
    $('#save').click(function() {
        saveTable();
        console.log(123);
    });
});

function loadTable() {
    var obj = JSON.parse(localStorage["table"]);
    var listRecords = [];
    for (var i in obj) {
        console.log(obj[i]);
        $('#myTable > tbody:last').append('<tr><td>' + obj[i].country + '</td><td>'+ obj[i].population + '</td><td>' + obj[i].date + '</td></tr>');
    };  
}

function saveTable() {
    var tableObj = {};
    var rowsArr = [];
    var table = document.getElementById('myTable').getElementsByTagName('tbody')[0];

    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++)
        {
            var cells = rows[i].getElementsByTagName('td');
            var cell = {};
            cell['country'] = cells[0].innerHTML;
            cell['population'] = cells[1].innerHTML;
            cell['date'] = cells[2].innerHTML;
            rowsArr.push(cell);
        }
    localStorage["table"] = JSON.stringify(rowsArr);
}
window.onload = function() {
    loadTable();
}