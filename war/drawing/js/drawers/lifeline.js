function LifeLineDrawer(ctx) {
    this.context = ctx;
    this.draw = function(entityName, left, lifeLength, selected) {
        var top = 20;
        var entityHeight = 30;

        var entityDrawer = new EntityDrawer(ctx);
        var entityWidth = entityDrawer.draw(entityName, left, top, selected);
        
        var lineDrawer = new LineDrawer(ctx);
        lineDrawer.draw(left + (entityWidth)/2, top + entityHeight, lifeLength);

        return entityWidth;
    }
}