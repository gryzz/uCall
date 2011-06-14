/**
 * @class uCall.data.stomp.StompWebsocketClientAdapter
 * @extends uCall.data.StompClientAdapter
 *
 * Stomp websocket connector adapter.
 */

Ext.define('uCall.data.stomp.StompWebsocketClientAdapter', {
	requires: [
		'uCall.data.stomp.StompClientAdapter',
		'jmesnil.StompWebsocket'
	],
	extend: 'uCall.data.StompClientAdapter',
	
	constructor: function() {
		Ext.applyIf(this, this.config);
		
		this.client = new Stomp.client(this.url);
	},
	
	onConnectionSuccess: function() {
		console.log("TODO: uCall.data.stomp.StompWebsocketClientAdapter.onConnectionSuccess: implement")
		
		this.performSubscribe();
	},
	onConnectionError: function() {
		console.log("TODO: uCall.data.stomp.StompWebsocketClientAdapter.onConnectionError: implement")
	},
	onDataReceived: function() {
		console.log("TODO: uCall.data.stomp.StompWebsocketClientAdapter.onDataReceived: implement")
	},
	onDataSent: function() {
		console.log("TODO: uCall.data.stomp.StompWebsocketClientAdapter.onDataSent: implement")
	},
	onDisconnect: function() {
		console.log("TODO: uCall.data.stomp.StompWebsocketClientAdapter.onDisconnect: implement")
	},
	onSubscribe: function() {
		console.log("TODO: uCall.data.stomp.StompWebsocketClientAdapter.onSubscribe: implement")
	},
	
	performConnect: function() {
		this.client.connect(this.login, this.passcode, this.onConnectionSuccess, this.onConnectionError);
	},
	performSubscribe: function() {
		this.client.subscribe(this.destination, this.onSubscribe, headers = []);
	},
	performDataSend: function(messageBody) {
		this.client.send(this.destination, headers = [], messageBody);
	},
	performDisconnect: function() {
		this.client.disconnect(this.onDisconnect);
	}
});
