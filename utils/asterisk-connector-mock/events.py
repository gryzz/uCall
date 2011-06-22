#!/usr/bin/python

import csv
import sys,os
from time import *
from datetime import *
from handlers import *
import simplejson as json
from stompy.simple import Client
import ConfigParser

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from channel.channel_message import ChannelMessage as ChannelMessage

try:
    file = sys.argv[1]
except:
    print "Usage: %s filename" % sys.argv[0]

    sys.exit()

myfileobj = open(file,"read")
csv_read = csv.reader(myfileobj,dialect=csv.excel_tab)

config = ConfigParser.ConfigParser()
devel_config = ConfigParser.ConfigParser()

config.read('/opt/ucall/etc/config.ini')
devel_config.read('/opt/ucall/etc/devel_config.ini')

stomp = Client(config.get('STOMP', 'host'))
stomp.connect(config.get('STOMP', 'username'), config.get('STOMP', 'password'))

timestamp_prev = None

callbacks = {
##    'Dial':handle_Dial,
    'Hangup':handle_Hangup,
#    'Link':handle_Link,
##    'Newcallerid':handle_Newcallerid,
##    'Newchannel':handle_Newchannel,
##    'Newexten':handle_Newexten,
    'Newstate':handle_Newstate,
##    'Unlink':handle_Unlink,
}

for line in csv_read:
    timestamp_curr = datetime.strptime(line[1], '%Y-%m-%d %H:%M:%S.%f')
    if timestamp_prev <> None and timestamp_prev <> timestamp_curr:
	delta = timestamp_curr - timestamp_prev

	if delta.seconds > 0:
	    print 'sleep for ', delta, delta.seconds
            sleep(delta.seconds)

    timestamp_prev = timestamp_curr

    event = line[2]
    event_data = eval(line[4])

    
#    try:
    message = callbacks[event](event_data)
    if message:
	destination = "/queue/messages/" + devel_config.get('GENERAL', 'agent')
	
	print event_data
    
	print event
	print message
    
	stomp.put(message, destination=destination)
#    except:
#	pass