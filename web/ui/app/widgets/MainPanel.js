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
        'uCall.widgets.GrowlMessagingContainer'
    ],
    extend: 'Ext.panel.Panel',
    alias: 'widget.MainPanel',
    
    config: {
        id: 'MainPanel',
        layout: 'anchor',
        tbar: {xtype:'MainTopToolbar'},
        popups:[
            {
                width: 150,
                height: 50,
                title: "test 1",
                anchor: {
                    right: 0
                }
            },
            {
                width: 150,
                height: 50,
                title: "test 2"
            },
            {
                width: 150,
                height: 50,
                title: "test 3"
            }
        ]
    },
    
    constructor: function(){
        Ext.applyIf(this, this.config);
        this.callParent(arguments);
        
        var c = Ext.create('Ext.Component', {
            floating: true,
            cls: 'mainPanelBg'
        });
        c.show();
        c.alignTo(document.body, 'br-br');
    }
});