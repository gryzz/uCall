Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', 'app/uCall');
Ext.require('Ext.container.Viewport', 'uCall.App');


Ext.onReady(function(){
    var app = new uCall.App();    
});