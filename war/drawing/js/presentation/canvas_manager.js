function CanvasManager(container) {
    this.lifeLineDrawer = new LifeLineDrawer();
    this.leftMargin = 20.1;
    this.lifeLenght = 700;
    this.rightBound = 0;
    function createCanvas(entityName) {
        var canvasId = 'entity_canvas_' + entityName;
        var canvasEle = $('<canvas/>', {id:canvasId, class:'canvas'});

        container.append(canvasEle);
        canvasEle[0].width = canvasEle[0].clientWidth;
        canvasEle[0].height = canvasEle[0].clientHeight;

        return canvasEle[0];
    }

    this.addEntity = function(entityName) {
        var context = createCanvas(entityName).getContext('2d');
        var newLeft = 0;
        newLeft = this.rightBound + this.leftMargin;
        var entityWidth = this.lifeLineDrawer.draw(context, entityName, newLeft, this.lifeLenght, false);
        this.rightBound = newLeft + entityWidth;
    }
}

