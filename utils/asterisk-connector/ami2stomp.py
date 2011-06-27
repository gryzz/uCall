#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import asterisk.manager
import sys,os,time
import simplejson as json
from stompy.simple import Client
import ConfigParser
from sqlobject import *
import handlers

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from channel.channel_message import ChannelMessage as ChannelMessage

#sys.stdout = open("/var/log/requests/connector2.log","a")
#sys.stderr = open("/var/log/requests/connector-err2.log","a")

import fcntl                                                                                                                                                                                    
lockfile = os.path.normpath('/var/lock/' + os.path.basename(__file__) + '.lock')                                                                                                                
exclusive_lock = open(lockfile, 'w')                                                                                                                                                            
try:                                                                                                                                                                                            
    fcntl.lockf(exclusive_lock, fcntl.LOCK_EX | fcntl.LOCK_NB)                                                                                                                                  
except IOError:                                                                                                                                                                                 
    print "Another instance is already running, quitting."                                                                                                                                      
    time.sleep(1)                                                                                                                                                                               
    sys.exit(-1)    

class AsteriskEvent(SQLObject):
    added=DateTimeCol(default=sqlbuilder.func.NOW())
    event = StringCol()
    uniqueid = StringCol(default=None)
    raw = StringCol(default=None)

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

ami_host = config.get('AMI', 'host')
ami_username = config.get('AMI', 'username')
ami_password = config.get('AMI', 'password')

print 'AMI host:', ami_host 
print 'AMI username:', ami_username 
print 'AMI password:', ami_password 
print '='*80

sql_dsn = config.get('SQL', 'dsn')

print 'SQL:', sql_dsn 
print '='*80

stomp = Client(stomp_host)
stomp.connect(stomp_username, stomp_password)

connection = connectionForURI(config.get('SQL', 'dsn'))
sqlhub.processConnection = connection

def send_message(message, agent):
    #conf={"expires":(int(time()) + int(connect(config.get('GENERAL', 'message_ttl'))) * 1000}  
    stomp.put(message, destination="/queue/messages/"+agent, persistent=False, conf=conf)

def handle_shutdown(event, manager):
    print "Recieved shutdown event"
    manager.close()
    # we could analize the event and reconnect here

def handle_event(event, manager):
    return 
    
    try:
	srcuniqueid=event.get_header('Uniqueid')
    except:
	srcuniqueid=None

    print event.get_header('Event'), event.headers
    
    AsteriskEvent(event=event.get_header('Event'), raw=str(event.headers), uniqueid=uniqueid)


manager = asterisk.manager.Manager()

#try:
#try:
manager.connect(ami_host)
manager.login(ami_username, ami_password)

manager.register_event('Shutdown', handle_shutdown)
manager.register_event('Newstate', handlers.handle_Newstate)
manager.register_event('Hangup', handlers.handle_Hangup)
manager.register_event('Link', handlers.handle_Link)
manager.register_event('Unlink', handlers.handle_Unlink)
manager.register_event('Dial', handlers.handle_Dial)
manager.register_event('Newstate', handlers.handle_Newstate)
manager.register_event('*', handle_event)

manager.message_loop()

manager.logoff()

#except asterisk.manager.ManagerSocketException, (errno, reason):
#    print "Error connecting to the manager: %s" % reason

#except asterisk.manager.ManagerAuthException, reason:
#    print "Error logging in to the manager: %s" % reason

#except asterisk.manager.ManagerException, reason:
#    print "Error: %s" % reason

#except:
#    sys.exit()

#finally:
manager.close()

