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
	modal: false
    },

    closable: true,
    maximizable: true,    

    items: 
	{
	    xtype: 'form',
            url: '/accounts/login/',
	    standardSubmit : false,
	    layout: 'vbox',
	    height: '100%',
	    width: '100%',
	    border: false,
            bodyPadding: 10,            
            
            baseParams: {next: '/'},
                                
            items: [
		{
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
        	}
            ],
                                                        
            buttons: [{
        	xtype: 'button',
        	text: 'Submit',
            	handler: function() {
            	    // The getForm() method returns the Ext.form.Basic instance:
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                	// Submit the Ajax request and handle the response
                        form.submit({
                    	    success: function(form, action) {
                        	Ext.Msg.alert('Success', action.result.msg);
                            },
                            
                            failure: function(form, action) {
                        	Ext.Msg.alert('Failed', action.result.msg);
                            }
                        });
            	    }
                }
            }]
        },
    
    constructor: function(){
	Ext.applyIf(this, this.config);
	this.callParent(arguments);
	this.show();
    }    
    
});