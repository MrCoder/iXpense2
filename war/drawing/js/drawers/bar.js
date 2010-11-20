function BarDrawer() {
    this.draw = function(context, left, top, height) {
        context.strokeStyle = "blue";
        var barWidth = 10;
        context.strokeRect(left - barWidth/2, top, barWidth, height);


        context.fillStyle = "green";
        context.fillRect(left - barWidth/2, top, barWidth, height);
        context.fillStyle = null;

    }
}