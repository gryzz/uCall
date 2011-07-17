#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import sys,time
import simplejson as json
from stompy.simple import Client
import ConfigParser

config = ConfigParser.ConfigParser()
devel_config = ConfigParser.ConfigParser()

config.read('/opt/ucall/etc/config.ini')
devel_config.read('/opt/ucall/etc/devel_config.ini')

stomp_host = config.get('STOMP', 'host')
stomp_username = config.get('STOMP', 'username')
stomp_password = config.get('STOMP', 'password')
stomp_queue = "/queue/messages/" + devel_config.get('GENERAL', 'agent')

print '='*80
print 'Stomp host:', stomp_host 
print 'Stomp username:', stomp_username 
print 'Stomp password:', stomp_password 
print 'Stomp queue:', stomp_queue
print '='*80

stomp = Client(stomp_host)
stomp.connect(stomp_username, stomp_password)
stomp.subscribe("jms.queue.msg.ctrl")

while True:
    message = stomp.get()
    print message.body

stomp.disconnect()
