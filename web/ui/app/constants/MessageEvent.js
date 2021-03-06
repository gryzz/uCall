/**
 * @class uCall.constants.MessageEvent
 *
 * Message events.
 */

Ext.define('uCall.constants.MessageEvent', {
    singleton: true,

    // Event types
    INCOMING_CALL_RINGING: 'incomingCallRinging',
    INCOMING_CALL_HANGUP:  'incomingCallHangup',
    INCOMING_CALL_LINK: "incomingCallLink",
    STATUS_ONLINE: "StatusOnline",
    STATUS_OFFLINE: "StatusOffline",
    STATUS_AWAY: "StatusAway"


});
