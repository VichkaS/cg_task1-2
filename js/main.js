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
        $('#myTable > tbody:last').append('<tr><td>название</td><td>1</td><td>дата</td></tr>');
    });
    $('#save').click(function() {
        saveTable();
    });

    $('#about').click(function() { 
         $('#overlay').fadeIn('fast',function(){ 
             $('#nonebox').animate({'top':'160px'},500);
         });
     });
    $('#box-close').click(function(){ 
         $('#nonebox').animate({'top':'-200px'},500,function(){
             $('#overlay').fadeOut('fast');
         });
     });
    $('#jsonBut').click(function() {
        $('#overlay').fadeIn('fast',function(){
             $('#nonebox1').animate({'top':'160px'},500);
                var user = getTable();
                var str = JSON.stringify(user);
                $('#tab').html(str);
         });
     });
    $('#box-close1').click(function(){
         $('#nonebox1').animate({'top':'-300px'},500,function(){
             $('#overlay').fadeOut('fast');
         });
     });          
})

function loadTable() {
    var obj = JSON.parse(localStorage["table"]);
    var listRecords = [];
    for (var i in obj) {
        console.log(obj[i]);
        $('#myTable > tbody:last').append('<tr><td>' + obj[i].country + '</td><td>'+ obj[i].population + '</td><td>' + obj[i].date + '</td></tr>');
    };  
}

function saveTable() {
    var rowsArr = getTable();
    localStorage["table"] = JSON.stringify(rowsArr);
}

function getTable() {
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
    return rowsArr;
}

window.onload = function() {
    loadTable();
}

var dialog = document.querySelector('dialog');
document.querySelector('#show').onclick = function() {
    $('#dia').animate({'top':'160px'},500);
    dialog.showModal();
    var canvas = document.getElementById("myCanvas"),
        ctx = canvas.getContext('2d'),
        tG = new G(),
        tV = new V(),
        tA = new A(),
        top = 0,
        bottom = canvas.height,
        vyG = 10,
        vyV = 8,
        vyA = 9;
    tG.x = 30;
    tG.y = 0;
    tV.x = 148;
    tV.y = 0;
    tA.x = 306;
    tA.y = 0;
    
    (function drawFrameG () {
        window.requestAnimationFrame(drawFrameG, canvas);
        ctx.clearRect(0, 0, 148, canvas.height);

        tG.y += vyG;

        if (tG.y + 140 > bottom ) {
          tG.y = bottom - 140;
          vyG *= -1;
        } else if (tG.y < top) {
          tG.y = top;
          vyG *= -1;
        }
        
        tG.printG(ctx);
      }());
    
    (function drawFrameV () {
        window.requestAnimationFrame(drawFrameV, canvas);
        ctx.clearRect(148, 0, 148, canvas.height);

        tV.y += vyV;

        if (tV.y + 140 > bottom ) {
          tV.y = bottom - 140;
          vyV *= -1;
        } else if (tV.y < top) {
          tV.y = top;
          vyV *= -1;
        }
        tV.printV(ctx); 
      }());
    (function drawFrameA () {
        window.requestAnimationFrame(drawFrameA, canvas);
        ctx.clearRect(296, 0, 148, canvas.height);

        tA.y += vyA;

        if (tA.y + 140 > bottom ) {
          tA.y = bottom - 140;
          vyA *= -1;
        } else if (tA.y < top) {
          tA.y = top;
          vyA *= -1;
        }
        tA.printA(ctx); 
      }());
    
};

document.querySelector('#close').onclick = function() {
  dialog.close();
  $('#dia').animate({'top':'-300px'},500)
};