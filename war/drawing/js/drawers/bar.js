function BarDrawer(context) {
    this.draw = function(left, top, height) {
        context.strokeStyle = "blue";
        context.strokeRect(left, top, 10, height);


        context.fillStyle = "red";
        context.fillRect(left, top, 10, height);
        context.fillStyle = null;

    }
}