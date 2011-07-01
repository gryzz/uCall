#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import asterisk.manager
import sys,os,time
import simplejson as json
from stompy.simple import Client
import ConfigParser
from sqlobject import *

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

connection = connectionForURI(sql_dsn)
sqlhub.processConnection = connection

manager = asterisk.manager.Manager()

#try:
#try:
manager.connect(ami_host)
manager.login(ami_username, ami_password)
manager.stomp = stomp

if manager.version == '1.1':
    from handlers import commands_1_1 as commands
elif manager.version == '1.0':
    from handlers import commands_1_0 as commands
else:
    sys.exit()

manager.register_event('Shutdown', commands.handle_Shutdown)
manager.register_event('Hangup', commands.handle_Hangup)
manager.register_event('Link', commands.handle_Link)
manager.register_event('Bridge', commands.handle_Bridge)
#manager.register_event('Dial', commands.handle_Dial)
manager.register_event('Newstate', commands.handle_Newstate)

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

