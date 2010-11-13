//This is the root data model for the sequence diagram
function ActivitySequence(scriptContent) {
    this.entities = getEntities(scriptContent);
    this.messages = getMessages(scriptContent);

    this.print = function(sequencePrinter){
        for (var entity in this.entities) {
            sequencePrinter.printEntity(this.entities[entity]);
        }
        for (var message in this.messages){
            sequencePrinter.printMessage(this.messages[message]);
        }
    }
}