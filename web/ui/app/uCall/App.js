/**
 * @class uCall.App
 * @extends Ext.container.Viewport
 *
 * The main uCall application
 * 
 * @constructor
 * Create a new uCall app
 * @param {Object} config The config object
 */

Ext.define('uCall.App', {
    extend: 'Ext.container.Viewport',
    
    config: {
        layout: 'fit',
        items: [this.createMainPanel()]
    }
    
    constructor: function(){
        this.callParent([this]);
    },
    
    /**
     * Create main panel
     * @private
     * @return {uCall.view.MainPanel} mainPanel
     */
    createMainPanel: function(){
        this.mainPanel = {
        	xtype: 'widget.mainpanel',
        	user: window.user
        }
        
        return this.mainPanel;
    }
});

/**
 * some change
 */