Ext.define('uCall.widgets.LoginWindow', {

    extend: 'Ext.window.Window',
    alias: 'widget.LoginWindow',
    
    config: {
    	id: 'LoginForm',
    	title: 'Log in',
	layout: 'fit',
	height: 200,
	width: 400
    },

    closable: false,
    modal: true,

    
    items: 
	{
	    xtype: 'form',
            url: '/accounts/login/',
	    standardSubmit : true,
	    layout: 'vbox',
	    height: '100%',
	    width: '100%',
	    border: false,
            bodyPadding: 10,            
            
            baseParams: {
        	next: '/'
    	    },
                                
            items: [
        	{
        	    xtype: 'textfield',
		    fieldLabel: 'Username',
		    allowBlank: false,
            	    name: 'username'
        	},
        	{
        	    xtype: 'textfield',
		    fieldLabel: 'Password',
		    inputType: 'password',
		    allowBlank: false,
            	    name: 'password'
        	},
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