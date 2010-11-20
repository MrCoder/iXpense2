//This is the root data model for the sequence diagram
function ActivitySequence(scriptContent) {
    this.entities = new Array();
    this.messages = new Array();

    this.print = function(sequencePrinter) {
        this.entities = getEntities(scriptContent);
        this.messages = getMessages(scriptContent);
        for (var message in this.messages) {
            var theMessage = this.messages[message];
            theMessage.print(sequencePrinter);
        }
    };

    

    this.handleEntities = function(newList, oldList, canvasManager){
        for each (var entity in newList){
            if ($.inArray(entity, oldList) == -1){
                canvasManager.addEntity(entity);
            }
        }

        for each (var entity in oldList){
            if ($.inArray(entity, newList) == -1){
                canvasManager.removeEntity(entity);
            }
        }

    };

    this.draw = function(canvasManager, scriptContent){
        var newEntities = getEntities(scriptContent);

        this.handleEntities(newEntities, this.entities, canvasManager);
        this.entities = newEntities;

        canvasManager.removeAllMessages();

        this.messages = getMessages(scriptContent);

        
        var first = true;
        for each(var message in this.messages){
            if (first || message.from == "CLIENT"){
                canvasManager.addMessage(message);
                first = false;
            } else {
                canvasManager.addSubMessage(message);
            }
        }
        
    }
};
