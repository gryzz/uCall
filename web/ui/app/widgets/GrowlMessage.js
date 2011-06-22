Ext.define('uCall.widgets.GrowlMessage', {

    extend: 'Ext.Tip',
    alias: 'widget.GrowlMessage',
    
    config: {
        floating: {
            shadow: false,
            shim: false
        },
        width: 200,
        height: 50,
        autoHide: false,
        closable: true,
        closeAction: 'destroy'
    },
    
    constructor: function(config){
        Ext.applyIf(this, this.config);
		this.callParent(arguments);
    },
});