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
		'Stomp.client'
	],
	extend: 'uCall.data.stomp.StompClientAdapter',
	
	constructor: function(config) {
		// Parent
		this.callParent(arguments);
		// Merge configs
		Ext.apply(this.config, config);
		Ext.applyIf(this, this.config);
		// Create stomp client		
		this.client = new Stomp.client(this.url);
		
		if (this.debug) {
			// Debug client
			this.client.debug = function(str) {
				console.log(srt);
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
		// Application connect callback
		if (this.onConnectCallback) {
			this.onConnectCallback();
		}
	},
	
	onConnectionError: function(event) {
		// Set connection status flag
		this.isConnected = false;
		// Application disconnect callback
		if (this.onDisconnectCallback) {
			this.onDisconnectCallback();
		}
	},
	
	onDataReceived: function(data) {
		// Application disconnect callback
		if (this.onMessageCallback) {
			this.onMessageCallback(data);
		}
	},
	
	onDisconnect: function(event) {
		// Set connection status flag
		this.isConnected = false;
		// Application disconnect callback
		if (this.onDisconnectCallback) {
			this.onDisconnectCallback();
		}
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
			headers = {}
		);
	},
	
	performDataSend: function(messageBody, ttl) {
		var headers = {};
		
		if (!isNaN(ttl)) {
			var now = new Date().getTime();
			headers.expires = now + ttl * 1000;	
		}
		
		this.client.send(this.sendDestination, headers, messageBody);
	},
	
	performDisconnect: function() {
		var that = this;
		this.client.disconnect(
			function(){that.fireEvent(uCall.constants.StompClientEvent.DISCONNECTED)}
		);
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
