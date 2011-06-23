#!/usr/bin/python

import sys,os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from channel.channel_message import ChannelMessage as ChannelMessage

def handle_Dial(raw):
    return raw

def handle_Hangup(event):
    if event['Cause-txt'] == 'Normal Clearing':
	handle_hangup_clearing(event)

def handle_Link(event):

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_LINK)
    #message.set_id(event['Uniqueid'])
    #message.set_extension(event['CallerID'])
    
    return message.dump_data_json()

    agent = getLocalNumber(event['Channel2'])
    message = json.dumps({'event': 'link', 'remote': event.get_header('CallerID1'), 'local':agent}, separators=(',',':'))

    stomp.put(message, destination="/queue/"+agent, persistent=False)
    print "Incomming answered - %s - %s - %s" % (event.get_header('Uniqueid1'), event.get_header('CallerID1'), getLocalNumber(event.get_header('Channel2')))
    return raw

def handle_Newcallerid(raw):
    return raw

def handle_Newchannel(raw):
    return raw

def handle_Newexten(raw):
    return raw

def handle_Newstate(event):
   if event['State'] == 'Ringing':
	return handle_newstate_ringing(event)

def handle_Unlink(raw):
    return raw

# ======================================

def getLocalNumber(channel):
    return channel.split('-')[0]

def handle_newstate_ringing(event):
    channel = event['Channel']

    if channel == None:
        return None

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_RINGING)
    message.set_id(event['Uniqueid'])
    message.set_extension(event['CallerID'])
    message.set_caller('cn') #find in db
    
    return message.dump_data_json()

def handle_hangup_clearing(event):
    channel = event['Channel']
    
    if channel == None:
        return None

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_HANGUP_CLEANUP)
    message.set_id(event['Uniqueid'])
    
    print message.dump_data_json()
    
    return message.dump_data_json()
