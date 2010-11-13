function LabelDrawer(ctx){
    this.draw = function(){
        try {
            ctx.font = "bold 12px sans-serif";
            ctx.fillText("x", 248, 43);
            ctx.fillText("y", 58, 165);
        } catch(err) {
        }
        try {
            ctx.textBaseline = "top";
            ctx.fillText("( 0 , 0 )", 8, 5);
        } catch(err) {
        }
        try {
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.fillText("( 500 , 375 )", 492, 370);
        } catch(err) {
        }
        
    }
}