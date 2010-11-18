function PresentationEntity(name, left, width) {
    this.name = name;
    this.left = left;
    this.width = width;
    this.selected = false;
}

PresentationEntity.prototype.textInfo = function() {
    return this.name + ":" + "[x:" + this.left + "]" + "[w:" + this.width + "]";
};


function PresentationEntities() {
    this.count = 0;
    this.selectedPresentationEntity = null;
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