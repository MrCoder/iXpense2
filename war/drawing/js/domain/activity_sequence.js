//This is the root data model for the sequence diagram
function ActivitySequence(scriptContent) {
    this.entities = getEntities(scriptContent);
    this.messages = getMessages(scriptContent);

    this.print = function(sequencePrinter) {
        for (var message in this.messages) {
            var theMessage = this.messages[message];
            theMessage.print(sequencePrinter);
        }
    }
}