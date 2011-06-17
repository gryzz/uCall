/**
 * @class uCall.data.stomp.StompClientAdapterFactory
 *
 * Stomp connector adapter factory.
 */

Ext.define('uCall.data.stomp.StompClientAdapterFactory', {
    requires: ['uCall.data.stomp.StompWebsocketClientAdapter'],

    config: {
        adapterClass: 'uCall.data.stomp.StompWebsocketClientAdapter'
    },

    adapterSingletonInstance: null,

    constructor: function(config) {
        // Apply passed config to object's config
        Ext.apply(this.config, config);
        // Apply config to current object
        Ext.applyIf(this, this.config);
        // Instantiate adapter by class name with current config
        this.adapterSingletonInstance = Ext.create(this.adapterClass, this.config); 
    },

    getAdapter: function() {
        return this.adapterSingletonInstance;
    }
});