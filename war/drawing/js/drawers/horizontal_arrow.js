function HorizontalArrowDrawer(context){
    this.drawRightArrow = function(left, top, length) {
        new ArrowIconRightDrawer(context).draw(left + length, top);
    };

    this.drawLeftArrow = function(left, top, length) {
        new ArrowIconLeftDrawer(context).draw(left+length, top);
    };

    this.draw = function(left, top, length){
        // draw the line: ----
        new HorizontalLineDrawer(context).draw(left, top, length);
        // draw the arrow icon
        if(length > 0) {
            this.drawRightArrow(left+5, top, length-10);
        } else {
            this.drawLeftArrow(left-5, top, length+10);
        }
    }
}