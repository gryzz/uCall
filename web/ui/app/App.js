/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 */

Ext.define('uCall.App', {
    requires: [
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
    },
    // Declare members
    messageDeck: null,
	stompClientAdapterFactory: null,
	stompClientAdapter: null,
	channelEventController: null,
    
    // Constructor
	constructor: function(){
		var that = this;
		
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
			},
			onMessage: function(){
				console.log("onMessage");
			},
			onDisconnect: function(){
				that.channelStatusIndicator.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);
			},
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
