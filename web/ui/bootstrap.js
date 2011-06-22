// Configuration
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('uCall', '/ui/app');

// Includes
Ext.require('uCall.App');

// Application
Ext.application({
    name: 'uCall',
    launch: function() {
        // Show main viewport
        Ext.create('uCall.App');
    }
});


   //  // add a handler for a 'message' event sent by the server
   //  Ext.direct.Manager.on('event', function(event){
   //      
   //      var w = Ext.create('Ext.window.Window', {
   //          // id: 'UserSettingsWindow',
   //       title: 'Dialog Form',
   //       layout: 'fit',
   //       height: 400,
   //       width: 600,
   //       modal: false,
   //          closable: true,
   //          maximizable: true,
   //          
   //          
   //          items:
   //       {
   //           xtype: 'form',
   //              // id: 'UserSettingsForm',
   //           standardSubmit : false,
   //           layout: 'anchor',
   //           height: '100%',
   //           width: '100%',
   //           border: false,
   //           bodyPadding: 10,
   // 
   //              // baseParams: {next: '/'},
   //              // 
   //              // api: {
   //                  // The server-side must mark the submit handler as a 'formHandler'
   //                  // submit: Forms.submitForm
   //              // },
   // 
   //           items: event.result
   //       }
   //      });
   //      
   //      w.show();
   //  });
   // 
   // Forms.getForm(2);
});