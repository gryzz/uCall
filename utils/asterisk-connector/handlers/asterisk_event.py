from sqlobject import *

class AsteriskEvent(SQLObject):
    added = DateTimeCol(default = sqlbuilder.func.NOW())
    event = StringCol()
    uniqueid = StringCol(default = None)
    raw = StringCol(default = None)
