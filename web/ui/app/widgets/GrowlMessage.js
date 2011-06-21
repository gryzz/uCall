Ext.define('uCall.widgets.GrowlMessage', {

    extend: 'Ext.window.Window',
    alias: 'widget.GrowlMessage',
    
    config: {
		height: 90,
		width: 250,
		floating: false,
		draggable: false,
		resizable: false,
		cls: 'x-message-box',
		closable: false,
    },

    constructor: function(config){
        Ext.apply(this, config, this.config);
		this.callParent(arguments);
    },
    
    show: function(){
        this.parent
    }
});