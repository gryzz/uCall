/**
 * @class uCall.data.StompWebsocketClientAdapter
 * @extends uCall.data.StompClientAdapter
 *
 * Stomp websocket connector adapter.
 */

Ext.define('uCall.data.StompWebsocketClientAdapter', {
	requires: [
		'uCall.data.StompClientAdapter',
		'jmesnil.StompWebsocket'
	],
	extend: 'uCall.data.StompClientAdapter',
	
	constructor: function() {
		Ext.applyIf(this, this.config);
		
		this.client = new Stomp.client(this.url);
	},
	
	onConnectionSuccess: function() {
		console.log("TODO: uCall.data.StompWebsocketClientAdapter.onConnectionSuccess: implement")
		
		this.performSubscribe();
	},
	onConnectionError: function() {
		console.log("TODO: uCall.data.StompWebsocketClientAdapter.onConnectionError: implement")
	},
	onDataReceived: function() {
		console.log("TODO: uCall.data.StompWebsocketClientAdapter.onDataReceived: implement")
	},
	onDataSent: function() {
		console.log("TODO: uCall.data.StompWebsocketClientAdapter.onDataSent: implement")
	},
	onDisconnect: function() {
		console.log("TODO: uCall.data.StompWebsocketClientAdapter.onDisconnect: implement")
	},
	onSubscribe: function() {
		console.log("TODO: uCall.data.StompWebsocketClientAdapter.onSubscribe: implement")
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
