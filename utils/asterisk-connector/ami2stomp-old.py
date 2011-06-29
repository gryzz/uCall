#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import asterisk.manager
import sys,os,time
import simplejson as json
from stompy.simple import Client
import ConfigParser
from sqlobject import *
from handlers import *

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from channel.channel_message import ChannelMessage as ChannelMessage

#import fcntl                                                                                                                                                                                    
#lockfile = os.path.normpath('/var/lock/' + os.path.basename(__file__) + '.lock')                                                                                                                
#exclusive_lock = open(lockfile, 'w')                                                                                                                                                            
#try:                                                                                                                                                                                            
#    fcntl.lockf(exclusive_lock, fcntl.LOCK_EX | fcntl.LOCK_NB)                                                                                                                                  
#except IOError:                                                                                                                                                                                 
#    print "Another instance is already running, quitting."                                                                                                                                      
#    time.sleep(1)                                                                                                                                                                               
#    sys.exit(-1)    

config = ConfigParser.ConfigParser()
config.read('/opt/ucall/etc/config.ini')

stomp = Client(config.get('STOMP', 'host'))
stomp.connect(config.get('STOMP', 'username'), config.get('STOMP', 'password'))

#sys.stdout = open("/var/log/requests/connector2.log","a")
#sys.stderr = open("/var/log/requests/connector-err2.log","a")

class AsteriskEvent(SQLObject):
    added=DateTimeCol(default=sqlbuilder.func.NOW())
    event = StringCol()
    uniqueid = StringCol(default=None)
    raw = StringCol(default=None)

connection = connectionForURI(config.get('SQL', 'dsn'))
sqlhub.processConnection = connection

def send_message(message, agent):
    #conf={"expires":(int(time()) + int(connect(config.get('GENERAL', 'message_ttl'))) * 1000}  
    stomp.put(message, destination="/queue/messages/"+agent, persistent=False, conf=conf)

def getLocalNumber(channel):
    return channel.split('-')[0]

def handle_shutdown(event, manager):
    print "Recieved shutdown event"
    manager.close()
    # we could analize the event and reconnect here
      
def handle_newstate_ringing(event, manager):
    channel = event.get_header('Channel')
    
    if channel == None:
        return False

    initiator = AsteriskEventDial.selectBy(destuniqueid=event.get_header('Uniqueid'))
    initiator = initiator[0]
	
    agent = getLocalNumber(channel)
    caller = initiator.callerid
    ext = event.get_header('CallerID')
    uid = event.get_header('Uniqueid')

    message = json.dumps({'event': 'ringing', 'ext':ext, 'agent':agent, 'uid':uid, 'caller':caller}, separators=(',',':'))
    
    send_message(message, agent)
    #stomp.put(message, destination="/queue/messages/"+agent, persistent=False)
    print "Incomming ringing - %s. %s -> %s -> %s" % (uid, caller, ext, agent)
      
      
def handle_newstate(event, manager):
    #print event.get_header('Event'), event.headers
    
    if event.get_header('State') == 'Ringing':
	handle_newstate_ringing(event, manager)
	
#def handle_newstate(event, manager):
#    #print event.get_header('Event'), event.headers
#    if event.get_header('State') == 'Ringing':
#	channel2 = event.get_header('Channel2')
#    
#	if channel2 == None:
#	    return False
#    
#    agent = getLocalNumber(channel2)
#    client = event.get_header('CallerID1')
#    
#    if event.get_header('State') == 'Ringing':
#	message = json.dumps({'event': 'link', 'remote':client, 'local':agent}, separators=(',',':'))
#	stomp.put(message, destination="/queue/"+agent)
#	print "Incomming ringing - %s - %s - %s" % (event.get_header('Uniqueid1'), client, agent)

def handle_hangup(event, manager):
    #print event.get_header('Event'), event.headers
    
    if event.get_header('Cause-txt') == 'Normal Clearing':
	handle_hangup_clearing(event, manager)

def handle_hangup_clearing(event, manager):
    channel = event.get_header('Channel')
    
    if channel == None:
        return False
    
    agent = getLocalNumber(channel)
    uid = event.get_header('Uniqueid')
    
    message = json.dumps({'event': 'hangup_cleanup', 'agent':agent, 'uid':uid}, separators=(',',':'))
    stomp.put(message, destination="/queue/messages/"+agent, persistent=False)
    print "Hangup - %s - %s" % (uid, agent)

def handle_link(event, manager):
    agent = getLocalNumber(event.get_header('Channel2'))
    message = json.dumps({'event': 'link', 'remote': event.get_header('CallerID1'), 'local':agent}, separators=(',',':'))

    stomp.put(message, destination="/queue/"+agent, persistent=False)
    print "Incomming answered - %s - %s - %s" % (event.get_header('Uniqueid1'), event.get_header('CallerID1'), getLocalNumber(event.get_header('Channel2')))
	
def handle_unlink(event, manager):
    agent = getLocalNumber(event.get_header('Channel2'))
    message = json.dumps({'event': 'unlink', 'remote': event.get_header('CallerID1'), 'local':agent}, separators=(',',':'))
    stomp.put(message, destination="/queue/messages/"+agent, persistent=False)
    print "Incomming terminated - %s - %s - %s" % (event.get_header('Uniqueid1'), event.get_header('CallerID1'), getLocalNumber(event.get_header('Channel2')))

def handle_dial(event, manager):
    #try:
    srcuniqueid = event.get_header('SrcUniqueID')
    callerid = event.get_header('CallerID')
    destination = getLocalNumber(event.get_header('Destination'))
    destuniqueid = event.get_header('DestUniqueID')
    source = getLocalNumber(event.get_header('Source'))

    AsteriskEventDial(srcuniqueid=srcuniqueid, callerid=callerid, destination=destination, destuniqueid=destuniqueid, source=source)
    #except:
    #	pass

def handle_event(event, manager):
    try:
	srcuniqueid=event.get_header('Uniqueid')
    except:
	srcuniqueid=None

    print event.get_header('Event'), event.headers
    
    AsteriskEvent(event=event.get_header('Event'), raw=str(event.headers), uniqueid=uniqueid)

manager = asterisk.manager.Manager()

try:
    try:
	manager.connect(config.get('AMI', 'host')) 
        manager.login(config.get('AMI', 'username'), config.get('AMI', 'password'))

        manager.register_event('Shutdown', handle_shutdown)
        manager.register_event('Newstate', handle_newstate)
        manager.register_event('Hangup', handle_hangup)
        manager.register_event('Link', handle_link)
        manager.register_event('Unlink', handle_unlink)
        manager.register_event('Dial', handle_dial)
        #manager.register_event('Newstate', handle_newstate)
        #manager.register_event('*', handle_event)

	manager.message_loop()

        manager.logoff()

    except asterisk.manager.ManagerSocketException, (errno, reason):
	print "Error connecting to the manager: %s" % reason

    except asterisk.manager.ManagerAuthException, reason:
	print "Error logging in to the manager: %s" % reason

    except asterisk.manager.ManagerException, reason:
	print "Error: %s" % reason
          
finally:
    manager.close()

