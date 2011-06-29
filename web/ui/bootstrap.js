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
Ext.application({
    name: 'uCall',
    launch: function() {
        // Show main viewport
        Ext.create('uCall.App');
    }
});


Ext.syncRequire('Ext.env.FeatureDetector');
var featureDetector = Ext.create('Ext.env.FeatureDetector');
console.log("Websockets supported: " + featureDetector.tests.Websockets());        
