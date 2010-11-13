function MessageDrawer(ctx, message, left, top, length) {
    const arrowImageHeight = 18;
    function drawRightArrow() {
        var smallArrow = new Image();
        smallArrow.src = "./resource/arrow_right.gif";
        smallArrow.onload = function() {
            ctx.drawImage(smallArrow, left + length - 12, top - arrowImageHeight/2);
        };
    }

    function drawLeftArrow() {
        var smallArrow = new Image();
        smallArrow.src = "./resource/arrow_left.gif";
        smallArrow.onload = function() {
            ctx.drawImage(smallArrow, left + length - 6, top - arrowImageHeight/2);
        };
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left + length, top);
        ctx.closePath();
        /* draw it! */
        ctx.strokeStyle = css("message", "color");
        ctx.stroke();

        var maxWidth = 1000;
        var textMetrics = ctx.measureText(message);
        ctx.font = "italic 12px Helvetica";
        ctx.fillText(message, left + length / 2 - textMetrics.width / 2 + 5, top - 3, 300);

        if(length > 0) {
            drawRightArrow();
        } else {
            drawLeftArrow();
        }
    }
}