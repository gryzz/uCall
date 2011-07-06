/**
 * @class uCall.controllers.MessageController
 * @extends Ext.util.Observable
 *
 * Message controller.
 */

Ext.define('uCall.controllers.MessageController', {
    requires: ['uCall.constants.MessageEvent'],
    extend: 'Ext.util.Observable',
    singleton: true,

    mappedEvents: channelEventSchema,

    config: {
        onEventLinkCallback: Ext.emptyFn
    },

    handleMessage: function(eventData) {
        var message = Ext.JSON.decode(eventData.message.data.body);

        switch(message.t){
            case this.mappedEvents.EVENT_RINGING:
	    	    that = this;
	            UserInfo.getUserInfo(message.c, message.e, function(value) {
		            if (value.success) {
					    that.fireEvent(
					       uCall.constants.MessageEvent.INCOMING_CALL_RINGING, 
					       message.i, 
					       'User ' + value.user + ' is waiting ... <br> Notes: ' + 
					       value.title
				       );
					} else {
					    that.fireEvent(
					       uCall.constants.MessageEvent.INCOMING_CALL_RINGING, 
					       message.i, 
					       value.msg
				       );
					}
		        });
                break;
            case this.mappedEvents.EVENT_HANGUP_CLEANUP:
                console.log('hidding ...');
                this.fireEvent(uCall.constants.MessageEvent.INCOMING_CALL_HANGUP, message.i);
                break;
            case this.mappedEvents.EVENT_LINK:
                this.fireEvent(uCall.constants.MessageEvent.INCOMING_CALL_HANGUP, message.i);

                if (this.onEventLinkCallback) {
                    this.onEventLinkCallback(message);
                }
                break;
            case this.mappedEvents.EVENT_QUEUE_MEMBER_ADDED:
                this.fireEvent(uCall.constants.MessageEvent.STATUS_ONLINE);
                break;

        }
    },
    
    sendMessage: function(data, reciever) {
    	if (typeof data != 'string') {
    		data = Ext.JSON.encode(data);
    	}
    	
    	// TODO: actual sending!!! (this -> channel controller -> stomp adapter -> activemq)
    },

    constructor: function(config) {
        // Merge configs
        Ext.apply(this.config, config);
        Ext.apply(this, this.config);

        // Parent
        this.callParent(arguments);

        // Register events
        this.addEvents(
            uCall.constants.MessageEvent.INCOMING_CALL_RINGING,
            uCall.constants.MessageEvent.INCOMING_CALL_HANGUP
        );
    }
});
