function getEntities() {
    return ['Domain', 'Service', 'Controller', 'View']
}

function getEntities(scriptContent) {
    var sentences = scriptContent.split("\n");
    return sentences;
}