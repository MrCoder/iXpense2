function getEntities(scriptContent) {
    var sentences = scriptContent.split("\n");
    var entitiesArray = new Array();
    entitiesArray[0] = "CLIENT";
    var i = 1;
    for (var sentence in sentences) {
        var tempEntitiesArray = getEntitiesFromSentence(sentences[sentence]);
        if (tempEntitiesArray != null) {


            var tempEntityFrom = tempEntitiesArray[0];
            if (!hasThisItemDO(entitiesArray, tempEntityFrom)) {
                entitiesArray[i++] = tempEntityFrom;
            }
            var tempEntityTo = tempEntitiesArray[1];
            if (!hasThisItemDO(entitiesArray, tempEntityTo)) {
                entitiesArray[i++] = tempEntityTo;
            }
        }
    }
    return entitiesArray;
}

function getEntitiesFromSentence(sentence) {
    if (sentence.trim() == "") return null;

    sentence = sentence.split(" ").join("");
    /((\w+):)*((\w+)=)*((\w+)\.)*(\w+)/.test(sentence);

    //    alert(RegExp.$1 + "2-" + RegExp.$2+"-" + RegExp.$3 +"4-" + RegExp.$4 + "-" + RegExp.$5+"6-" + RegExp.$6 + "7-" + RegExp.$7);
    var entityFrom = RegExp.$2
    var returnResult = RegExp.$4
    var entityTo = RegExp.$6
    var message = RegExp.$7

    if (entityFrom == "") entityFrom = "CLIENT";
    if (entityTo == "") entityTo = entityFrom;

    return [entityFrom, entityTo];
}

function hasThisItemDO(array, itemThat) {
    for (var itemThis in array) {
        if (array[itemThis] == itemThat) return true;
    }
    return false;
}