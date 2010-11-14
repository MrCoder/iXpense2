function InternalInvokeDrawer(context, message, left, top) {
    const arrowImageHeight = 18;
    const length = 30;
    function drawRightArrow() {
        var smallArrow = new Image();
        smallArrow.src = "./resource/arrow_right.gif";
        smallArrow.onload = function() {
            context.drawImage(smallArrow, left + length - 12, top - arrowImageHeight/2);
        };
    }

    function drawLeftArrow() {
        var smallArrow = new Image();
        smallArrow.src = "./resource/arrow_left.gif";
        smallArrow.onload = function() {
            context.drawImage(smallArrow, left - 6, top + 20 - arrowImageHeight/2);
        };
    }

    this.draw = function() {
        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left + length, top);
        context.lineTo(left + length, top + 20);
        context.lineTo(left, top + 20);
//        context.closePath(); // close path help you link back to the start point.
        /* draw it! */
        context.strokeStyle = "#000";
        context.stroke();
        drawLeftArrow();

        var maxWidth = 1000;
        var textMetrics = context.measureText(message);
        context.font = "italic 12px Helvetica";
        context.fillText(message, left, top - 3, 300);

    }
}