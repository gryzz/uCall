/**
 * @class uCall.controllers.ChannelEventController
 * @extends Ext.util.Observable
 *
 * Stomp connector adapter.
 */

Ext.define('uCall.controllers.ChannelEventController', {
	requires: ['uCall.constants.ChannelEvent'],
	extend: 'Ext.util.Observable',
	
	config: {
		onConnect: Ext.emptyFn,
		onMessage: Ext.emptyFn,
		onDisconnect: Ext.emptyFn
	},
	
	constructor: function(config) {
		// Parent
		this.callParent(arguments);
		// Merge configs
		Ext.applyIf(this.config, config);
		Ext.applyIf(this, this.config);
		// Register events
		this.addEvents(
			uCall.constants.ChannelEvent.CONNECTED,
		    uCall.constants.ChannelEvent.MESSAGE,
		    uCall.constants.ChannelEvent.DISCONNECTED
		);
		// Add listeners
		this.on(uCall.constants.ChannelEvent.CONNECTED, this.onConnect, this);
		this.on(uCall.constants.ChannelEvent.MESSAGE, this.onMessage, this);
	    this.on(uCall.constants.ChannelEvent.DISCONNECTED, this.onDisconnect, this);
	},
});
