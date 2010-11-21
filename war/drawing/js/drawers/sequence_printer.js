function PresentationEntity() {
    this.selected = false;
}


SequencePrinter.prototype.printEntity = function(entityName, height) {
    this.presentationEntities.printEntity(entityName, height);

};

function SequencePrinter(context, context2, width, height) {
    this.lastMessageTop = 60;
    this.messageSpace = 18.1;
    this.context = context;
    this.presentationEntities = new PresentationEntities(context);


    this.printMessage = function (syncMessage) {
        this.printEntity(syncMessage.from, height);
        this.printEntity(syncMessage.to, height);
        var left = 0;
        var length = 0;
        var presentationEntityFrom = this.presentationEntities.getEntity(syncMessage.from);
        left = presentationEntityFrom.left + presentationEntityFrom.width / 2;
        var presentationEntityTo = this.presentationEntities.getEntity(syncMessage.to);
        var left2 = presentationEntityTo.left + presentationEntityTo.width / 2;
        length = left2 - left;

        var messageDrawer = new MessageDrawer();
        messageDrawer.draw(context, syncMessage.message, left, this.lastMessageTop + this.messageSpace, length);
        this.lastMessageTop += this.messageSpace;

        var barDrawer = new BarDrawer();
        barDrawer.draw(context2, left - 5, this.lastMessageTop - 5, 15);
        var barDrawer = new BarDrawer(context2);
        barDrawer.draw(context2, left2 - 5, this.lastMessageTop, 15);

    };

    this.printInternalInvokeMessage = function(selfInvokeMessage) {
        this.printEntity(selfInvokeMessage.from, height);
        var presentationEntityFrom = this.presentationEntities.getEntity(selfInvokeMessage.from);

        new InternalInvokeDrawer()
                .draw(context, selfInvokeMessage.message, presentationEntityFrom.left + presentationEntityFrom.width / 2, this.lastMessageTop + this.messageSpace);
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



