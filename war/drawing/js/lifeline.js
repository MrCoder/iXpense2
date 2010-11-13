function LifeLineDrawer(ctx, entityName, left, lifeLength) {
    this.context = ctx;
    this.draw = function() {
        var top = 20;

        var entityDrawer = new EntityDrawer(ctx, entityName, left+ 10, top);
        var textWidth = entityDrawer.draw();
        var rectangleWidth = textWidth + 20;
        var rectangleDrawer = new RectangleDrawer(ctx, left, top, rectangleWidth);
        rectangleDrawer.draw();

        var lineDrawer = new LineDrawer(ctx, left + (textWidth + 20)/2, top + 30, lifeLength);
        lineDrawer.draw();

        return rectangleWidth;
    }
}