Ext.define('uCall.widgets.GrowlMessage', {

    extend: 'Ext.window.Window',
    alias: 'widget.GrowlMessage',
    
    config: {
//		layout: 'vbox',
		height: 150,
		width: 250,
		floating: false,
		draggable: false,
		resizable: false,
//		margin: ' 0 0 0 0',
		cls: 'x-message-box',
//		maximizable: true,
		closable: false,
		items: {
			xtype: 'button',
			text: 'test',
			},
    },

//	resize: function(){alert('here')},
	
    constructor: function(config){
//		this.config.id = 'GrowlMessage' + (new Date()).getTime() + Math.floor(Math.random()*1000);
		
        Ext.apply(this, this.config);
//		Ext.Array.remove(this.stateEvents, 'resize');
		this.callParent(arguments);
//		this.resizer.clearListeners()
//        this.header.doLayout();
		
    }
});