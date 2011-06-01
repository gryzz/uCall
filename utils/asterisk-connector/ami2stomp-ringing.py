#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import sys,time
import simplejson as json
from stompy.simple import Client
from time import *

stomp = Client('192.168.122.13') 
stomp.connect('guest', 'password')
      
def handle_link():
    #message = json.dumps({'event': 'link', 'remote':'131313', 'local':'40-70-41'}, separators=(',',':'))
    message = json.dumps({'event': 'ringing', 'ext':407040, 'agent':'SIP/1313', 'uid':'1234'}, separators=(',',':'))

    #conf={'expires':'30000000', 'expiration':'30000000'}
    conf={}
    #conf={"expires":(int(time()) + 30) * 1000}
    stomp.put(message, destination="/queue/messages/SIP/1001", persistent=False, conf=conf)
    #stomp.put(message, destination="/queue/messages/SIP/1001", persistent=False, conf=conf)
	
def handle_unlink():
    message = json.dumps({'event': 'unlink', 'remote':'091999999', 'local':'40-70-41'}, separators=(',',':'))
    stomp.put(message, destination="/queue/agent/1113")


#now =  time()
#print int(time()) * 1000 + 60

handle_link()
#time.sleep(10)  
#handle_unlink()