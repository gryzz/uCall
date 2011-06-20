/**
 * @class uCall.widgets.MainPanel
 * @extends Ext.panel.Panel
 *
 * Shows main panel.
 *
 * @constructor
 * Create a new Main Panel
 * @param {Object} config The config object
 */

Ext.define('uCall.widgets.MainPanel', {
	requires: [
        'uCall.widgets.MainTopToolbar',
//        'uCall.widgets.MainBottomToolbar',
        'uCall.widgets.GrowlMessaging'
    ],
    extend: 'Ext.panel.Panel',
    alias: 'widget.MainPanel',
    
    config: {
        id: 'MainPanel',
        layout: 'border',
        // title: 'uCall UI',
        
        items:[
            {
                region: 'north',
                xtype: 'MainTopToolbar'
            },
    
//            {
//                region: 'south',
//                xtype: 'MainBottomToolbar'
//            },
            
            {
                region: 'east',
                xtype: 'GrowlMessaging'
            },
            {
                region: 'center',
                id: 'center-container'
            }
        ]
    },
    
    constructor: function(){
        Ext.applyIf(this, this.config);
        this.callParent(arguments);
    }

});