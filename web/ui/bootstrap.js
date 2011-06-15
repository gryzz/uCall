// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');


// Includes
Ext.require('uCall.App');

// Stomp
Ext.require('uCall.data.stomp.StompClientAdapterFactory');
// Channel event controller
Ext.require('uCall.controllers.ChannelEventController');

// Application
Ext.application({
    name: 'uCall',
    launch: function() {
    	// Show main viewport
        Ext.create('uCall.App');
        
        // Declare vars
        var stompClientAdapterFactory,
        	stompClientAdapter,
        	channelEventController;
		
		// Create channel event controller		
		channelEventController = Ext.create("uCall.controllers.ChannelEventController", {
			onConnect: function(){
				console.log("onConnect");

				// // Send message
				// stompClientAdapter.performDataSend("Hello World!");
				// // Send message with 30 seconds TTL
				// // NOTE: ttl will not work correctly if clocks on client and mq server are not in sync
				// stompClientAdapter.performDataSend("Good Bye!", ttl = 30);
			},
			onMessage: function(){
				console.log("onMessage");
			},
			onDisconnect: function(){
				console.log("onDisconnect");
			},
		});

        // Stomp client adapter factory
		stompClientAdapterFactory = Ext.create('uCall.data.stomp.StompClientAdapterFactory', {
			url: 'ws://rstets.ucserv.dev:61614/stomp',
			login: 'guest',
			passcode: 'password',
			destination: '/queue/messages/SIP/1001',
			sendDestination: '/queue/control',
			pingMessage: 'SIP/1001',
			debug: true, 
			
			onConnectCallback: function(){
				// Propagate channel connect event
				channelEventController.fireEvent(uCall.constants.ChannelEvent.CONNECTED);
			},
			onDisconnectCallback: function(){
				// Propagate channel disconnect event
				channelEventController.fireEvent(uCall.constants.ChannelEvent.DISCONNECTED);
			},
			onMessageCallback: function(data){
				// Propagate channel message event
				channelEventController.fireEvent(uCall.constants.ChannelEvent.MESSAGE, {message: data});
			}
		});
		
        // Stomp client adapter
		stompClientAdapter = stompClientAdapterFactory.getAdapter();
		
		// Do connect
		stompClientAdapter.performConnect();
    }
});
