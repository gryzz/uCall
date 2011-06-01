Ext.namespace('uCall.ui');

uCall.ui.Application = function(config) {
	Ext.applyIf(this, config);
	this.initUIComponents();
	uCall.ui.Application.superclass.constructor.call(this);
};

Ext.extend(uCall.ui.Application, Ext.Panel, {
	initUIComponents : function() {
		Ext.apply(this, {});
	}
});

Ext.onReady(function(){
	application = new uCall.ui.Application();
	application.
});