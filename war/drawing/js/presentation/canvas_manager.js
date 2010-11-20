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
    }
}


function CanvasManager(container) {
    this.lifeLineDrawer = new LifeLineDrawer();
    this.messageDrawer = new MessageDrawer();
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
        var entity = new Object();

        entity.name = entityName;
        entity.left = newLeft;
        entity.width = entityWidth;
        entity.remove = function() {
            var canvas = $('#entity_canvas_' + entity.name)[0];
            canvas.width = canvas.width;
        };
        this.entities.push(entity);
    };

    this.removeEntity = function(entityName) {
        var canvas = $('#entity_canvas_' + entityName)[0];
        canvas.width = canvas.width;
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
            var canvas = $('#message_canvas_' + message.id)[0];
            canvas.width = canvas.width;
        }

        for each (var bar in this.bars) {
            var canvas = $('#bar_canvas_' + bar.id)[0];
            canvas.width = canvas.width;
        }
        this.messages.length = 0;
        this.bars.length = 0;
        this.lastMessageTop = 60;
    };

    this.addMessage = function(message) {
        var richMessage = this.drawMessage(message);

        var top = this.lastMessageTop - this.defaultBarHeight / 3;
        var fromBar = this.createABar(richMessage.start, message.from, top);


        var toBar = this.createABar(richMessage.end, message.to, this.lastMessageTop);
        toBar.parentBar = fromBar;
        fromBar.extend(toBar.top + toBar.height);
    };

    this.getBar = function(entityName) {
        for each(var bar in this.bars) {
            if (bar.entityName == entityName) return bar;
        }
    };

    this.drawMessage = function (message) {
        var entityFrom = this.getEntity(message.from);
        var entityTo = this.getEntity(message.to);
        var messageCanvasId = 'message_canvas_' + this.messages.length;
        var messageContext = createCanvas(messageCanvasId, 2000).getContext('2d');

        var start = entityFrom.left + entityFrom.width / 2;
        var end = entityTo.left + entityTo.width / 2;
        var length = end - start;
        this.lastMessageTop = this.lastMessageTop + this.messageSpace;
        this.messageDrawer.draw(messageContext, message.message, start, this.lastMessageTop, length);

        var richMessage = new Object();
        richMessage.id = this.messages.length;
        richMessage.start = start;
        richMessage.end = end;
        this.messages.push(richMessage);
        return richMessage;
    };

    this.addSubMessage = function(message) {
        var richMessage = this.drawMessage(message);
        var end = richMessage.end;

        var fromBar = this.getBar(message.from);

        var toBar = this.createABar(end, message.to, this.lastMessageTop);
        toBar.parentBar = fromBar;
        fromBar.extend(toBar.top + toBar.height);
    }
}

