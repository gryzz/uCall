/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 */

Ext.define('uCall.App', {
    requires: [
        'uCall.widgets.MainPanel',
        'uCall.data.stomp.StompClientAdapterFactory',
        'uCall.controllers.ChannelEventController',
        'uCall.controllers.GrowlController',
        'uCall.controllers.MessageController',
        'uCall.controllers.ApplicationWindowController',
        'uCall.l10n.L10n'
    ],
    
    extend: 'Ext.container.Viewport',
    
    id: 'ucall-app',
    
    config: {
        layout: 'fit',
        items: [{xtype: 'MainPanel', width: "100%", height: "100%"}],
        autoReconnectLimit: 3,
        autoReconnectTimeout: 1000,
        reconnectTimeout: 1000
    },
    // Declare members
    messageController: null,
    applicationWindowController: null,
    growlController: null,
    stompClientAdapterFactory: null,
    stompClientAdapter: null,
    channelEventController: null,
    channelStatusIndicator: null,
    autoReconnectCount: 0,
    
    // Constructor
    constructor: function(){
        var that = this;

        var manualChannelReconnect = function() {
            if (!that.stompClientAdapter.isConnected) {
                // Wait before reconnecting
                Ext.defer(that.stompClientAdapter.performConnect, that.reconnectTimeout, that.stompClientAdapter);
            }
        }

        // Copy config values to current object
        Ext.applyIf(this, this.config);
        // Call parent constructor
        this.callParent(arguments);

        /*
         * Init app components
         */
        // Channel messages controller
        this.applicationWindowController = Ext.create('uCall.controllers.ApplicationWindowController');
        this.growlController = Ext.create('uCall.controllers.GrowlController');
        this.messageController = Ext.create('uCall.controllers.MessageController', {
            onEventLinkCallback: function(message) {
                that.applicationWindowController.fireEvent(uCall.constants.MessageEvent.WINDOW, message);
            },
            onShow: function(id, message) {
                that.growlController.add(id, [ {
                    xtype: 'component',
                    html: message,
                }]);
            },
            onHide: function(id) {
                that.growlController.remove(id);
            }
        });
        
        // Channel status indicator
        this.channelStatusIndicator = Ext.getCmp("ChannelStatusIndicator");

        // Create channel event controller
        this.channelEventController = Ext.create("uCall.controllers.ChannelEventController", {
            onConnect: function(){
                that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.CONNECTED);

                // Unset on click handler for channel status indicator
                that.channelStatusIndicator.un("click", manualChannelReconnect);
                // Hide popup
                uCall.widgets.ChannelStatusInactivePopup.hide();
            },
            
            onMessage: function(eventData){
                that.messageController.handleMessage(eventData);
            },
            
            onDisconnect: function(){
                // Propagate event to channel status indicator
                that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);

                // Try reconnecting automatically
                if (that.autoReconnectCount < that.autoReconnectLimit) {
                    that.autoReconnectCount++;
                    Ext.defer(that.stompClientAdapter.performConnect, that.autoReconnectTimeout, that.stompClientAdapter);
                    return;
                }

                // Define on click handler for channel status indicator
                that.channelStatusIndicator.on("click", manualChannelReconnect);
                
                // Show manual reconnect message
                uCall.widgets.ChannelStatusInactivePopup.show({onClickCallback: manualChannelReconnect});
            }
        });
        
        // Stomp client adapter factory
        this.stompClientAdapterFactory = Ext.create('uCall.data.stomp.StompClientAdapterFactory', {
            url: window.controlChannel.ws_url,
            login: window.controlChannel.username,
            passcode: window.controlChannel.password,
            destination: '/queue/messages/' + window.currentUser.agentId,
            sendDestination: '/queue/control',
            pingDestination: '/queue/ping',
            pingMessage: window.currentUser.agentId,
            debug: true,

            onConnectCallback: function(){
                // Reset reconnect counter
                that.autoReconnectCount = 0;
                // Propagate channel connect event
                that.channelEventController.fireEvent(uCall.constants.ChannelEvent.CONNECTED);
            },
            onDisconnectCallback: function(){
                // Propagate channel disconnect event
                that.channelEventController.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);
            },
            onMessageCallback: function(data){
                // Propagate channel message event
                that.channelEventController.fireEvent(uCall.constants.ChannelEvent.MESSAGE, {message: data});
            }
        });

        // Stomp client adapter
        this.stompClientAdapter = this.stompClientAdapterFactory.getAdapter();

        // Do connect
        this.stompClientAdapter.performConnect();
    }
});
