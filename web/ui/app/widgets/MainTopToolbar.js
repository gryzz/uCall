/**
 * @class uCall.widgets.MainTopToolbar
 * @extends Ext.toolbar.Toolbar
 *
 * Shows main top toolbar.
 */

Ext.define('uCall.widgets.MainTopToolbar', {
    requires: [
        'uCall.widgets.UserStatusMenuButton',
        'uCall.widgets.UserServiceMenuButton',
        'uCall.widgets.UserSettingsButton',
        'uCall.widgets.ChannelStatusIndicator'
    ],
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.MainTopToolbar',
    
    config: {
        id: 'MainTopToolbar',
        items: [
            {xtype: 'ChannelStatusIndicator'},
            '->',
            'uCall UI',
            '-',
            'Agent: ' + window.currentUser.agentId,
            '-',
            'User Name: ' + window.currentUser.username,
            '-',
            {xtype: 'UserStatusMenuButton'},
            '-',
            {xtype: 'UserServiceMenuButton'},
            '-',
            {xtype: 'UserSettingsButton'}
        ]
    },
    
    constructor: function(){
        Ext.applyIf(this, this.config);
        this.callParent(arguments);
    }
});