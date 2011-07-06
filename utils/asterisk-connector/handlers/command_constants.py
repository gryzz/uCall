class Protocol:
    """Command protocol constants"""
    
    ASTERISK_1_0 = "Asterisk Call Manager/1.0"
    ASTERISK_1_1 = "Asterisk Call Manager/1.1"

class Asterisk:
    HEADER_CAUSE = "Cause-txt"
    HEADER_EVENT = "Event"
    HEADER_SUBEVENT = "SubEvent"
    HEADER_DESTUNIQUEID = "DestUniqueID"
    HEADER_UNIQUEID = "Uniqueid"
    HEADER_UNIQUEID1 = "Uniqueid1"
    HEADER_UNIQUEID2 = "Uniqueid2"
    HEADER_CALLERID = "CallerID"
    HEADER_CALLERID1 = "CallerID1"
    HEADER_CALLERID2 = "CallerID2"
    HEADER_CHANNEL = "Channel"
    HEADER_CHANNEL1 = "Channel1"
    HEADER_CHANNEL2 = "Channel2"
    
    CAUSE_NORMAL_CLEARING = "Normal Clearing"
    STATE_RINGING = "Ringing"

    EVENT_NEWSTATE = "Newstate"
    EVENT_DIAL = "Dial"
    SUBEVENT_BEGIN = "Begin"
    
class Asterisk10(Asterisk):
    HEADER_STATE = "State"
    
class Asterisk11(Asterisk):
    HEADER_CHANNEL_STATE_DESC = "ChannelStateDesc"
    HEADER_CALLERIDNUM = "CallerIDNum"
