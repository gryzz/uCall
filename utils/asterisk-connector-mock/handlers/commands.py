#!/usr/bin/python

def handle_Dial(raw):
    return raw

def handle_Hangup(raw):
    return raw

def handle_Link(raw):
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

    #return None

def handle_Unlink(raw):
    return raw

# ======================================

def getLocalNumber(channel):
    return channel.split('-')[0]

def handle_newstate_ringing(event):
    channel = event['Channel']

    if channel == None:
        return None

    agent = getLocalNumber(channel)
    caller = 'caller number'
    ext = event['CallerID']
    uid = event['Uniqueid']

    return {'event': 'ringing', 'ext':ext, 'agent':agent, 'uid':uid, 'caller':caller}

