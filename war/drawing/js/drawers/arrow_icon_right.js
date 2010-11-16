function ArrowIconRightDrawer(context){
    const arrowImageHeight = 18;
    
    this.draw = function(left, top){
        context.drawImage(get_arrow_right(), left + length - 12, top - arrowImageHeight/2);
    }
}