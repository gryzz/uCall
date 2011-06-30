#!/usr/bin/env python
# vim: set expandtab shiftwidth=4:
# http://www.voip-info.org/wiki/view/asterisk+manager+events

from sqlobject import *
import ConfigParser

config = ConfigParser.ConfigParser()
config.read('/opt/ucall/etc/config.ini')

class AsteriskEvent(SQLObject):
    added=DateTimeCol(default=sqlbuilder.func.NOW())
    event = StringCol()
    uniqueid = StringCol(default=None)
    raw = StringCol(default=None)

connection = connectionForURI(config.get('SQL', 'dsn'))
sqlhub.processConnection = connection

AsteriskEvent.createTable()
