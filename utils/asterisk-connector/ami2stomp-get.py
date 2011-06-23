#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import sys,time
import simplejson as json
from stompy.simple import Client

stomp = Client('127.0.0.1') 
stomp.connect('guest', 'password')
stomp.subscribe("/queue/control")

message = stomp.get()
print message.body

stomp.disconnect()
