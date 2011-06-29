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

class FakeAmiManager:
    pass

try:
    file = sys.argv[1]
except:
    print "Usage: %s filename" % sys.argv[0]

    sys.exit()

myfileobj = open(file,"read")
csv_read = csv.reader(myfileobj,dialect=csv.excel_tab)

config = ConfigParser.ConfigParser()

config.read('/opt/ucall/etc/config.ini')

stomp_host = config.get('STOMP', 'host')
stomp_username = config.get('STOMP', 'username')
stomp_password = config.get('STOMP', 'password')

print '='*80
print 'Stomp host:', stomp_host 
print 'Stomp username:', stomp_username 
print 'Stomp password:', stomp_password 
print '='*80

sql_dsn = config.get('SQL', 'dsn')

print 'SQL:', sql_dsn 
print '='*80

stomp = Client(stomp_host)
stomp.connect(stomp_username, stomp_password)

connection = connectionForURI(sql_dsn)
sqlhub.processConnection = connection

timestamp_prev = None

callbacks = {
    'Dial':handle_Dial,
    'Hangup':handle_Hangup,
    'Link':handle_Link,
#    'Newcallerid':handle_Newcallerid,
#   'Newchannel':handle_Newchannel,
#    'Newexten':handle_Newexten,
    'Newstate':handle_Newstate,
#    'Unlink':handle_Unlink,
}

manager = FakeAmiManager()
manager.stomp = stomp

for line in csv_read:
    print line

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
    message = callbacks[event](event_data, manager)

#    if message:
#	print 'Event:', event
#	print 'Original data:', event_data
#	print 'Produced message:', message
    
#	stomp.put(message, destination=stomp_queue)
#    except:
#	pass