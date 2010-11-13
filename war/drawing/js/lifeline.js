function LifeLineDrawer(ctx, entityName, left, lifeLength) {
    this.context = ctx;
    this.draw = function() {
        var top = 20;
        var entityHeight = 30;

        var entityDrawer = new EntityDrawer(ctx, entityName, left, top);
        var entityWidth = entityDrawer.draw();
        
        var lineDrawer = new LineDrawer(ctx, left + (entityWidth)/2, top + entityHeight, lifeLength);
        lineDrawer.draw();

        return entityWidth;
    }
}