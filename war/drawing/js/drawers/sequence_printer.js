function PresentationEntity() {
}

function SequencePrinter(context) {
    this.lastEntityLeft = 0;
    this.lastEntityWidth = 0;
    this.entitySpace = 150.3;
    this.lastMessageTop = 60;
    this.messageSpace = 15.1;
    this.presentationEntities = new Array();
    this.presentationEntitiesCount = 0;

    this.printEntity = function(entity) {
        var presentationEntity = new PresentationEntity();

        var newLeft = 0;
        if (this.lastEntityLeft == 0) {
            newLeft = this.entitySpace / 2;
        } else {
            newLeft = this.lastEntityLeft + this.lastEntityWidth + this.entitySpace;
        }
        var lifeLineDrawer = new LifeLineDrawer(context, entity, newLeft, 700);

        this.lastEntityLeft = newLeft;
        this.lastEntityWidth = lifeLineDrawer.draw();

        presentationEntity.name = entity;
        presentationEntity.left = newLeft;
        presentationEntity.width = this.lastEntityWidth;
        if (!hasThisItem(this.presentationEntities, presentationEntity)) {
            this.presentationEntities[this.presentationEntitiesCount++] = presentationEntity;
        }
    };

    this.printMessage = function (syncMessage) {
        var left = 0;
        var length = 0;
        var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, syncMessage.from);
        if (presentationEntityFrom != null) {
            left = presentationEntityFrom.left + presentationEntityFrom.width / 2;
        }
        var presentationEntityTo = getPresentationEntityByName(this.presentationEntities, syncMessage.to);
        if (presentationEntityTo != null) {
            length = presentationEntityTo.left + presentationEntityTo.width / 2 - left;
        }

        var messageDrawer = new MessageDrawer(context, syncMessage.message, left, this.lastMessageTop + this.messageSpace, length);
        messageDrawer.draw();
        this.lastMessageTop += this.messageSpace;
    };

    this.printInternalInvokeMessage = function(selfInvokeMessage) {
        var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, selfInvokeMessage.from);

        new InternalInvokeDrawer(context, selfInvokeMessage.message, presentationEntityFrom.left + presentationEntityFrom.width / 2, this.lastMessageTop + this.messageSpace)
                .draw();
        this.lastMessageTop += this.messageSpace;
    };


    this.printGrid = function() {
        var gridDrawer = new GridDrawer(context);
        gridDrawer.draw();
    };

    this.checkEntity = function(xMousePos, yMousePos) {
        for (var itemThis in this.presentationEntities) {
            var presentationEntity = presentationEntities[itemThis];
            if (presentationEntity.left < xMousePos
                    && presentationEntity.left + presentationEntity.width > xMousePos) return true;
        }
        return true;
    }

}

function hasThisItem(presentationEntities, entity) {
    for (var itemThis in presentationEntities) {
        if (presentationEntities[itemThis].name == entity) return true;
    }
    return false;
}

function getPresentationEntityByName(presentationEntities, entity) {
    for (var itemThis in presentationEntities) {
        if (presentationEntities[itemThis].name == entity) return presentationEntities[itemThis];
    }
    return null;
}