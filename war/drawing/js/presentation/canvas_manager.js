function CanvasManager(container){
    this.entityDrawer = new EntityDrawer();
    this.addEntity = function(entityName){
        var canvasId = 'entity_canvas_' + entityName;
        var canvasEle = $('<canvas/>', {id:canvasId, 'width': "2048px", 'height': "768px"});
        canvasEle[0].width = 2048;
        canvasEle[0].height = 768;

        container.append(canvasEle);
        var context = canvasEle[0].getContext('2d');

        this.entityDrawer.draw(context, entityName, 20, 20, false);

    }
}

