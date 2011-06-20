/**
 * @class uCall.data.stomp.StompClientAdapter
 * @extends Ext.util.Observable
 *
 * Stomp connector adapter.
 */

Ext.define('uCall.data.stomp.StompClientAdapter', {
    requires: ['uCall.constants.StompClientEvent'],
    extend: 'Ext.util.Observable',

    config: {
        url: null,
        login: null,
        passcode: null,
        destination: null,

        // Ping settings
        pingMessage: null,
        pingDestination: null,
        pingOptions: {
            priority:1, 
            persistent:false,
            expires:1 // Expires at 1st of Jan 1970 00:00:01
        },
        keepAliveInterval : 100000,

        // 3rd party adapter
        client: null,

        onConnectCallback: Ext.emptyFn,
        onDisconnectCallback: Ext.emptyFn,
        onMessageCallback: Ext.emptyFn
    },

    isConnected: false,

    constructor: function(config) {
        // Parent
        this.callParent(arguments);
        // Merge configs
        Ext.apply(this.config, config);
        Ext.applyIf(this, this.config);
        // Register events
        this.addEvents(
            uCall.constants.StompClientEvent.CONNECTION_SUCCESS,
            uCall.constants.StompClientEvent.CONNECTION_ERROR,
            uCall.constants.StompClientEvent.DATA_RECEIVED,
            uCall.constants.StompClientEvent.DISCONNECTED
        );
        // Add listeners
        this.on(uCall.constants.StompClientEvent.CONNECTION_SUCCESS, this.onConnectionSuccess, this);
        this.on(uCall.constants.StompClientEvent.CONNECTION_ERROR, this.onConnectionError, this);
        this.on(uCall.constants.StompClientEvent.DATA_RECEIVED, this.onDataReceived, this);
        this.on(uCall.constants.StompClientEvent.DISCONNECTED, this.onDisconnect, this);
    },

    onConnectionSuccess: Ext.emptyFn,
    onConnectionError: Ext.emptyFn,
    onDataReceived: Ext.emptyFn,
    onDisconnect: Ext.emptyFn,

    performConnect: Ext.emptyFn,
    performSubscribe: Ext.emptyFn,
    performDataSend: Ext.emptyFn,
    performDisconnect: Ext.emptyFn,
    keepAlive: Ext.emptyFn
});
