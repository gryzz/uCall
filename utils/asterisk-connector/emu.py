#!/usr/bin/python

import csv
import sys,os
from time import *
from datetime import *
import simplejson as json
from stompy.simple import Client
import ConfigParser
from sqlobject import *
from handlers.command_handler_factory import CommandHandlerFactory
from handlers.command_constants import Protocol

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from channel.channel_message import ChannelMessage as ChannelMessage

class FakeAmiManager:
    version = '1.0'

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

manager = FakeAmiManager()
manager.destination = stomp

asteriskProtocolVersion = None
if manager.version == '1.0':
    asteriskProtocolVersion = Protocol.ASTERISK_1_0
elif manager.version == '1.1':
    asteriskProtocolVersion = Protocol.ASTERISK_1_1
else:
    sys.exit()

command_handler = CommandHandlerFactory(asteriskProtocolVersion).create_command_handler()

callbacks = {
    'Dial': command_handler.handle_Dial,
    'Hangup': command_handler.handle_Hangup,
    'Link': command_handler.handle_Link,
    'Newstate': command_handler.handle_Newstate,
    'QueueMemberAdded': command_handler.handle_QueueMemberAdded,
    'QueueMemberRemoved': command_handler.handle_QueueMemberRemoved,
    'QueueMemberPaused': command_handler.handle_QueueMemberPaused,
    'QueueMember': command_handler.handle_QueueMember
}

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

    try:
	message = callbacks[event](event_data, manager)

#    if message:
#	print 'Event:', event
#	print 'Original data:', event_data
#	print 'Produced message:', message

#	stomp.put(message, destination=stomp_queue)
    except:
	pass
