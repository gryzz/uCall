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
//       alert(this.alignMessagesTo)
    },
    
    add: function(id, items) {
        var growlMessage = Ext.create('uCall.widgets.GrowlMessage', {html: 'asdf'});
        this.messages[id] = growlMessage;
        growlMessage.showAt([0,0]);
        growlMessage.showAt(growlMessage.el.getAlignToXY(this.alignMessagesTo, 'tl-bl', [0, 10]));
        var that = this;
        growlMessage.on("close", function(event){
                console.log(event);
                console.log(this);
                
                var id = that.messages.indexOf(this);
                delete that.messages[id];
                that.alignMessagesTo = that.topElement;
                
                for(i in that.messages) {
                    var p = that.messages[i];
                    p.showAt(p.el.getAlignToXY(that.alignMessagesTo, 'tl-bl', [0, 10]));
                    that.alignMessagesTo = p.el;
                }
            }, growlMessage);
            
        this.alignMessagesTo = growlMessage.el;
    },
    
    remove: function(id) {
        var messageBox = this.growlMessaging.getComponent('GrowlMessagingContainer').getComponent(this.generateId(id));
		this.growlMessaging.remove(messageBox, true);
    },
    
    generateId: function(str){
        return str ? 'growl_messaging_' + str : '';
    }
});