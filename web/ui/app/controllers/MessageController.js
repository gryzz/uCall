/**
 * @class uCall.controllers.MessageController
 * @extends Ext.util.Observable
 *
 * Message controller.
 */

Ext.define('uCall.controllers.MessageController', {
    requires: ['uCall.constants.MessageEvent'],
    extend: 'Ext.util.Observable',
    
    mappedEvents: channelEventSchema,
    
    config: {
        onEventLinkCallback: Ext.emptyFn,
        
        onShow: Ext.emptyFn,
        onHide: Ext.emptyFn
    },
    
    handleMessage: function(eventData) {
        var message = Ext.JSON.decode(eventData.message.data.body);
        
        switch(message.t){
            case this.mappedEvents.EVENT_RINGING:
                this.fireEvent(uCall.constants.MessageEvent.SHOW, message.u, 'User ' + message.u + ' is waiting ...');
                break;
            case this.mappedEvents.EVENT_HANGUP_CLEANUP:
            //     this.fireEvent(uCall.constants.MessageEvent.HIDE, message.u);
            //     break;
            // case this.mappedEvents.EVENT_LINK:
                // this.fireEvent(uCall.constants.MessageEvent.HIDE, message.u);
                
                if (this.onEventLinkCallback) {
                    this.onEventLinkCallback(message);
                }
                break;
        }
    },
    
    constructor: function(config) {
        // Merge configs
        Ext.apply(this.config, config);
        Ext.apply(this, this.config);
        
        // Parent
        this.callParent(arguments);
        
        // Register events
        this.addEvents(
            uCall.constants.MessageEvent.SHOW,
            uCall.constants.MessageEvent.HIDE
        );
        // Add listeners
        this.on(uCall.constants.MessageEvent.SHOW, this.onShow, this);
        this.on(uCall.constants.MessageEvent.HIDE, this.onHide, this);
    }
});