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
    this.defaultBarHeight = 20;

    function createCanvas(canvasId) {

        var canvasEle = $('<canvas/>', {id:canvasId, class:'canvas'});

        container.append(canvasEle);
        canvasEle[0].width = canvasEle[0].clientWidth;
        canvasEle[0].height = canvasEle[0].clientHeight;

        return canvasEle[0];
    }

    this.addEntity = function(entityName) {


        var canvasId = 'entity_canvas_' + entityName;
        var context = createCanvas(canvasId).getContext('2d');
        var newLeft = 0;
        newLeft = this.rightBound + this.entitySpace;
        var entityWidth = this.lifeLineDrawer.draw(context, entityName, newLeft, this.lifeLenght, false);
        this.rightBound = newLeft + entityWidth;
        var entity = new Object();
        entity.name = entityName;
        entity.left = newLeft;
        entity.width = entityWidth;
        this.entities.push(entity);
    };

    this.getEntity = function(entityName) {
        for each(var entity in this.entities) {
            if (entity.name == entityName) return entity;
        }
    };

    this.addMessage = function(message) {
        var entityFrom = this.getEntity(message.from);
        var entityTo = this.getEntity(message.to);
        var messageCanvasId = 'message_canvas_' + this.messages.length;
        var messageContext = createCanvas(messageCanvasId).getContext('2d');

        var start = entityFrom.left + entityFrom.width / 2;
        var end = entityTo.left + entityTo.width / 2;
        var length = end - start;
        this.lastMessageTop = this.lastMessageTop + this.messageSpace;
        this.messageDrawer.draw(messageContext, message.message, start, this.lastMessageTop, length);

        var barId = this.bars.length;
        var barCanvasId = 'bar_canvas_' + barId;
        var barContext = createCanvas(barCanvasId).getContext('2d');
        this.barDrawer.draw(barContext, start, this.lastMessageTop - this.defaultBarHeight / 3, this.defaultBarHeight);
        var richBar = new Object();
        richBar.id = barId;
        richBar.entityName = message.from;
        richBar.context = barContext;
        richBar.left = start;
        richBar.height = this.defaultBarHeight;
        richBar.top = this.lastMessageTop - this.defaultBarHeight / 3;
        richBar.drawer = this.barDrawer;
        this.bars.push(richBar);

        var barId2 = this.bars.length;
        var barCanvasId2 = 'bar_canvas_' + barId2;
        var barContext2 = createCanvas(barCanvasId2).getContext('2d');

        this.barDrawer.draw(barContext2, end, this.lastMessageTop, this.defaultBarHeight);
        var richBar2 = new Object();
        richBar2.id = barId2;
        richBar2.entityName = message.to;
        richBar2.context = barContext2;
        richBar2.left = end;
        richBar2.height = this.defaultBarHeight;
        richBar2.top = this.lastMessageTop;
        richBar2.drawer = this.barDrawer;
        this.bars.push(richBar2);

        var richMessage = new Object();
        richMessage.start = start;
        richMessage.end = end;
        this.messages.push(richMessage);
    };

    this.getBar = function(entityName) {
        for each(var bar in this.bars) {
            if (bar.entityName == entityName) return bar;
        }
    };

    this.addSubMessage = function(message) {
        var entityFrom = this.getEntity(message.from);
        var entityTo = this.getEntity(message.to);
        var messageCanvasId = 'message_canvas_' + this.messages.length;
        var messageContext = createCanvas(messageCanvasId).getContext('2d');

        var start = entityFrom.left + entityFrom.width / 2;
        var end = entityTo.left + entityTo.width / 2;
        var length = end - start;
        this.lastMessageTop = this.lastMessageTop + this.messageSpace;
        this.messageDrawer.draw(messageContext, message.message, start, this.lastMessageTop, length);

        var bar = this.getBar(message.from);
        bar.extend = function() {
            var canvas = $('#bar_canvas_' + bar.id)[0];
            canvas.width = canvas.width;
            var barContext = canvas.getContext('2d');
            bar.drawer.draw(barContext, bar.left, bar.top, bar.height + 20);

        };
        bar.extend();

        //        var barCanvasId = 'message_canvas_' + this.bars.length;
        //        var barContext = createCanvas(barCanvasId).getContext('2d');
        //        this.barDrawer.draw(barContext, start, this.lastMessageTop - this.defaultBarHeight / 3, this.defaultBarHeight);
        //        var richBar = new Object();
        //        richBar.entityName = message.from;
        //        this.bars.push(richBar);

        var barCanvasId2 = 'message_canvas_' + this.bars.length;
        var barContext2 = createCanvas(barCanvasId2).getContext('2d');

        this.barDrawer.draw(barContext2, end, this.lastMessageTop, this.defaultBarHeight);
        var richBar2 = new Object();
        richBar2.entityName = message.to;
        this.bars.push(richBar2);

        var richMessage = new Object();
        richMessage.start = start;
        richMessage.end = end;
        this.messages.push(richMessage);

    }
}

