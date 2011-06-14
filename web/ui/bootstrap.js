// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');
Ext.Loader.setPath('jmesnil.StompWebsocket', '/ui/vendors/jmesnil/stomp-websocket/src/stomp.js');


// Includes
Ext.require('uCall.App');

// Application
Ext.application({
    name: 'uCall',
    launch: function() {
        Ext.create('uCall.App');
    }
});

// Ready
Ext.onReady(function(){
	// TODO: Do something
	console.log("woof! woof! DOM is ready.");
	
	Ext.create('uCall.data.StompClientAdapter', {
		url: 'ws://rstets.ucserv.dev:61614/stomp',
		login: 'guest',
		password: 'password',
		destination: '/queue/messages/'
	});
});
