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
    
    initComponent: function(){
        
        Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: ['username', 'firstName', 'lastName', 'agentId', 'is_admin']
        });

        Ext.apply(this, {
            layout: 'fit',
            items: [this.createMainPanel()]
        });
        
        this.callParent(arguments);
    },
    
    /**
     * Create main panel
     * @private
     * @return {uCall.MainPanel} mainPanel
     */
    createMainPanel: function(){
        this.mainPanel = Ext.create('widget.mainpanel', {
            user: window.user
        });
        return this.mainPanel;
    }
});

/**
 * some change
 */