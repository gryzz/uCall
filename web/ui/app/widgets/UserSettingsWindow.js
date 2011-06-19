Ext.Direct.addProvider({"url": "/router/", "enableBuffer": 50, "type": "remoting", "actions": {"Profile": [{"name": "getBasicInfo", "len": 0}, {"formHandler": true, "name": "updateBasicInfo", "len": 1}]}});
Ext.define('uCall.widgets.UserSettingsWindow', {
    requires: [
	    'Ext.direct.*',
	    'Ext.form.*',
	    'Ext.tip.QuickTipManager'
    ],

    extend: 'Ext.window.Window',
    alias: 'widget.UserSettingsWindow',

    config: {
    	id: 'UserSettingsWindow',
    	title: 'User Profile',
	layout: 'fit',
	height: 270,
	width: 400,
	modal: false
    },

    closable: true,
    maximizable: true,

    items:
	{
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

	    items: [
	    {
            xtype: 'textfield',
            fieldLabel: 'First Name',
            name: 'firstname',
            allowBlank:false
        },{
            xtype: 'textfield',
            fieldLabel: 'Last Name',
            name: 'lastname',
            allowBlank:false
        },{
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email',
            vtype:'email'
        },{
            xtype:'fieldset',
            defaultType: 'textfield',
            title: 'Change password',
            items :[{
                fieldLabel: 'New Password',
                name: 'password',
                inputType: 'password'
            },{
                fieldLabel: 'New Password Confirmation',
                name: 'password_confirmation',
                inputType: 'password'
            }]
        }
        ],

        buttons: [{
        xtype: 'button',
        text: 'Save',
        	handler: function() {
        	    var form = this.up('form').getForm();
                if (form.isValid()) {
                    that = this;
                    form.submit({
                        waitMsg: 'Submitting your data...',
                        success: function(form, action){
                            //TODO: Add messageBox that exdent common one
                            that.up('form').getForm().reset();
                            that.up('window').hide();
                            Ext.MessageBox.alert('Thank you!', 'Your profile has been saved.');
                        },
                        failure: function(form, action){
                             var messageBox = Ext.create('uCall.widgets.GrowlMessage', {
                                items: {
                                    xtype: 'component',
                                    html: 'Something went wrong',
                                },
                                floating: true,
                                closable: true,
                                id: 'id'}
                             );

                             messageBox.show();
                        }
                    });
        	    }
            }
        }]
    },

    constructor: function(){
	    Ext.applyIf(this, this.config);
		Ext.tip.QuickTipManager.init();
	    this.callParent(arguments);
	    this.show();
		//TODO: Do not use id to retrive the form: this is one of own items
		Ext.getCmp('UserSettingsForm').getForm().load();
    }

});
