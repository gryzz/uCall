// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');

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
});
