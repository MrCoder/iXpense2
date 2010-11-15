function getMessages(scriptContent) {
    var sentences = scriptContent.split("\n");
    var syncMessageArray = new Array();
    var i = 0;
    for (var sentence in sentences) {
        var messageFromSentence = getMessageFromSentence(sentences[sentence]);
        if (messageFromSentence != null)
            syncMessageArray[i++] = messageFromSentence;
    }

    return syncMessageArray;
}

function getMessageFromSentence(sentence) {
    if (sentence.trim() == "") return null;

    sentence = sentence.split(" ").join("");
    /((\w+):)*((\w+)=)*((\w+)\.)*(\w+)/.test(sentence);

    var entityFrom = RegExp.$2
    var returnResult = RegExp.$4
    var entityTo = RegExp.$6
    var message = RegExp.$7

    if(entityFrom == "") entityFrom = "client";
    if(entityTo == "") entityTo = entityFrom;

    var text = "";
    if (returnResult != "")
        text = "[" + returnResult + "]" + message;
    else
        text = message;
    return new SyncMessage(entityFrom, entityTo, text);
}