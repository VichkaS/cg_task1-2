function pieChart() {
    var chartStartAngle = -.5 * Math.PI;
    var canvas = document.getElementById('diagram2d'),
        context = canvas.getContext('2d');
    var chartData = [];
    var totalValue = 0;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var centreX = canvasWidth / 2;
    var centreY = canvasHeight / 2;
    var chartRadius = (canvasWidth / 2) - 10;

    init();

    function init() { 
        var currentRow = -1;
        var currentCell = 0;
        $('#myTable td').each(function() {
            currentCell++;
            if ( currentCell % 2 != 0 ) {
                currentRow++;
                chartData[currentRow] = [];
                chartData[currentRow][0] = $(this).text();
            } else {
                var value = parseFloat($(this).text());
                totalValue += value;
                value = value.toFixed(2);
                chartData[currentRow][1] = value;
            }
            $(this).data('slice', currentRow);
        });

        var currentPos = 0;
        for (var slice in chartData) {
            chartData[slice]['startAngle'] = 2 * Math.PI * currentPos;
            chartData[slice]['endAngle'] = 2 * Math.PI * ( currentPos + ( chartData[slice][1] / totalValue ) );
            currentPos += chartData[slice][1] / totalValue;
        }
        drawChart();
    }
    
    function drawChart() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        for (var slice in chartData) {
            drawSlice(context, slice);
        }
    }

    function drawSlice (context, slice) {
        var startAngle = chartData[slice]['startAngle']  + chartStartAngle, 
            endAngle = chartData[slice]['endAngle']  + chartStartAngle;
        startX = centreX;
        startY = centreY;
        context.beginPath();
        context.moveTo(startX, startY);
        context.arc(startX, startY, chartRadius, startAngle, endAngle, false);
        context.lineTo(startX, startY);
        context.closePath();
        context.fillStyle = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
        context.fill();
        context.stroke();
    }
};