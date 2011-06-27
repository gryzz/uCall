#!/usr/bin/python

import sys,os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from channel.channel_message import ChannelMessage as ChannelMessage

def handle_Dial(raw):
    return raw

def handle_Hangup(event, manager=None):
    print event
    print manager

    if event['Cause-txt'] == 'Normal Clearing':
        return handle_hangup_clearing(event)

def handle_Link(event, manager=None):

    print type(event)
    print event

    # Original data: {'Uniqueid2': '1306914758.6999', 'Uniqueid1': '1306914726.6994', 'Channel1': 'SIP/430913-19be0080', 'Channel2': 'SIP/1313-19ba26d0', 'CallerID2': '380352407040', 'Privilege': 'call,all', 'CallerID1': '430913', 'Event': 'Link'}

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_LINK)
    message.set_id(event['Uniqueid1'])
    message.set_extension(event['CallerID1'])
    message.set_caller(event['CallerID2'])
    
    return message.dump_data_json()

def handle_Newcallerid(raw):
    return raw

def handle_Newchannel(raw):
    return raw

def handle_Newexten(raw):
    return raw

def handle_Newstate(event, manager=None):
    if manager != None:
	event = event.headers
   
    if event['State'] == 'Ringing':
	return handle_newstate_ringing(event)

    return None

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
    message.set_caller('!') #find in db
    
    return message.dump_data_json()

def handle_hangup_clearing(event):
    channel = event['Channel']
    
    if channel == None:
        return None

    message = ChannelMessage()

    message.set_event(ChannelMessage.EVENT_HANGUP_CLEANUP)
    message.set_id(event['Uniqueid'])
    
    return message.dump_data_json()
