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

Ext.define('uCall.MainPanel', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.mainpanel',

    animCollapse: true,
    layout: 'fit',
    title: 'uCall',

    initComponent: function(){
        Ext.apply(this, {
//            items: this.createView(),
            dockedItems: this.createToolbar()
        });
        
//        this.addEvents();

        this.callParent(arguments);
    },

    /**
     * Creates the main toolbar.
     * @private
     * @return {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        this.createActions();
        this.toolbar = Ext.create('widget.toolbar', {
            items: [this.userInfo, this.statusMenu, this.serviceMenu]
        });
        return this.toolbar;
    },

    /**
     * Create actions to share between toolbar and menu
     * @private
     */
    createActions: function(){
        this.userInfo = Ext.create('Ext.Label', {
            text: 'User info will go here'
        });

        this.statusMenu = Ext.create('widget.menu', {
            items: [{
                scope: this,
                handler: function(){
                    alert("TODO: Status menu handler click");
                },
                text: 'Status menu'
            }]
        });

        this.serviceMenu = Ext.create('Ext.Label', {
            text: 'Service menu'
        });
    }
});