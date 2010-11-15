function SyncMessage(from, to, text){
    this.from = from;
    this.to = to;
    this.message = text;
    this.print = function(sequenctPrinter){
        sequenctPrinter.printMessage(this);
    }
}