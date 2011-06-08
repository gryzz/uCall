/**
 * @class uCall.widgets.MainBottomToolbar
 * @extends Ext.toolbar.Toolbar
 *
 * Shows main bottom toolbar.
 *
 * @constructor
 * Create a new Main Bottom Toolbar
 * @param {Object} config The config object
 */

Ext.define('uCall.widgets.MainBottomToolbar', {
	requires: 'uCall.widgets.ChannelStatusIndicator',
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.MainBottomToolbar',
    
    config: {
    	id: 'MainBottomToolbar',
    	items: [
    		{
    			xtype: 'ChannelStatusIndicator'
    		}
    	]
    },
    
	constructor: function(){
		Ext.applyIf(this, this.config);
		this.callParent(arguments);
	}    
    
});