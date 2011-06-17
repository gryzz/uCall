/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 */

Ext.define('uCall.App', {
    requires: [
        'uCall.l10n.L10n',
		'uCall.widgets.MainPanel',
		'uCall.controllers.MessagesDeck',
		'uCall.data.stomp.StompClientAdapterFactory',
		'uCall.controllers.ChannelEventController'
    ],
    
    extend: 'Ext.container.Viewport',
    
    config: {
        layout: 'fit',
        items: [
        	{
        		xtype: 'MainPanel',
        		width: "100%",
        		height: "100%"
        	}
        ]
        ,autoReconnectLimit: 3
        ,autoReconnectTimeout: 1000
        ,reconnectTimeout: 1000
    },
    // Declare members
    messageDeck: null,
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
        // Message deck
		this.messageDeck = Ext.create('uCall.controllers.MessagesDeck');
		
		// performChannelReconnect
		this.channelStatusIndicator = Ext.getCmp("ChannelStatusIndicator");

		// Create channel event controller		
		this.channelEventController = Ext.create("uCall.controllers.ChannelEventController", {
			onConnect: function(){
				that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.CONNECTED);

				// Undset on click handler for channel status indicator
				that.channelStatusIndicator.un("click", manualChannelReconnect);
				// Hide popup
				uCall.widgets.ChannelStatusInactivePopup.hide();
			},
			onMessage: function(){
				console.log("onMessage");
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
			url: window.controlChannel.url,
			login: 'guest',
			passcode: 'password',
			destination: '/queue/messages/SIP/1001',
			sendDestination: '/queue/control',
			pingMessage: 'SIP/1001',
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
