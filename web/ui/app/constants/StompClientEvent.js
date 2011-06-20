/**
 * @class uCall.constants.StompClientEvent
 *
 * Stomp client events.
 */

Ext.define('uCall.constants.StompClientEvent', {
    singleton: true,

    // Event types
    CONNECTION_SUCCESS: "StompClientConnectionSuccess",
    CONNECTION_ERROR: "StompClientConnectionError",
    DATA_RECEIVED: "StompClientDataReceived",
    DISCONNECTED: "StompClientDisconnected"
});
