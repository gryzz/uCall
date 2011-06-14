/**
 * @class uCall.data.StompClientAdapter
 * @extends Ext.util.Observable
 *
 * Stomp connector adapter.
 */

Ext.define('uCall.data.StompClientAdapter', {
	requires: ['uCall.data.StompWebsocketClientAdapter'],
	extend: 'Ext.util.Observable',
	
	config: {
		url: null,
		login: null,
		password: null,
		destination: null,
		client: null,
		adapter: 'uCall.data.StompWebsocketClientAdapter',

		listeners: {
			connectionSuccess: this.onConnectionSuccess,
			connectionError: this.onConnectionError,
			subscribe: this.onSubscribe,
			dataReceived: this.onDataReceived,
			dataSent: this.onDataSent,
			disconnect: this.onDisconnect
		},
		
		events: {
			connectionSuccess: true,
			connectionError: true,
			subscribe: true,
            dataReceived: true,
            dataSent: true,
            disconnect: true
        }
	},
	
	constructor: function() {
		Ext.applyIf(this, this.config);
		this.addEvents(this.events);
		
		return Ext.create(this.adapter, this.config);
	},
	
	onConnectionSuccess: Ext.emptyFn,
	onConnectionError: Ext.emptyFn,
	onDataReceived: Ext.emptyFn,
	onDataSent: Ext.emptyFn,
	onDisconnect: Ext.emptyFn,
	onSubscribe: Ext.emptyFn,
	
	performConnect: Ext.emptyFn,
	performSubscribe: Ext.emptyFn,
	performDataSend: Ext.emptyFn,
	performDisconnect: Ext.emptyFn
});
