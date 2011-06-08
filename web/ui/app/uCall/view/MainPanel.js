/**
 * @class uCall.MainPanel
 * @extends Ext.panel.Panel
 *
 * Shows main panel.
 *
 * @constructor
 * Create a new Main Panel
 * @param {Object} config The config object
 */

Ext.define('uCall.view.MainPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainpanel',
    
    user: {},

    config: {
	    layout: 'fit',
	    title: 'uCall',
    },
    
    constructor: function(){
    	this.callParent([this]);
    }

});