function LifeLineDrawer(ctx, entityName, lifeLength) {
    this.context = ctx;
    this.draw = function() {
        this.context.fillStyle = "red";
        this.context.fillRect(0, 0, 100, 50);
    }
}