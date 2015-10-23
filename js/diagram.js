var color = ["#FF0000", "#FF8C00", "#FFD700", "#FFFF00", "#7FFF00", "#00FA9A", "#40E0D0", " #0000CD", "#9400D3", "#FF00FF"];
var masColor = [];
var chartStartAngle = -.5 * Math.PI;
var canvas = document.getElementById('diagram3d'),
    context = canvas.getContext('2d');
var chartData = [];

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var centreX2d = canvasWidth / 4;
var centreY2d = canvasHeight / 2;
var centreX3d = (canvasWidth / 2) + (canvasWidth / 4);
var centreY3d = canvasHeight / 2;

var radiusA = (canvasWidth / 4) - 10;
var radiusB = (canvasWidth / 4) - 130;
var chartRadius = (canvasWidth / 4) - 50;

function initDiagram() {
    chartData = []
    var totalValue = 0;
    var currentRow = -1;
    var currentCell = 0;
    $('#myTable td').each(function() {
        currentCell++;
        if ( currentCell % 2 != 0 ) {
            currentRow++;
            chartData[currentRow] = [];
            chartData[currentRow][0] = $(this).text();
            if (masColor[currentRow] == null) {
                if((currentRow % 10 == 0) && (currentRow != 0)) {
                    console.log(currentRow % 0);
                    masColor[currentRow] = randomColor();
                } else {
                    masColor[currentRow] = color[currentRow % 10];
                }
            }
        } else {
            var value = parseFloat($(this).text());
            totalValue += value;
            chartData[currentRow][1] = value;
        }
        $(this).data('slice', currentRow);
    });

    var currentPos = 0;
    for (var slice in chartData) {
        chartData[slice]['startAngle'] = 2 * Math.PI * currentPos;
        chartData[slice]['endAngle'] = 2 * Math.PI * (currentPos + (chartData[slice][1] / totalValue ));
        currentPos += chartData[slice][1] / totalValue;
    }
    console.log(chartData);
}


function drawChart3d() {
    context.clearRect(0, (canvasWidth / 2), (canvasWidth / 2), canvasHeight);
    for (var i = 0; i <= 40; i+=1) {
        for (var slice in chartData) {
            context.fillStyle = masColor[slice];
            context.strokeStyle = '#000';
            drawSlice3d(context, slice, centreX3d, centreY3d - i);
        }
    }     
}

function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function drawSlice3d(context, slice, cntrX, cntrY) {
    var startAngle = chartData[slice]['startAngle'] + chartStartAngle, 
        endAngle = chartData[slice]['endAngle'] + chartStartAngle;
    context.save();
    context.beginPath();
    context.translate(cntrX, cntrY);
    context.moveTo(0, 0);
    context.scale(radiusA / radiusB, 1);
    context.arc(0, 0, radiusB, startAngle, endAngle, false);
    context.restore();
    context.lineWidth = 1; 
    context.stroke();
    context.closePath();
    context.fill();
}

function drawChart2d() {
    context.clearRect(0, 0, (canvasWidth / 2), canvasHeight);
    for (var slice in chartData) {
        drawSlice2d(context, slice);
    }
}

function drawSlice2d(context, slice) {
    var startAngle = chartData[slice]['startAngle']  + chartStartAngle, 
        endAngle = chartData[slice]['endAngle']  + chartStartAngle;
    startX = centreX2d;
    startY = centreY2d;
    context.beginPath();
    context.moveTo(startX, startY);
    context.arc(startX, startY, chartRadius, startAngle, endAngle, false);
    context.lineTo(startX, startY);
    context.fillStyle = masColor[slice];
    context.fill();
    context.stroke();
    context.closePath();
}

function drawHint(count) {
    context.clearRect(0, (canvasWidth / 2), (canvasWidth / 2), canvasHeight);
    for (var i = 0; i <= 40; i+=1) {
        for (var slice in chartData) {
            if (count == slice) {
                context.fillStyle = "#ffffe0";
                context.strokeStyle = "#eeeed1";
            } else {
                context.fillStyle = masColor[slice];
                context.strokeStyle = "#000";
            }
            drawSlice3d(context, slice, centreX3d, centreY3d - i);
        }
    }
    context.clearRect((canvasWidth / 2), 0, (canvasWidth / 2), 70);
    context.beginPath();
    context.font = "26px comic sans ms";
    context.strokeStyle = masColor[count];
    context.lineWidth = 5;
    context.strokeRect((canvasWidth / 2) + 70, 17, (canvasWidth / 2) - 150, 40);
    context.fillStyle = "#000";
    context.fillText(chartData[count][0], (canvasWidth / 2) + 80, 45);
    context.closePath();
}

canvas.onmousemove = function ( clickEvent ) {
  var mouseX = clickEvent.pageX - this.offsetLeft;
  var mouseY = clickEvent.pageY - this.offsetTop;

  var xFromCentre = mouseX - centreX3d;
  var yFromCentre = (mouseY + 40) - centreY3d;
  var distanceFromCentre = Math.pow(Math.abs(xFromCentre), 2) / Math.pow(radiusA, 2) + 
      Math.pow( Math.abs(yFromCentre), 2) / Math.pow(radiusB, 2);

  if (distanceFromCentre <= 1) {
    var clickAngle = Math.atan2( yFromCentre / radiusB, xFromCentre / radiusA ) - chartStartAngle;
    if ( clickAngle < 0 ) clickAngle = 2 * Math.PI + clickAngle;          
    for ( var slice in chartData ) {
      if ( clickAngle >= chartData[slice]['startAngle'] && clickAngle <= chartData[slice]['endAngle'] ) {
          drawHint(slice);
      }
    }
  } else {
      context.clearRect((canvasWidth / 2), 0, (canvasWidth / 2), 70);
      drawChart3d();
  }
}