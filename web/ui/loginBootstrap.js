// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');

// Includes
Ext.require('uCall.LoginApp');

// Application
Ext.application({
    name: 'uCall',
    launch: function() {
        Ext.create('uCall.LoginApp');
    }
});
