/**
 * Route incoming messages
 *
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
					    content = 'User ' + value.user + ' is waiting ... <br> Notes: ' + value.title;
					} else {
                        content = value.msg;
					}

                    that.fireEvent(
                       uCall.constants.MessageEvent.INCOMING_CALL_RINGING,
                       message.i,
                       content
                    );
		        });
                break;

            default:
                if (this.eventsMap[message.t]) {
                    this.fireEvent(this.eventsMap[message.t], message);
                }
        }
    },

    constructor: function(config) {
        // Merge configs
        Ext.apply(this.config, config);
        Ext.apply(this, this.config);

        // Parent
        this.callParent(arguments);

        this.eventsMap = {};

        this.eventsMap[this.mappedEvents.EVENT_HANGUP_CLEANUP] =
            uCall.constants.MessageEvent.INCOMING_CALL_HANGUP;

        this.eventsMap[this.mappedEvents.EVENT_LINK] =
            uCall.constants.MessageEvent.INCOMING_CALL_LINK;

        this.eventsMap[this.mappedEvents.EVENT_QUEUE_MEMBER_ADDED] =
            uCall.constants.MessageEvent.STATUS_ONLINE;

        this.eventsMap[this.mappedEvents.EVENT_QUEUE_MEMBER_REMOVED] =
            uCall.constants.MessageEvent.STATUS_OFFLINE;

        this.eventsMap[this.mappedEvents.EVENT_QUEUE_MEMBER_PAUSED] =
            uCall.constants.MessageEvent.STATUS_AWAY;

        // Register events
        this.addEvents(
            uCall.constants.MessageEvent.INCOMING_CALL_RINGING,
            uCall.constants.MessageEvent.INCOMING_CALL_HANGUP,
            uCall.constants.MessageEvent.INCOMING_CALL_LINK
        );
    }
});
