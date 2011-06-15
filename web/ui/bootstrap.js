// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');


// Includes
Ext.require('uCall.App');

// Stomp
Ext.require('uCall.data.stomp.StompClientAdapterFactory');

// Application
Ext.application({
    name: 'uCall',
    launch: function() {
        Ext.create('uCall.App');
        
        // Stomp client adapter factory
		var stompClientAdapterFactory = Ext.create('uCall.data.stomp.StompClientAdapterFactory', {
			url: 'ws://rstets.ucserv.dev:61614/stomp',
			login: 'guest',
			passcode: 'password',
			destination: '/queue/messages/SIP/1001',
			pingMessage: 'SIP/1001',
			debug: true
		});
		
        // Stomp client adapter
		var stompClientAdapter = stompClientAdapterFactory.getAdapter();
		
		// Do connect
		stompClientAdapter.performConnect();
    }
});
