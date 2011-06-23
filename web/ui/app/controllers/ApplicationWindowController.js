/**
 * @class uCall.controllers.MessageController
 * @extends Ext.util.Observable
 *
 * Message controller.
 */

Ext.define('uCall.controllers.ApplicationWindowController', {
    requires: ['uCall.constants.MessageEvent'],
    extend: 'Ext.util.Observable',
    
    mappedEvents: channelEventSchema,
    
    handle: function(m) {
        var message = Ext.JSON.decode(m.message.data.body);

        switch(message.t){
            case this.mappedEvents.EVENT_RINGING:
                this.fireEvent(uCall.constants.MessageEvent.SHOW, message.u, 'User ' + message.u + ' is waiting ...');
            break;
            case this.mappedEvents.EVENT_HANGUP_CLEANUP:
                this.fireEvent(uCall.constants.MessageEvent.HIDE, message.u);
            break;
            case this.mappedEvents.EVENT_LINK:
                this.fireEvent(uCall.constants.MessageEvent.WINDOW, message.u);
            break;
        }
    },
    
    onShow: function(m){
	alert('!!!!');
    }
    
    config: {
        onShow: Ext.emptyFn,
        onHide: Ext.emptyFn
    },
    
    constructor: function(config) {
        // Parent
        this.callParent(arguments);
        // Merge configs
        Ext.apply(this.config, config);
        Ext.applyIf(this, this.config);

        this.on(uCall.constants.MessageEvent.WINDOW, this.onShow, this);
    }
});