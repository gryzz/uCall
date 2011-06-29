#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

import sys,os,time
import ConfigParser

#sys.stdout = open("/var/log/requests/connector2.log","a")
#sys.stderr = open("/var/log/requests/connector-err2.log","a")

config = ConfigParser.ConfigParser()
config.read('/opt/ucall/etc/config.ini')

sql_dsn = config.get('SQL', 'dsn')

print '='*80
print 'SQL:', sql_dsn 
print '='*80

