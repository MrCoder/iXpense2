function EntityDrawer(ctx, entityName, left, top){
    this.draw = function(){
        ctx.font = "bold 14px Times New Roman";

        var textMetrics = ctx.measureText(entityName);
        var rectangleWidth = textMetrics.width + 20;

        var rectangleDrawer = new RectangleDrawer(ctx, left, top, rectangleWidth);
        rectangleDrawer.draw();

        var maxWidth = 1000;
        ctx.fillStyle="#000";
        ctx.fillText(entityName, left + 10, top + 20, maxWidth);
        return rectangleWidth;
    }
}