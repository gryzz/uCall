#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import asterisk.manager
import sys,time

#sys.stdout = open("/var/log/requests/connector2.log","a")
#sys.stderr = open("/var/log/requests/connector-err2.log","a")

def getLocalNumber(channel):
    return channel.split('-')[0]

def handle_shutdown(event, manager):
    print "Recieved shutdown event"
    manager.close()
    # we could analize the event and reconnect here

def handle_newstate(event, manager):
    channel_state = event.get_header('State')
    channel_name = getLocalNumber(event.get_header('Channel'))

    print "%s - %s" % (event.get_header('Event'), event.headers)

    if channel_state == 'Ringing':
        print "%s - %s - %s" % (event.get_header('Event'), channel_state, channel_name)

def handle_newchannel(event, manager):
    print "%s - %s %s" % (event.get_header('Event'), event.get_header('Uniqueid'), event.headers)
      
def handle_link(event, manager):
    print "Incomming answered - %s - %s - %s" % (event.get_header('Uniqueid1'), event.get_header('CallerID1'), getLocalNumber(event.get_header('Channel2')))
    #stomp.put(event.get_header('CallerID1'), destination="/queue/"+getLocalNumber(event.get_header('Channel2')))
#    stomp.put(event.get_header('CallerID1') + ' -> ' + getLocalNumber(event.get_header('Channel2')), destination="/queue/test")

#    try:
#	curs.execute("INSERT INTO conversation (uniqueid, caller, agent) VALUES (%s,%s,%s)", (event.get_header('Uniqueid1'), event.get_header('CallerID1'), getLocalNumber(event.get_header('Channel2'))))
#    except psycopg2.IntegrityError:
#	pass
     
#    except Exception, err:
#	sys.stderr.write('ERROR: %s\n' % str(err))
         
#    conn.commit()
	
def handle_unlink(event, manager):
    print "Incomming terminated - %s - %s - %s" % (event.get_header('Uniqueid1'), event.get_header('CallerID1'), getLocalNumber(event.get_header('Channel2')))

def handle_event(event, manager):
    print event.headers

#    try:
#	curs.execute("UPDATE conversation SET terminated = now() WHERE uniqueid = %s;", (event.get_header('Uniqueid1'),))
     
#    except Exception, err:
#	sys.stderr.write('ERROR: %s\n' % str(err))

#    conn.commit()

#try:
#    conn = psycopg2.connect("dbname='asterisk' user='postgres'");
#except:
#    print "I am unable to connect to the database"
#    sys.exit()
            
#curs = conn.cursor()
    
manager = asterisk.manager.Manager()

try:
    # connect to the manager
    try:
	manager.connect('127.0.0.1') 
        manager.login('me', 'mysecret')

#        manager.register_event('Shutdown', handle_shutdown) # shutdown
#        manager.register_event('Link', handle_link)
#        manager.register_event('Unlink', handle_unlink)
#        manager.register_event('Newstate', handle_newstate)
#        manager.register_event('Newchannel', handle_newchannel)
        manager.register_event('*', handle_event)           # catch all
           
        while True: # get a status report
    	    #response = manager.status()
	    time.sleep(1)
	    
	    sys.stdout.flush()
	    sys.stderr.flush()

#	manager.message_loop()

        manager.logoff()
    except asterisk.manager.ManagerSocketException, (errno, reason):
	print "Error connecting to the manager: %s" % reason
        sys.exit(1)
    except asterisk.manager.ManagerAuthException, reason:
	print "Error logging in to the manager: %s" % reason
        sys.exit(1)
    except asterisk.manager.ManagerException, reason:
	print "Error: %s" % reason
        sys.exit(1)
          
finally:
    # remember to clean up
    manager.close()
