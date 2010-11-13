function LineDrawer(ctx, left, top, height) {
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left, top + height);
        ctx.closePath();
        /* draw it! */
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
}