#!/usr/bin/python

import sys,os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from channel.channel_message import ChannelMessage as ChannelMessage

def send_message(stomp, message, agent):
    print '='*80
    print 'Agent:', agent 
    print 'Message:', message 
    print '='*80

    conf = {}
    #conf={"expires":(int(time()) + int(connect(config.get('GENERAL', 'message_ttl'))) * 1000}  
    stomp.put(message, destination="/queue/messages/"+agent, persistent=False, conf=conf)


def handle_Dial(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    print event
    return 

def handle_Hangup(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    if event['Cause-txt'] == 'Normal Clearing':
        return handle_hangup_clearing(event, manager.stomp)

def handle_Link(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    # Original data: {'Uniqueid2': '1306914758.6999', 'Uniqueid1': '1306914726.6994', 'Channel1': 'SIP/430913-19be0080', 'Channel2': 'SIP/1313-19ba26d0', 'CallerID2': '380352407040', 'Privilege': 'call,all', 'CallerID1': '430913', 'Event': 'Link'}

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_LINK)
    message.set_id(event['Uniqueid1'])
    message.set_extension(event['CallerID1'])
    message.set_caller(event['CallerID2'])
    
    send_message(manager.stomp, message.dump_data_json(), getLocalNumber(event['Channel1']))

def handle_Newcallerid(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    print event    
    return

def handle_Newchannel(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    print event    
    return

def handle_Newexten(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    print event    

    return

def handle_Newstate(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    if event['State'] == 'Ringing':
	return handle_newstate_ringing(event, manager.stomp)

    return None

def handle_Unlink(event, manager=None):
    if not isinstance(event, dict):
	event = event.headers

    print event    
    return

# ======================================

def getLocalNumber(channel):
    return channel.split('-')[0]

# ======================================

def handle_newstate_ringing(event, stomp):
    channel = event['Channel']

    if channel == None:
        return None

    print event    

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_RINGING)
    message.set_id(event['Uniqueid'])
    message.set_extension(event['CallerID'])
    message.set_caller('!') #find in db

    send_message(stomp, message.dump_data_json(), getLocalNumber(channel))

def handle_hangup_clearing(event, stomp):
    channel = event['Channel']
    
    if channel == None:
        return None

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_HANGUP_CLEANUP)
    message.set_id(event['Uniqueid'])
    
    send_message(stomp, message.dump_data_json(), getLocalNumber(channel))
