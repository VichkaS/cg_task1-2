var G = function() {
    this.x = 0;
    this.y = 0;
}

G.prototype.printG = function(ctx) {
    xG = this.x;
    yG = this.y;
    wG = 88;
    hG = 140;
    ctx.beginPath();
    ctx.moveTo(xG + wG, yG); //
    ctx.lineTo(xG, yG);
    ctx.lineTo(xG, yG + hG);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#2FEF11";
    ctx.lineCap = 'square';
    ctx.stroke();
}

var V = function() {
    this.x = 0;
    this.y = 0;
}

V.prototype.printV = function(ctx) {
    var wV = 88,
        hV = 140,
        xV = this.x,
        yV = this.y;
    ctx.beginPath();
    ctx.moveTo(xV + 60, yV);
    ctx.lineTo(xV, yV);
    ctx.lineTo(xV, yV + hV);
    ctx.lineTo(xV + wV, yV + hV);
    ctx.lineTo(xV + wV, yV + 60);
    ctx.lineTo(xV, yV + 60);
    ctx.moveTo(xV + 60, yV + 60);
    ctx.lineTo(xV + 60, yV);
    ctx.strokeStyle = "#EC0FCF";
    ctx.lineWidth = 20;
    ctx.lineCap = 'square';
    ctx.stroke();
}

var A = function() {
    this.x = 0;
    this.y = 0;
}
A.prototype.printA = function(ctx) {
    xA = this.x;
    yA = this.y;
    wA = 88;
    hA = 140;
    ctx.beginPath();
    ctx.moveTo(xA, yA);
    ctx.lineTo(xA - 44, yA + hA);
    ctx.moveTo(xA, yA);
    ctx.lineTo(xA + 44, yA + hA);
    ctx.moveTo(xA - 22, yA + 90);
    ctx.lineTo(xA + 22, yA + 90);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#FFC62A";
    ctx.lineCap = 'round';
    ctx.stroke();
}