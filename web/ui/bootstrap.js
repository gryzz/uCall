// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');

// Includes
Ext.require('uCall.App');
Ext.require('Ext.direct.*');
Ext.require('Ext.form.*');
Ext.require('Ext.tip.QuickTipManager');

// Init
Ext.direct.Manager.addProvider(directSchema); 
Ext.tip.QuickTipManager.init();

// Application
Ext.application({
    name: 'uCall',
    launch: function() {
        // Show main viewport
        Ext.create('uCall.App');
    }
});
