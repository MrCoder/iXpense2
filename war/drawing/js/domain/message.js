function SyncMessage(from, to, text) {
    this.from = from;
    this.to = to;
    this.message = text;
    this.print = function(sequencePrinter) {
        if (from == to)
            sequencePrinter.printInternalInvokeMessage(this);
        else
            sequencePrinter.printMessage(this);
    }
}