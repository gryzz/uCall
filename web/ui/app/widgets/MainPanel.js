/**
 * @class uCall.widgets.MainPanel
 * @extends Ext.panel.Panel
 *
 * Shows main panel.
 */

Ext.define('uCall.widgets.MainPanel', {
	requires: [
		'uCall.widgets.MainTopToolbar'
		//,'uCall.widgets.MainBottomToolbar'
	],
    extend: 'Ext.panel.Panel',
    alias: 'widget.MainPanel',
    
    config: {
    	id: 'MainPanel',
	    layout: 'fit',
	    // title: 'uCall UI',
	    tbar: {
    		xtype: 'MainTopToolbar'
    	}
    	// ,bbar: {
    		// xtype: 'MainBottomToolbar'
    	// }
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
	}    
    
});