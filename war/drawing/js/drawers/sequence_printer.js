function PresentationEntity() {
    this.selected = false;
}


SequencePrinter.prototype.printEntity = function(entityName, height) {
    var existingPresentationEntity = this.presentationEntities.getEntity(entityName);
    if (existingPresentationEntity != null) {

        var lifeLineDrawer = new LifeLineDrawer(this.context);
        return lifeLineDrawer.draw(existingPresentationEntity.name, existingPresentationEntity.left, height, existingPresentationEntity.selected);
    } else {
        var newLeft = 0;

        if (this.leftOfMostRightEntity == 0) {
            newLeft = this.entitySpace / 2;
        } else {
            newLeft = this.leftOfMostRightEntity + this.lastEntityWidth + this.entitySpace;
        }
        var lifeLineDrawer = new LifeLineDrawer(this.context);
        this.lastEntityWidth = lifeLineDrawer.draw(entityName, newLeft, height);

        this.leftOfMostRightEntity = newLeft;

        this.presentationEntities.addEntity(entityName, newLeft, this.lastEntityWidth);
    }

};

function SequencePrinter(context, width, height) {
    this.leftOfMostRightEntity = 0;
    this.lastEntityWidth = 0;
    this.entitySpace = 150.3;
    this.lastMessageTop = 60;
    this.messageSpace = 18.1;
    this.presentationEntities = new Array();
    this.presentationEntitiesCount = 0;
    this.selectedPresentationEntity = null;
    this.context = context;
    this.presentationEntities = new PresentationEntities();


    this.printMessage = function (syncMessage) {
        this.printEntity(syncMessage.from, height);
        this.printEntity(syncMessage.to, height);
        var left = 0;
        var length = 0;
        var presentationEntityFrom = this.presentationEntities.getEntity(syncMessage.from);
        left = presentationEntityFrom.left + presentationEntityFrom.width / 2;
        var presentationEntityTo = this.presentationEntities.getEntity(syncMessage.to);
        length = presentationEntityTo.left + presentationEntityTo.width / 2 - left;

        var messageDrawer = new MessageDrawer(context);
        messageDrawer.draw(syncMessage.message, left, this.lastMessageTop + this.messageSpace, length);
        this.lastMessageTop += this.messageSpace;
    };

    this.printInternalInvokeMessage = function(selfInvokeMessage) {
        this.printEntity(selfInvokeMessage.from, height);
        var presentationEntityFrom = this.presentationEntities.getEntity(selfInvokeMessage.from);

        new InternalInvokeDrawer(context)
                .draw(selfInvokeMessage.message, presentationEntityFrom.left + presentationEntityFrom.width / 2, this.lastMessageTop + this.messageSpace);
        this.lastMessageTop += this.messageSpace * 2;
    };


    this.printGrid = function() {
        var gridDrawer = new GridDrawer(context);
        gridDrawer.draw(width, height);
    };

    this.checkEntity = function(xMousePos, yMousePos) {
        return this.presentationEntities.checkEntity(xMousePos, yMousePos);
    };

    this.selectEntity = function(entityName) {
        this.presentationEntities.selectEntity(entityName);
        this.onRefresh();
    };

    this.moveLeft = function() {
        this.presentationEntities.moveSelectedLeft()
        this.onRefresh();
    };

    this.moveRight = function() {
        this.presentationEntities.moveSelectedRight()
        this.onRefresh();
    };


    this.textInfo = function() {
        return this.presentationEntities.textInfo();
    };

    this.resetMessageTop = function() {
        this.lastMessageTop = 60;
    };

}



