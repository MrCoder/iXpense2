function EntityDrawer(ctx, entityName, left, top){
    this.draw = function(){
        ctx.font = "bold 14px Times New Roman";

        var maxWidth = 1000;
        var textMetrics = ctx.measureText(entityName);
        ctx.fillText(entityName, left, top + 20, maxWidth);
        return textMetrics.width;
    }
}