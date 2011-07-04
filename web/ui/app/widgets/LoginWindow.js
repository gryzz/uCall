Ext.define('uCall.widgets.LoginWindow', {

    extend: 'Ext.window.Window',
    alias: 'widget.LoginWindow',

    config: {
        id: 'LoginForm',
        title: _('Please log in'),
        layout: 'fit',
        height: 200,
        width: 400,

        items: {
            xtype: 'form',
            /* TODO: from config */
            url: '/accounts/login/',
            id: 'lf',
            standardSubmit : true,
            layout: 'anchor',
            height: '100%',
            width: '100%',
            border: false,
            bodyPadding: 10,

            baseParams: {
                next: '/'
            },
            
            defaults: {
                listeners: {
                    specialkey: function(f, e){
                        if(e.getKey() == e.ENTER){
                            var form = this.up('form').getForm();
                                form.submit();
                        }
                    }
                }
            },
            
            items: [{
                labelAlign: 'right',
                xtype: 'textfield',
                fieldLabel: 'Username',
                allowBlank: false,
                anchor: '100%',
                name: 'username',

            },{
                labelAlign: 'right',
                xtype: 'textfield',
                fieldLabel: 'Password',
                inputType: 'password',
                anchor: '100%',
                allowBlank: false,
                name: 'password'
            }],

            buttons: [{
                xtype: 'button',
                text: 'Login',
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
    },

    closable: false,
    modal: true,

    

    constructor: function(){
        Ext.apply(this, this.config);
//        Ext.Array.each(this.config.items.items, function(item, index) {
//            item.listeners = {
//                click: 
//                    function(){ console.log('click el'); }
//                
//            };
//        }, this);console.log(this.config.items.items);
        this.callParent(arguments);
        this.show();
    }
});