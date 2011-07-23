/**
 * @class uCall.controllers.ChannelController
 * @extends Ext.util.Observable
 *
 * Stomp connector adapter.
 */

Ext.define('uCall.controllers.ChannelController', {
    requires: [
        'uCall.constants.ChannelEvent',
        'uCall.data.stomp.StompClientAdapterFactory',
        'uCall.controllers.AgentStatusController'
    ],

    extend: 'Ext.util.Observable',
    singleton: true,

    autoReconnectLimit: 3,
    autoReconnectTimeout: 1000,
    reconnectTimeout: 1000,

    config: {
        onConnect: Ext.emptyFn,
        onMessage: Ext.emptyFn,
        onDisconnect: Ext.emptyFn
    },

    sendMessage: function(data, destination) {
    	if (typeof data != 'string') {
    		data = Ext.JSON.encode(data);
    	}

        this.stompClientAdapter.performDataSend(data, destination);
//        this.stompClientAdapter->performDataSend(data, destination, ttl);
    },

    onConnect: function() {
        var channelStatusIndicator = Ext.getCmp('ChannelStatusIndicator');

        channelStatusIndicator.setActive();

        // Unset on click handler for channel status indicator
        channelStatusIndicator.un("click", this.manualChannelReconnect);

        // Hide popup
        uCall.widgets.ChannelStatusInactivePopup.hide();

        uCall.controllers.AgentStatusController.checkCurrentStatus();
    },

    onMessage: function(eventData){
        uCall.controllers.MessageController.handleMessage(eventData);
    },

    onDisconnect: function(){
        Ext.getCmp('ChannelStatusIndicator').setInactive();

        // Propagate event to channel status indicator
        //that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);

        // Try reconnecting automatically
        //if (that.autoReconnectCount < that.autoReconnectLimit) {
         //   that.autoReconnectCount++;
         //   Ext.defer(that.stompClientAdapter.performConnect, that.autoReconnectTimeout, that.stompClientAdapter);
         //   return;
        //}

        // Define on click handler for channel status indicator
        //that.channelStatusIndicator.on("click", manualChannelReconnect);

        // Show manual reconnect message
        uCall.widgets.ChannelStatusInactivePopup.show({onClickCallback: this.manualChannelReconnect});
    },

    manualChannelReconnect: function() {
        if (!this.stompClientAdapter.isConnected) {
            // Wait before reconnecting
            Ext.defer(this.stompClientAdapter.performConnect, this.reconnectTimeout, this.stompClientAdapter);
        }
    },

    constructor: function(config) {
        // Parent
        this.callParent(arguments);

        // Merge configs
        Ext.apply(this.config, config);
        Ext.applyIf(this, this.config);

        // Register events
        this.addEvents(
            uCall.constants.ChannelEvent.CONNECTED,
            uCall.constants.ChannelEvent.MESSAGE,
            uCall.constants.ChannelEvent.DISCONNECTED
        );

        // Add listeners
        this.on(uCall.constants.ChannelEvent.CONNECTED, this.onConnect, this);
        this.on(uCall.constants.ChannelEvent.MESSAGE, this.onMessage, this);
        this.on(uCall.constants.ChannelEvent.DISCONNECTED, this.onDisconnect, this);

        // Stomp client adapter factory
        this.stompClientAdapterFactory = Ext.create('uCall.data.stomp.StompClientAdapterFactory', {
            url: window.controlChannel.ws_url,
            login: window.controlChannel.username,
            passcode: window.controlChannel.password,

            agentChannel: controlChannel.agent_channel + window.currentUser.agentId,
            ctrlChannel: controlChannel.ctrl_channel,

            pingMessage: {'type': 'ping', 'agent': window.currentUser.agentId},

            debug: true,

            onConnectCallback: function(){
                // Reset reconnect counter
                //that.autoReconnectCount = 0;
                // Propagate channel connect event
                uCall.controllers.ChannelController.fireEvent(uCall.constants.ChannelEvent.CONNECTED);
            },

            onDisconnectCallback: function(){
                // Propagate channel disconnect event
                uCall.controllers.ChannelController.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);
            },

            onMessageCallback: function(data){
                // Propagate channel message event
                uCall.controllers.ChannelController.fireEvent(uCall.constants.ChannelEvent.MESSAGE, {message: data});
                // why by event???
            }
        });

        this.stompClientAdapter = this.stompClientAdapterFactory.getAdapter();
    }

});
