/**
 * @class uCall.data.stomp.StompWebsocketClientAdapter
 * @extends uCall.data.StompClientAdapter
 *
 * Stomp websocket connector adapter.
 */
Ext.Loader.setPath('Stomp.client', '/ui/vendors/jmesnil/stomp-websocket/src/stomp.js');

Ext.define('uCall.data.stomp.StompWebsocketClientAdapter', {
	requires: [
		'uCall.data.stomp.StompClientAdapter',
		'uCall.constants.ChannelEvent',
		'Stomp.client'
	],
	extend: 'uCall.data.stomp.StompClientAdapter',
	
	constructor: function(config) {
		// Parent
		this.callParent(arguments);
		// Merge configs
		Ext.applyIf(this.config, config);
		Ext.applyIf(this, this.config);
		// Create stomp client		
		this.client = new Stomp.client(this.url);
		
		if (this.debug) {
			// Debug client
			this.client.debug = function(str) {                                                                                                                                                              
				console.log(str);                                                                                                                                                                           
		    };
		}
	},
	
	onConnectionSuccess: function(event) {
		// Set connection status flag
		this.isConnected = true;
		// Subscribe to messages
		this.performSubscribe();
		// Schedule keep alive
		this.keepAlive();
		// Propagate message channel event
		this.fireEvent(uCall.constants.ChannelEvent.CONNECTED);
	},
	
	onConnectionError: function(event) {
		// Set connection status flag
		this.isConnected = false;
		// Propagate message channel event
		this.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);

		console.log("onConnectionError");
		console.log(event);
	},
	
	onDataReceived: function(data) {
		// Propagate message channel event
		this.fireEvent(uCall.constants.ChannelEvent.MESSAGE, {message: data});
		
		console.log("onDataReceived");
	},
	
	onDataSent: function(event) {
		console.log("TODO: onDataSent: implement");
		console.log(event);
	},
	
	onDisconnect: function(event) {
		// Set connection status flag
		this.isConnected = false;
		// Propagate message channel event
		this.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);
		
		console.log("onDisconnect");
		console.log(event);
	},
	
	performConnect: function() {
		var that = this;
		this.client.connect(this.login, this.passcode, 
			function(){that.fireEvent(uCall.constants.StompClientEvent.CONNECTION_SUCCESS)}, 
			function(){that.fireEvent(uCall.constants.StompClientEvent.CONNECTION_ERROR)} 
		);
	},
	
	performSubscribe: function() {
		var that = this;
		this.client.subscribe(this.destination, 
			function(event){that.fireEvent(uCall.constants.StompClientEvent.DATA_RECEIVED, {data: event})}, 
			headers = []
		);
	},
	
	performDataSend: function(messageBody) {
		this.client.send(this.destination, headers = [], messageBody);
		
		console.log("performDataSend");
	},
	
	performDisconnect: function() {
		var that = this;
		this.client.disconnect(
			function(){that.fireEvent(uCall.constants.StompClientEvent.DISCONNECTED)}
		);
		
		console.log("performDisconnect");
	},
	
	keepAlive: function() {
		// Don't repeat for dead connection
		if (!this.isConnected) {
			return;
		}
		
		// Send ping to queue
		this.client.send(this.pingDestination, this.pingOptions, this.pingMessage);
		
		// Schedule next iteration
		Ext.defer(this.keepAlive, this.keepAliveInterval, this);
	}
});
