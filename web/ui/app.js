Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', 'app/uCall');
Ext.require(
	'Ext.container.Viewport', 
	'uCall.App',
	'uCall.view.MainPanel',
	'uCall.model.User'
);


Ext.onReady(function(){
    var app = new uCall.App();    
});