function ArrowIconLeftDrawer(context){
    const arrowImageHeight = 18;
    
    this.draw = function(left, top){
        context.drawImage(get_arrow_left(), left + length - 6, top - arrowImageHeight/2);
    }
}