function getSyncMessages(scriptContent) {
    var sentences = scriptContent.split("\n");
    var syncMessageArray = new Array();
    var i = 0;
    for (var sentence in sentences) {   
        syncMessageArray[i++] = getMessageFromSentence(sentences[sentence]);
    }

    return syncMessageArray;
}

function getMessageFromSentence(sentence) {
    var syncMessage = new Object();
    var twoEntities = sentence.split(":")[0];
    var message = sentence.split(":")[1];
    var entitiesArray = twoEntities.split("->");
    syncMessage.from = entitiesArray[0];
    syncMessage.to = entitiesArray[1];
    syncMessage.message = message;
    return syncMessage;
}