function RectangleDrawer(context) {
    this.draw = function(left, top, width) {
        var entityHeight = 30;

        context.drawImage($('#entity_in')[0], left, top, width, entityHeight);
        context.drawImage($('#entity_tl')[0], left, top, 5, 5);
        context.drawImage($('#entity_tr')[0], left+width-5, top, 5, 5);
        context.drawImage($('#entity_bl')[0], left, top+entityHeight - 5, 5, 5);
        context.drawImage($('#entity_br')[0], left+width-5, top+entityHeight-5, 5, 5);

    }
}