Ext.define('uCall.controllers.GrowlController', {

    growlContainer: null,
    messages: {},
    alignMessagesTo: null,
    topElement: null,
    taskManager: null,
    
    constructor: function() {
        var alignMessagesTo = Ext.getCmp('MainTopToolbar').el;
        this.alignMessagesTo = alignMessagesTo;
        this.topElement = alignMessagesTo;
        this.taskManager = new Ext.util.TaskRunner(180000);
        
        uCall.controllers.MessageController.on(
            uCall.constants.MessageEvent.INCOMING_CALL_RINGING,
            function(id, message) {
                this.add(id, [ {
                    xtype: 'component',
                    html: message
                }]);
            },
            this
        );
        uCall.controllers.MessageController.on(
            uCall.constants.MessageEvent.INCOMING_CALL_HANGUP,
            function(id) {
                this.remove(id);
            },
            this
        );
    },
    
    add: function(id, items) {
        var growlMessage = Ext.create('uCall.widgets.GrowlMessage', {
            items: items
//            headerPosition: 'right',
//            tools: [{
//                type: 'close',
//                cls: 'ucall-growl-clsbtn-fix',
//                id: id+'-close-btn',
//                handler: function(){
//                    this.up().up().close()
//                },
//                hidden: true
//            }]
        });
        
//        growlMessage.on({
//            mouseover: {fn: function(){
//                    this.getCmp(id+'-close-btn').show();                
//                }, 
//                scope: growlMessage
//            },
//            mouseout: {fn: function(){
//                    this.getCmp(id+'-close-btn').hide();                
//                }, 
//                scope: growlMessage
//            }
//        });
        this.messages[id] = growlMessage;
        growlMessage.showAt([0,0]);
        growlMessage.showAt(growlMessage.el.getAlignToXY(this.alignMessagesTo, 'tl-bl', [ this.alignMessagesTo == this.topElement ? 5 : 0, 5]));
        var that = this;
        growlMessage.on('close', function(event){
                var id = Ext.Object.getKey(that.messages, this);
                if (id == -1)
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
        
        // auto-closing growl message
        this.taskManager.start({
            run: function(){
                this.remove(id);
                return false;
            },
            interval: 180000,
            scope: this
        });

    },
    
    remove: function(id) {
        if (this.messages[id]) {
            this.messages[id].fireEvent('close')
        }
    },
    
    generateId: function(str){
        return str ? 'growl_messaging_' + str : '';
    }
});