function EntityDrawer(ctx, entityName, left, top){
    this.draw = function(){
        ctx.font = "bold 14px sans-serif";

        var maxWidth = 1000;
        var textWidth = ctx.measureText(entityName);
        ctx.fillText(entityName, left, top + 20, maxWidth);
        return textWidth.width;
    }
}