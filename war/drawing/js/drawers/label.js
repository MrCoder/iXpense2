function LabelDrawer(context){
    this.draw = function(message, left, length, top){
         var maxWidth = 1000;
        var textMetrics = context.measureText(message);
        context.font = "italic 12px Helvetica";
        context.fillStyle="black";
        var newLeft = left + length / 2 - textMetrics.width / 2;
        context.fillText(message, newLeft, top - 3, 300);
    }
}