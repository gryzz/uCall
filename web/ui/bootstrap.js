// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');

// Includes
Ext.require('uCall.App');
Ext.require('Ext.direct.*');
Ext.require('Ext.form.*');
Ext.require('Ext.tip.QuickTipManager');

// Init
Ext.direct.Manager.addProvider(directSchema); 
Ext.tip.QuickTipManager.init();

// Application
Ext.application({
    name: 'uCall',
    launch: function() {
        // Show main viewport
        Ext.create('uCall.App');
    }
});

Ext.require('uCall.model.ApplicationDefinition');
Ext.require('uCall.widgets.ApplicationFormWindow');
Ext.onReady(function(){
    uCall.model.ApplicationDefinition.load(1, {
        success: function(result) {
            
            var applicationDefinition = result.data;
            var applicationFormItems = applicationDefinition.application_form;
            applicationFormItems.push({
                xtype: 'hiddenfield',
                name: 'application_definition_id',
                value: applicationDefinition.id
            });
            
            // TODO: Do something with this!
            for (var item in applicationFormItems) {
                applicationFormItems[item].labelWidth = 200;
                applicationFormItems[item].labelAlign = "right";
            }
            
            Ext.create('uCall.widgets.ApplicationFormWindow', {
                title: applicationDefinition.slug, // TODO: use app.def. title!
                formItems: applicationFormItems,
                onSubmit: function() {
                    // TODO: Implement! (Copy-Paste from update profile)
                    
            	    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        that = this;
                        form.submit({
                            waitMsg: 'Submitting your data...',
                            success: function(form, action){
                                //TODO: Add messageBox that exdent common one
                                that.up('form').getForm().reset();
                                that.up('window').hide();
                                Ext.MessageBox.alert('Thank you!', 'Your application has been saved.');
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
            });
        }
    });
});