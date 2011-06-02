Ext.namespace('uCall.ui');

uCall.ui.Application = function(config) {
	Ext.applyIf(this, config);
	this.initUIComponents();
	uCall.ui.Application.superclass.constructor.call(this);
};

Ext.extend(uCall.ui.Application, Ext.Viewport, {
	initUIComponents : function() {
		Ext.apply(this, {});
	}
});

Ext.onReady(function(){
	
	var app = new uCall.ui.Application({
		// Default configuration for our App's viewport here, e.g. layout: "border"
		layout: "border",
		items: [{
			id: "appPanel",
			xtype: "panel",
			region: "center",
			title: "uCall App",
			bbar: [
				{
					id: "appButton1",
					text: "Button1",
					handler: function(){
						new Ext.Window({
							animateTarget: Ext.get("appButton1"),
							title: "Button 1 clicked!",
							width: 400,
							height: 150,
							html: "<b>Some</b> window <p>content</p>"
						}).show();
					}
				},
				{
					text: "Button2",
					handler: function(){
						var w2 = new Ext.Window({
							animateTarget: Ext.get("appButton1"),
							title: "Button 2 clicked!",
							width: 250,
							height: 75,
							html: "Modal window content",
							plain: true,
							border: false,
							resizable: false,
							draggable: false,
							closable: false //,
							// buttonAlign: "center",
							// buttons: [{
							// 	text: "Close me!",
							// 	handler: function(){
							// 		w2.close();
							// 	}
							// }]
						}).show();
					}
				}
			]
		}]
	});
	
	
	
	// var containerDiv = Ext.get("container");
	// containerDiv.createChild({
	//  	id: "containerChild",
	//  	tag: "div",
	//  	style: "border: 1px solid red; padding: 10px;",
	//  	children: [
	//  		{id: "subchild1", html:"sub child 1"},
	//  		{id: "subchild2", html:"sub child 2"},
	//  		{id: "subchild3", html:"sub child 3"}
	//   	]
	//  });
	// 
	// var sc2 = Ext.get("subchild2");
	// sc2.remove();
	// 
	// var sc3 = Ext.get("subchild3");
	// 
	// var tpl = new Ext.Template("<p>{num}</p>");
	// tpl.compile();
	// 
	// tpl.append(sc3, {num:'Zero'});
	// tpl.append(sc3, {num:'One'});
	// tpl.append(sc3, {num:'Two'});
	
	// var w = new Ext.Component({
	// 	xtype: "window",
	// 	width: 300,
	// 	height: 300,
	// 	title: "Some window",
	// 	layout: "accordion", // "hbox", "vbox"
	// 	border: true,
	// 	layoutConfig: {
	// 		animate: true
	// 	},
	// 	items: [
	// 		{
	// 			xtype: "panel",
	// 			title: "Panel1",
	// 			html: "Panel 1 html"
	// 		},
	// 		{
	// 			title: "Panel2",
	// 			html: "Panel 2 html"
	// 		}
	// 	]
	// 	
	// });
	// w.show();
	
});