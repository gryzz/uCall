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
	    	    that = this;
	            UserInfo.getUserInfo(message.c, message.e, function(value) {
		            if (value.success) {
					    that.fireEvent(uCall.constants.MessageEvent.SHOW, message.i, 'User ' + value.user + ' is waiting ... <br> Notes: ' + value.title);
					} else {
					    that.fireEvent(uCall.constants.MessageEvent.SHOW, message.i, value.msg);
					}

		        });
                break;
            case this.mappedEvents.EVENT_HANGUP_CLEANUP:
                console.log('hidding ...');
                this.fireEvent(uCall.constants.MessageEvent.HIDE, message.i);
                break;
            case this.mappedEvents.EVENT_LINK:
                this.fireEvent(uCall.constants.MessageEvent.HIDE, message.i);

                if (this.onEventLinkCallback) {
                    this.onEventLinkCallback(message);
                }
                break;
            case this.mappedEvents.EVENT_QUEUE_MEMBER_ADDED:
                this.fireEvent(uCall.constants.MessageEvent.STATUS_ONLINE);
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
        this.on(uCall.constants.MessageEvent.STATUS_ONLINE, this.onStatusOnline, this);
    }
});
