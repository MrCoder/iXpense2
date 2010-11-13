function PresentationEntity(){
}

function SequencePrinter(ctx) {
    this.lastEntityLeft = 0;
    this.lastEntityWidth = 0;
    this.entitySpace = 100.3;
    this.lastMessageTop = 60;
    this.messageSpace = 50.1;
    this.presentationEntities = new Array();
    this.presentationEntitiesCount = 0;
    this.printEntity = function(entity) {
        var presentationEntity = new PresentationEntity();
        var newLeft = this.lastEntityLeft + this.lastEntityWidth + this.entitySpace;

        var lifeLineDrawer = new LifeLineDrawer(ctx, entity, newLeft, 700);

        this.lastEntityLeft = newLeft;
        this.lastEntityWidth = lifeLineDrawer.draw();

        presentationEntity.name = entity;
        presentationEntity.left = newLeft;
        presentationEntity.width = this.lastEntityWidth;
        if (!hasThisItem(this.presentationEntities, presentationEntity)){
            this.presentationEntities[this.presentationEntitiesCount++] = presentationEntity;
        }
    };

    this.printMessage = function (message) {
        var left = 0;
        var length = 0;
        var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, message.from);
        if (presentationEntityFrom != null){
            left = presentationEntityFrom.left + presentationEntityFrom.width/2;
        }
        var presentationEntityTo = getPresentationEntityByName(this.presentationEntities, message.to);
        if (presentationEntityTo != null){
            length = presentationEntityTo.left + presentationEntityTo.width/2 - left;
        }

        var messageDrawer = new MessageDrawer(ctx, message.message, left, this.lastMessageTop + this.messageSpace, length);
        messageDrawer.draw();
        this.lastMessageTop += this.messageSpace;
    };

}

function hasThisItem(presentationEntities, entity){
    for(var itemThis in presentationEntities){
        if (presentationEntities[itemThis].name == entity) return true;
    }
    return false;
}

function getPresentationEntityByName(presentationEntities, entity){
    for(var itemThis in presentationEntities){
        if (presentationEntities[itemThis].name == entity) return presentationEntities[itemThis];
    }
    return null;
}