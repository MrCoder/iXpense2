function PresentationEntity() {
    this.selected = false;
}

SequencePrinter.prototype.printEntity = function(entity, width, height) {
    var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, entity);
    if (presentationEntityFrom != null) {

        var lifeLineDrawer = new LifeLineDrawer(this.context);
        lifeLineDrawer.draw(entity, presentationEntityFrom.left, height, presentationEntityFrom.selected);
        return;
    } else {
        var newLeft = 0;

        if (this.leftOfMostRightEntity == 0) {
            newLeft = this.entitySpace / 2;
        } else {
            newLeft = this.leftOfMostRightEntity + this.lastEntityWidth + this.entitySpace;
        }
        var lifeLineDrawer = new LifeLineDrawer(this.context);
        this.lastEntityWidth = lifeLineDrawer.draw(entity, newLeft, height);

        this.leftOfMostRightEntity = newLeft;

        var presentationEntity = new PresentationEntity();
        presentationEntity.name = entity;
        presentationEntity.left = newLeft;
        presentationEntity.width = this.lastEntityWidth;
        if (!hasThisItem(this.presentationEntities, presentationEntity)) {
            this.presentationEntities[this.presentationEntitiesCount++] = presentationEntity;
        }
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

    this.resetAll = function() {
        this.leftOfMostRightEntity = 0;
        this.lastEntityWidth = 0;
        this.entitySpace = 150.3;
        this.lastMessageTop = 60;
        this.messageSpace = 15.1;
        this.presentationEntities = new Array();
        this.presentationEntitiesCount = 0;
        this.selectedPresentationEntity = null;
    };


    this.printMessage = function (syncMessage) {
        this.printEntity(syncMessage.from, width, height);
        this.printEntity(syncMessage.to, width, height);
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

        var messageDrawer = new MessageDrawer(context);
        messageDrawer.draw(syncMessage.message, left, this.lastMessageTop + this.messageSpace, length);
        this.lastMessageTop += this.messageSpace;
    };

    this.printInternalInvokeMessage = function(selfInvokeMessage) {
        var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, selfInvokeMessage.from);

        new InternalInvokeDrawer(context)
                .draw(selfInvokeMessage.message, presentationEntityFrom.left + presentationEntityFrom.width / 2, this.lastMessageTop + this.messageSpace);
        this.lastMessageTop += this.messageSpace * 2;
    };


    this.printGrid = function() {
        var gridDrawer = new GridDrawer(context);
        gridDrawer.draw(width, height);
    };

    this.checkEntity = function(xMousePos, yMousePos) {
        for (var itemThis in this.presentationEntities) {
            var presentationEntity = this.presentationEntities[itemThis];
            if (presentationEntity.left < xMousePos
                    && presentationEntity.left + presentationEntity.width > xMousePos)
                return presentationEntity.name;
        }
        return "";
    };

    this.select = function(entityName) {
        var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, entityName);
        if (presentationEntityFrom != null) {
            if (this.selectedPresentationEntity != null) {
                this.selectedPresentationEntity.selected = false;
            }
            presentationEntityFrom.selected = true;
            this.selectedPresentationEntity = presentationEntityFrom;
            this.onRefresh();
        }
    };

    this.moveLeft = function(entityName) {
        var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, entityName);
        if (presentationEntityFrom != null) {
            presentationEntityFrom.left -= 10.1;
            this.lastMessageTop = 60;
            //            this.adjustLeftOfMostRightEntity();
            this.onRefresh();
        }
    };

    this.moveRight = function(entityName) {
        var presentationEntityFrom = getPresentationEntityByName(this.presentationEntities, entityName);
        if (presentationEntityFrom != null) {
            presentationEntityFrom.left += 10.1;
            this.lastMessageTop = 60;
            //            this.adjustLeftOfMostRightEntity();
            this.onRefresh();
        }
    };

    this.adjustLeftOfMostRightEntity = function() {
        var left = 0;
        for (var itemThis in this.presentationEntities) {
            var presentationEntity = this.presentationEntities[itemThis];
            if (presentationEntity.left > left)
                left = presentationEntity.left;
        }
        this.leftOfMostRightEntity = left;
    };

    this.textInfo = function() {
        var text = "";
        for (var itemThis in this.presentationEntities) {
            var presentationEntity = this.presentationEntities[itemThis];
            text = text + presentationEntity.name + ":" + "[x:" + presentationEntity.left + "]\n";
        }
        return text;
    };

    this.resetMessageTop = function() {
        this.lastMessageTop = 60;
    };

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