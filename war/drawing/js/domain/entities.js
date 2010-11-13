function getEntities(scriptContent) {
    var sentences = scriptContent.split("\n");
    var entitiesArray = new Array();
    var i = 0;
    for(var sentence in sentences){
        var tempEntitiesArray = getEntitiesFromSentence(sentences[sentence]);
        for(entity in tempEntitiesArray){
            var tempEntity = tempEntitiesArray[entity];
            if(!hasThisItemDO(entitiesArray, tempEntity))
            {
                entitiesArray[i++] = tempEntity;
            }
        }
    }
    return entitiesArray;
}

function getEntitiesFromSentence(sentence){
    var twoEntities = sentence.split(":")[0];
    var entitiesArray = twoEntities.split("->");
    return entitiesArray;
}

function hasThisItemDO(array, itemThat){
    for(var itemThis in array){
        if (array[itemThis] == itemThat) return true;
    }
    return false;
}