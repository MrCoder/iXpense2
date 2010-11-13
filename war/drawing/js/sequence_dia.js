function SequencePrinter(ctx){
    this.lastLeft = 0;
    this.lastWidth = 0;
    this.space = 20;
    this.printEntity = function(entity){
        var newLeft = this.lastLeft + this.lastWidth + this.space;
        var lifeLineDrawer = new LifeLineDrawer(ctx, entity, newLeft, 700);
        this.lastLeft = newLeft;
        this.lastWidth = lifeLineDrawer.draw();
    }
}