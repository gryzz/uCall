/**
 * @class uCall.data.stomp.StompClientAdapterFactory
 *
 * Stomp connector adapter factory.
 */

Ext.define('uCall.data.stomp.StompClientAdapterFactory', {
	requires: ['uCall.data.stomp.StompWebsocketClientAdapter'],
	
	config: {
		defaultAdapter: 'uCall.data.stomp.StompWebsocketClientAdapter'
	},
	
	adapterInstance: null,

	constructor: function(config) {
		Ext.applyIf(this, this.config);
		Ext.applyIf(this, config);
		this.adapterInstance = Ext.create(this.defaultAdapter, this.config); 
	}
});