#!/usr/bin/python

import sys,os
from sqlobject import *

PROTOCOL_VERSION_1_0 = '1.0'
PROTOCOL_VERSION_1_1 = '1.1'

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from channel.channel_message import ChannelMessage as ChannelMessage

class AsteriskEvent(SQLObject):
    added=DateTimeCol(default=sqlbuilder.func.NOW())
    event = StringCol()
    uniqueid = StringCol(default=None)
    raw = StringCol(default=None)

#PhoneNumber.createTable(ifNotExists=True)

def send_message(stomp, message, agent):
    print '='*80
    print 'Agent:', agent 
    print 'Message:', message 
    print '='*80

    conf = {}
    #TODO: add message expiration
    #conf={"expires":(int(time()) + int(connect(config.get('GENERAL', 'message_ttl'))) * 1000}  
    stomp.put(message, destination="/queue/messages/"+agent, persistent=False, conf=conf)

def handle_Dial(event, manager=None):
    """
    {'CallerID': '1133', 'SrcUniqueID': '1306919118.7245', 'Destination': 'SIP/214-19bceeb0', 'DestUniqueID': '1306919118.7246', 'Source': 'SIP/1133-19ba80e0', 'CallerIDName': 'tamila', 'Privilege': 'call,all', 'Event': 'Dial'}
    1.1
    {'Destination': 'SIP/102-0000002a', 'CallerIDNum': '101', 'DestUniqueID': '1309439116.42', 'SubEvent': 'Begin', 'Dialstring': '102', 'UniqueID': '1309439116.41', 'CallerIDName': 'Andrew Kornilov', 'Privilege': 'call,all', 'Event': 'Dial', 'Channel': 'SIP/101-00000029'}
    """

    if not isinstance(event, dict):
	event = event.headers

    print event
    #TODO: 
    # - put into db
    # - cleanup rule
    AsteriskEvent(event=event['Event'], raw=str(event), uniqueid=event['DestUniqueID'])

#    try:
#	srcuniqueid=event.get_header('Uniqueid')
#    except:
#	srcuniqueid=None
#
#    print event.get_header('Event'), event.headers
    
#    AsteriskEvent(event=event.get_header('Event'), raw=str(event.headers), uniqueid=uniqueid)


def handle_Hangup(event, manager=None):
    """
    {'Cause-txt': 'Unknown', 'Uniqueid': '1306918002.7160', 'Privilege': 'call,all', 'Cause': '0', 'Event': 'Hangup', 'Channel': 'SIP/1001-19a7e390'}
    {'Cause-txt': 'User busy', 'Uniqueid': '1306918288.7182', 'Privilege': 'call,all', 'Cause': '17', 'Event': 'Hangup', 'Channel': 'SIP/1001-19bdadc0'}
    {'Cause-txt': 'User alerting, no answer', 'Uniqueid': '1306918224.7179', 'Privilege': 'call,all', 'Cause': '19', 'Event': 'Hangup', 'Channel': 'SIP/1001-19b1a940'}
    {'Cause-txt': 'Normal Clearing', 'Uniqueid': '1306919065.7238', 'Privilege': 'call,all', 'Cause': '16', 'Event': 'Hangup', 'Channel': 'SIP/1001-19b6ec20'}
    {'Cause-txt': 'User busy', 'Uniqueid': '1306919079.7244', 'Privilege': 'call,all', 'Cause': '17', 'Event': 'Hangup', 'Channel': 'SIP/1001-19b746f0'}
    """

    if not isinstance(event, dict):
	event = event.headers

    if event['Cause-txt'] == 'Normal Clearing':
        return handle_hangup_clearing(event, manager.stomp)

def handle_Link(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers
    """
    {'Uniqueid2': '1306914758.6999', 'Uniqueid1': '1306914726.6994', 'Channel1': 'SIP/430913-19be0080', 'Channel2': 'SIP/1313-19ba26d0', 'CallerID2': '380352407040', 'Privilege': 'call,all', 'CallerID1': '430913', 'Event': 'Link'}
    """

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_LINK)
    message.set_id(event['Uniqueid1'])
    message.set_extension(event['CallerID1'])
    message.set_caller(event['CallerID2'])
    
    send_message(manager.stomp, message.dump_data_json(), getLocalNumber(event['Channel1']))


def handle_Newstate(event, manager=None):

    """
    V 1.0
    {'CallerID': '407040', 'State': 'Ringing', 'Uniqueid': '1306914757.6997', 'CallerIDName': '<unknown>', 'Privilege': 'call,all', 'Event': 'Newstate', 'Channel': 'SIP/1119-19c5f0e0'}

    V 1.1
    Event: Newstate
    Privilege: call,all
    Channel: SIP/102-00000023
    ChannelState: 5
    ChannelStateDesc: Ringing
    CallerIDNum: 102
    CallerIDName: 
    Uniqueid: 1309436568.35
    """

    if not isinstance(event, dict):
	event = event.headers

    if manager.version == PROTOCOL_VERSION_1_0 and event['State'] == 'Ringing':
	return handle_newstate_ringing(event, manager.stomp, manager.version)
    if manager.version == PROTOCOL_VERSION_1_1 and event['ChannelStateDesc'] == 'Ringing':
	return handle_newstate_ringing(event, manager.stomp, manager.version)

    return None

def handle_Shutdown(event, manager):
    print "Recieved shutdown event"
    manager.close()

def getLocalNumber(channel):
    return channel.split('-')[0]

def handle_newstate_ringing(event, stomp, protocol_version):
    channel = event['Channel']

    if channel == None:
        return None

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_RINGING)
    message.set_id(event['Uniqueid'])
    
    try:
        parent_event = AsteriskEvent.selectBy(event = 'Dial', uniqueid = event['Uniqueid'])[0]
    except Exception as e:
        print e
        parent_event = None

    if parent_event != None:
        raw = eval(parent_event.raw)
    else:
        raw = None
    
    if raw != None and protocol_version == PROTOCOL_VERSION_1_1:
        caller = raw['CallerIDNum']
        extension = event['CallerIDNum']
    elif raw != None and protocol_version == PROTOCOL_VERSION_1_0:
        caller = raw['CallerID']
        extension = event['CallerID']
    else:
        caller = 'unknown'
        extension = 'unknown'
    
    message.set_extension(extension)
    message.set_caller(caller)

    send_message(stomp, message.dump_data_json(), getLocalNumber(channel))

def handle_hangup_clearing(event, stomp):
    channel = event['Channel']
    
    if channel == None:
        return None

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_HANGUP_CLEANUP)
    message.set_id(event['Uniqueid'])
    
    send_message(stomp, message.dump_data_json(), getLocalNumber(channel))

global sqlhub
