function PresentationEntity(name, left, width) {
    this.name = name;
    this.left = left;
    this.width = width;
    this.selected = false;
}

PresentationEntity.prototype.textInfo = function() {
    return this.name + ":" + "[x:" + this.left + "]" + "[w:" + this.width + "]";
};


function PresentationEntities(context) {
    this.context = context;
    this.count = 0;
    this.selectedPresentationEntity = null;
    this.leftOfMostRightEntity = 0;
    this.lastEntityWidth = 0;
    this.entitySpace = 150.3;
    this.lastMessageTop = 60;
    this.messageSpace = 18.1;


    this.printEntity = function(entityName, height){
        var existingPresentationEntity = this.getEntity(entityName);
    if (existingPresentationEntity != null) {

        var lifeLineDrawer = new LifeLineDrawer();
        return lifeLineDrawer.draw(this.context, existingPresentationEntity.name, existingPresentationEntity.left, height, existingPresentationEntity.selected);
    } else {
        var newLeft = 0;

        if (this.leftOfMostRightEntity == 0) {
            newLeft = this.entitySpace / 2;
        } else {
            newLeft = this.leftOfMostRightEntity + this.lastEntityWidth + this.entitySpace;
        }
        var lifeLineDrawer = new LifeLineDrawer();
        this.lastEntityWidth = lifeLineDrawer.draw(this.context, entityName, newLeft, height);

        this.leftOfMostRightEntity = newLeft;

        this.addEntity(entityName, newLeft, this.lastEntityWidth);
    }
    }


}
PresentationEntities.prototype.presentationEntities = new Array();


PresentationEntities.prototype.addEntity = function(entityName, left, width) {
    var presentationEntity = new PresentationEntity(entityName, left, width);
    if (this.contains(presentationEntity)) return;
    this.presentationEntities[this.count++] = presentationEntity;
};

PresentationEntities.prototype.contains = function(presentationEntity) {
    for each (var i in this.presentationEntities) {
        if (i.name == presentationEntity.name) return true;
        //        if (this.presentationEntities[i].name == presentationEntity.name) return true;
    }
    return false;
};

PresentationEntities.prototype.getEntity = function(name) {
    for each (var presentationEntity in this.presentationEntities) {
        if (presentationEntity.name == name)
            return presentationEntity;
    }
    return null;
};

PresentationEntities.prototype.checkEntity = function(xMousePos, yMousePos) {
    for each (var presentationEntity in this.presentationEntities) {
        if (presentationEntity.left < xMousePos
                && presentationEntity.left + presentationEntity.width > xMousePos)
            return presentationEntity.name;
    }
    return "";
};

PresentationEntities.prototype.textInfo = function() {
    var text = "";
    for each (var presentationEntity in this.presentationEntities) {
        text = text + presentationEntity.textInfo() + "\n";
    }
    return text;
};

PresentationEntities.prototype.selectEntity = function(entityName) {
    var presentationEntity = this.getEntity(entityName);

    if (presentationEntity != null) {
        if (this.selectedPresentationEntity != null) {
            this.selectedPresentationEntity.selected = false;
        }
        presentationEntity.selected = true;
        this.selectedPresentationEntity = presentationEntity;
    }
};

PresentationEntities.prototype.moveSelectedLeft = function() {
    if (this.selectedPresentationEntity != null) {
        this.selectedPresentationEntity.left -= 9.1;
    }
};

PresentationEntities.prototype.moveSelectedRight = function() {
    if (this.selectedPresentationEntity != null) {
        this.selectedPresentationEntity.left += 9.1;
    }
}