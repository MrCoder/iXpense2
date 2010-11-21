function RichBar(id, entityName, left, top, height) {
    this.id = id;
    this.entityName = entityName;
    this.left = left;
    this.height = height;
    this.top = top;

    this.extend = function(bottom) {
        var canvas = $('#bar_canvas_' + this.id)[0];
        canvas.width = canvas.width;
        var barContext = canvas.getContext('2d');
        var newHeight = bottom - this.top;
        if (newHeight > this.height)
            this.height = newHeight;
        new BarDrawer().draw(barContext, this.left, this.top, this.height);
        if (this.parentBar) this.parentBar.extend(this.top + this.height);
    };

    this.clear = function() {
        var canvas = $('#bar_canvas_' + this.id)[0];
        canvas.width = canvas.width;
    };
}

function RichEntity(name, left, width) {
    this.name = name;
    this.left = left;
    this.width = width;

    this.clear = function() {
        var canvas = $('#entity_canvas_' + name)[0];
        canvas.width = canvas.width;
    };
}

function RichMessage(id, start, end) {
    this.id = id;
    this.start = start;
    this.end = end;

    this.clear = function() {
        var canvas = $('#message_canvas_' + this.id)[0];
        canvas.width = canvas.width;
    }
}


function CanvasManager(container) {
    this.lifeLineDrawer = new LifeLineDrawer();
    this.messageDrawer = new MessageDrawer();
    this.internlInvokeDrawer = new InternalInvokeDrawer();
    this.barDrawer = new BarDrawer();
    this.entitySpace = 60.1;
    this.lifeLenght = 700;
    this.rightBound = 0;
    this.messages = new Array();
    this.entities = new Array();
    this.bars = new Array();
    this.lastMessageTop = 60;
    this.messageSpace = 18;
    this.defaultBarHeight = 15;
    this.canvases = new Array();

    function createCanvas(canvasId, zIndex) {

        var canvas = $('#' + canvasId);
        if (canvas.length > 0) return canvas[0];

        var canvasEle = $('<canvas/>', {id:canvasId, class:'canvas'});

        container.append(canvasEle);
        canvasEle[0].width = canvasEle[0].clientWidth;
        canvasEle[0].height = canvasEle[0].clientHeight;
        canvasEle.zIndex(zIndex);

        return canvasEle[0];
    }

    this.addEntity = function(entityName) {
        var canvasId = 'entity_canvas_' + entityName;
        var context = createCanvas(canvasId, 1000).getContext('2d');
        var newLeft = 0;
        newLeft = this.rightBound + this.entitySpace;
        var entityWidth = this.lifeLineDrawer.draw(context, entityName, newLeft, this.lifeLenght, false);
        this.rightBound = newLeft + entityWidth;
        var entity = new RichEntity(entityName, newLeft, entityWidth);
        this.entities.push(entity);
    };

    this.removeEntity = function(entityName) {
        var entity = this.getEntity(entityName);
        entity.clear();
        this.entities = jQuery.grep(this.entities, function(value){
            return value.name != entityName;
        });

        this.rightBound = 0;
        for each (entity in this.entities){
            var right = entity.left + entity.width/2;
            if (right > this.rightBound) this.rightBound = right;
        }

    };

    this.getEntity = function(entityName) {
        for each(var entity in this.entities) {
            if (entity.name == entityName) return entity;
        }
    };

    this.createABar = function (start, barEntityName, top) {
        var barId = this.bars.length;
        var barCanvasId = 'bar_canvas_' + barId;
        var barContext = createCanvas(barCanvasId, 3000).getContext('2d');
        this.barDrawer.draw(barContext, start, top, this.defaultBarHeight);
        var richBar = new RichBar(barId, barEntityName, start, top, this.defaultBarHeight);
        this.bars.push(richBar);

        return richBar;
    };

    this.removeAllMessages = function() {
        for each (var message in this.messages) {
            message.clear();
        }

        for each (var bar in this.bars) {
            bar.clear();
        }
        this.messages.length = 0;
        this.bars.length = 0;
        this.lastMessageTop = 60;
    };

    this.addMessage = function(message) {
        var richMessage = this.drawMessage(message);

        if (message.from != message.to) {
            var top = this.lastMessageTop - this.defaultBarHeight / 3;
            var fromBar = this.createABar(richMessage.start, message.from, top);
        }

        var toBar = this.createABar(richMessage.end, message.to, this.lastMessageTop);
        if (fromBar != undefined){
            toBar.parentBar = fromBar;
            fromBar.extend(toBar.top + toBar.height);
        }
    };

    this.getBar = function(entityName) {
        var result;
        for each(var bar in this.bars) {
            if (bar.entityName == entityName) result = bar;
        }
        // return the last bar on this entity life line
        return result;
    };

    this.addSubMessage = function(message) {
        var richMessage = this.drawMessage(message);
        var end = richMessage.end;

        var fromBar = this.getBar(message.from);

        var toBar = this.createABar(end, message.to, this.lastMessageTop);
        toBar.parentBar = fromBar;
        fromBar.extend(toBar.top + toBar.height);
    };

    this.drawMessage = function (message) {
        var entityFrom = this.getEntity(message.from);
        var entityTo = this.getEntity(message.to);
        var messageCanvasId = 'message_canvas_' + this.messages.length;
        var messageContext = createCanvas(messageCanvasId, 2000).getContext('2d');

        if (message.from == message.to) {
            this.lastMessageTop = this.lastMessageTop + this.messageSpace;
            var left = entityFrom.left + entityFrom.width / 2;
            new InternalInvokeDrawer()
                    .draw(messageContext, message.message, left, this.lastMessageTop);
            this.lastMessageTop += this.messageSpace;
            var id = this.messages.length;
            var richMessage = new RichMessage(id, left, left);
            this.messages.push(richMessage);
            return richMessage;
        }

        var start = entityFrom.left + entityFrom.width / 2;
        var end = entityTo.left + entityTo.width / 2;
        var length = end - start;
        this.lastMessageTop = this.lastMessageTop + this.messageSpace;
        this.messageDrawer.draw(messageContext, message.message, start, this.lastMessageTop, length);

        var richMessage = new RichMessage(this.messages.length, start, end);
        this.messages.push(richMessage);
        return richMessage;
    };
}

