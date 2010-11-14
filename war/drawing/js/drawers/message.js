function MessageDrawer(ctx, message, left, top, length) {
    this.drawRightArrow = function() {
        new ArrowIconRightDrawer(ctx, left + length, top).draw();
    };

    this.drawLeftArrow = function() {
        new ArrowIconLeftDrawer(ctx, left+length, top).draw();
    };

    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left + length, top);
//        ctx.closePath();
        /* draw it! */
        ctx.strokeStyle = css("message", "color");
        ctx.stroke();

        var maxWidth = 1000;
        var textMetrics = ctx.measureText(message);
        ctx.font = "italic 12px Helvetica";
        ctx.fillText(message, left + length / 2 - textMetrics.width / 2 + 5, top - 3, 300);

        if(length > 0) {
            this.drawRightArrow();
        } else {
            this.drawLeftArrow();
        }
    }
}