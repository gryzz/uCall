#!/usr/bin/python

import csv
from time import *
from datetime import *
from handlers import *
import simplejson as json
from stompy.simple import Client
import ConfigParser

myfileobj = open("events.txt","read")
csv_read = csv.reader(myfileobj,dialect=csv.excel_tab)

config = ConfigParser.ConfigParser()
devel_config = ConfigParser.ConfigParser()

config.read('/opt/ucall/etc/config.ini')
devel_config.read('/opt/ucall/etc/devel_config.ini')

stomp = Client(config.get('STOMP', 'host'))
stomp.connect(config.get('STOMP', 'username'), config.get('STOMP', 'password'))

timestamp_prev = None

callbacks = {
    'Dial':handle_Dial,
    'Hangup':handle_Hangup,
    'Link':handle_Link,
    'Newcallerid':handle_Newcallerid,
    'Newchannel':handle_Newchannel,
    'Newexten':handle_Newexten,
    'Newstate':handle_Newstate,
    'Unlink':handle_Unlink,
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

    print event
    
    message = callbacks[event](event_data)
    json_message = json.dumps(message, separators=(',',':'))
    destination = "/queue/messages/" + devel_config.get('GENERAL', 'agent')
    
    stomp.put(json_message, destination=destination)
