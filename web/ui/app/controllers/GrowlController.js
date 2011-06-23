Ext.define('uCall.controllers.GrowlController', {

    growlContainer: null,
    messages: {},
    alignMessagesTo: null,
    topElement: null,
    
    constructor: function() {
        var alignMessagesTo = Ext.getCmp('MainTopToolbar').el;
        this.alignMessagesTo = alignMessagesTo;
        this.topElement = alignMessagesTo;
        console.log(arguments);
    },
    
    add: function(id, items) {
        var growlMessage = Ext.create('uCall.widgets.GrowlMessage', {items: items});
        this.messages[id] = growlMessage;
        growlMessage.showAt([0,0]);
        growlMessage.showAt(growlMessage.el.getAlignToXY(this.alignMessagesTo, 'tl-bl', [ this.alignMessagesTo == this.topElement ? 5 : 0, 5]));
        var that = this;
        growlMessage.on('close', function(event){
                var id = Ext.Object.getKey(that.messages, this);
                if(id == -1)
                    return;
                delete that.messages[id];
                this.destroy();
                that.alignMessagesTo = that.topElement;
                console.log('closing ...');
                for(i in that.messages) {
                    var p = that.messages[i];
                    p.showAt(p.el.getAlignToXY(that.alignMessagesTo, 'tl-bl', [that.alignMessagesTo == that.topElement ? 5 : 0, 5]));
                    that.alignMessagesTo = p.el;
                }
            }, growlMessage);
            
        this.alignMessagesTo = growlMessage.el;
    },
    
    remove: function(id) {
        this.messages[id].fireEvent('close')
    },
    
    generateId: function(str){
        return str ? 'growl_messaging_' + str : '';
    }
});