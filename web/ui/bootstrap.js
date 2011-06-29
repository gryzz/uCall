// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');
Ext.Loader.setPath('Ext.env', '/ui/vendors/probonogeek/extjs/src/core/src/env');

// Includes
Ext.require('uCall.App');
// TODO: requires are used with ext.js not ext-all.js - ext.js does not work as it has to - fix it.
// TODO: try not to use wildcards
Ext.require('Ext.direct.*');
Ext.require('Ext.form.*');
Ext.require('Ext.tip.QuickTipManager');

// Init
Ext.direct.Manager.addProvider(directSchema);
Ext.tip.QuickTipManager.init();

// Application

Ext.syncRequire('Ext.env.FeatureDetector');

Ext.application({
    name: 'uCall',
    launch: function() {
        if (!Ext.features.has('Websockets')) {
            Ext.Msg.show({
                title:'Incompatible browser',
                msg: 'Websockets not supported',
                icon: Ext.Msg.ERROR,
                closable: false,
                modal: true,
                draggable: false
            });
            
            return;
        }
        
        // Show main viewport
        Ext.create('uCall.App');
    }
});