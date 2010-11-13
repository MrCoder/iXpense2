function RectangleDrawer(ctx, left, top, width) {
    this.draw = function() {
        ctx.strokeStyle=css("entityBox", "color");
        
        ctx.strokeRect(left, top, width, 30);

    }
}