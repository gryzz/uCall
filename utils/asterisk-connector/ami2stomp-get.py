#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import sys,time
import simplejson as json
from stompy.simple import Client

stomp = Client('80.243.146.77') 
stomp.connect('guest', 'password')
stomp.subscribe("/queue/test/13")
message = stomp.get()
print message.body
#stomp.unsubscribe("/queue2/test")
#stomp.disconnect()
