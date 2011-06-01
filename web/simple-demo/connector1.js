    var toasts = [];
    
    function getIdFromUid(uid) {
	return uid.replace('.', '')
    }
    
    function showStickySuccessToast(uid, text) {
	 id = getIdFromUid(uid);
    
	 toasts[id] = $().toastmessage('showToast', {
    	    text     : text,
	    sticky   : true,
	    position : 'top-right',
	    type     : 'success',
	    closeText: '',
	    close    : function () {
		console.log("toast is closed ...");
	    }
	});
    }    
    
    function updateCounter(counter_name) {
	$('#counter_'+counter_name).html(parseInt($('#counter_'+counter_name).html()) + 1);
    }

    function updateCounterUnanswered() {
	updateCounter('unanswered');
    }

    function updateCounterAnswered(uid) {
	 id = getIdFromUid(uid);
	$().toastmessage('removeToast', toasts[id]);
    
	updateCounter('answered');
    }
    
    $(document).ready(function() {

	$('#dialog').dialog({
	    autoOpen: false,
	    width: 800,
	    height: 500, 
	    modal: true
	});

	agent = $.cookie('agent');
	
	if (!agent) {
	    agent = 'SIP/1313';
	    $.cookie('agent', agent);
	}
    
        agent = 'SIP/1001';

        var supported = ("WebSocket" in window);
        if(supported) {
	    var client = Stomp.client(queue); 
	
	    client.debug = function(str) {                                                                                                                                                              
		$('#debug').append(str);                                                                                                                                                                           
	    };                                                                                                                                                                                          
	
	    var connect_callback = function() {                                                                                                                                                         
    		$("#state").html('online');

    		client.subscribe('/queue/messages/' + agent, function(message) {
    		    ts = new Date(parseInt(message.headers.timestamp));
		    // check if not outdated 
    
		    var command = JSON.parse(message.body);
		    
		    if (command.event == 'ringing') {
    			$("#dialog").html(command.event + ' - ' + command.uid + ' - ' + command.ext + ' - ' + command.agent);
    			//$("#dialog").load('gw.php?inc=' + command.agent + '&caller=' + command.remote);
			//$('#dialog').dialog('open');
			showStickySuccessToast(command.uid, command.event + ' - ' + command.uid + ' - ' + command.caller  + ' -> ' + command.ext + ' -> ' + command.agent)
		    }

		    if (command.event == 'link') {
    			//$("#dialog").html(command.event + ' - ' + command.uid + ' - ' + command.ext + ' - ' + command.agent);
    			$("#dialog").load('gw.php?inc=' + command.agent + '&caller=' + command.remote);
			$('#dialog').dialog('open');
			//showStickySuccessToast(command.uid, command.event + ' - ' + command.uid + ' - ' + command.caller  + ' -> ' + command.ext + ' -> ' + command.agent)
		    }

		    if (command.event == 'hangup_cleanup') {
			//$('#dialog').dialog('close');
			updateCounterUnanswered();
		    }
		    
		    if (command.event == 'unlink') {
			//$('#dialog').dialog('close');
			updateCounterAnswered();
		    }

    		});
    	    };                                                                                                                                                                                          
                                                                                                                                                                                                               
    	    var error_callback = function() {
    		$("#state").html('offline (<a href="#">reconnect</a>)');
//    	    	client.connect('guest', 'password', connect_callback, error_callback);                                                                                                                                                           
    	    };                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                                                                                                             
    	    client.connect('guest', 'password', connect_callback, error_callback);                                                                                                                      
	
    	    setInterval(function () {
		client.send('/queue/ping', {priority:1, persistent:false}, agent);	
    	    }, 15000);                                                                                                                                                                                                                                                                                                                                                                 	                 
	}
	
//	$("#dialog").html('<iframe frameborder="0" style="width:99%; height:93%;" src="1.html">');
//	$("#dialog").dialog('open');
    });
