Ext.Direct.addProvider({"url": "/router/", "enableBuffer": 50, "type": "remoting", "actions": {"Profile": [{"name": "getBasicInfo", "len": 0}, {"formHandler": true, "name": "updateBasicInfo", "len": 1}]}});
Ext.define('uCall.widgets.UserSettingsWindow', {
    requires: [
        'Ext.direct.*',
        'Ext.form.*',
        'Ext.tip.QuickTipManager',
        'Ext.layout.container.Accordion'
    ],

    extend: 'Ext.window.Window',
    alias: 'widget.UserSettingsWindow',

    config: {
        id: 'UserSettingsWindow',
        title: 'User Profile',
        layout: 'fit',
        height: 200,
        width: 400,
        closable: true,
        modal: false
    },

    closable: true,
    maximizable: true,    

    items: [{
        xtype: 'form',
        id: 'UserSettingsForm',
        standardSubmit : false,
        layout: 'vbox',
        height: '100%',
        width: '100%',
        border: false,
        bodyPadding: 10,

        baseParams: {next: '/'},

        api: {
            // The server-side method to call for load() requests
            load: Profile.getBasicInfo,
            // The server-side must mark the submit handler as a 'formHandler'
            submit: Profile.updateBasicInfo
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'First Name',
            name: 'firstname'
        },{
            xtype: 'textfield',
            fieldLabel: 'Last Name',
            name: 'lastname'
        },{
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email'
        }],

        buttons: [{
            xtype: 'button',
            text: 'Save',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit();
                }
            }
        }]
    }],

    constructor: function(){
        Ext.applyIf(this, this.config);
        Ext.tip.QuickTipManager.init();
        this.callParent(arguments);
        this.show();
        //TODO: Do not use id to retrive the form: this is one of own items
        Ext.getCmp('UserSettingsForm').getForm().load();
    }
});
