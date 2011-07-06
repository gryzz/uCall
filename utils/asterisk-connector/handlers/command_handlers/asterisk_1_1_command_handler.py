from asterisk_event import AsteriskEvent
from asterisk_command_handler import AsteriskCommandHandler
from command_constants import Asterisk11
from channel.channel_message import ChannelMessage


from handler_utils import check_event
from handler_utils import send_message
from handler_utils import get_local_number


class Asterisk11CommandHandler(AsteriskCommandHandler):
    """Concrete command handler for Asterisk Call Manager/1.1 protocol"""

    @check_event
    def handle_Dial(self, event, manager):
        """
        Event: Dial
        Privilege: call,all
        SubEvent: Begin
        Channel: SIP/104-000000d4
        Destination: SIP/104-000000d5
        CallerIDNum: 104
        CallerIDName: 104
        UniqueID: 1309518189.212
        DestUniqueID: 1309518189.213
        Dialstring: 104
        """
        
        if event[Asterisk11.HEADER_SUBEVENT] == Asterisk11.SUBEVENT_BEGIN:
            AsteriskEvent(event = event[Asterisk11.HEADER_EVENT], raw = str(event), uniqueid = event[Asterisk11.HEADER_DESTUNIQUEID])

    @check_event
    def handle_Bridge(self, event, manager):
        """
        Event: Bridge                                                                                                                                                                                   
        Privilege: call,all                                                                                                                                                                             
        Bridgestate: Link                                                                                                                                                                               
        Bridgetype: core                                                                                                                                                                                
        Channel1: SIP/101-00000058                                                                                                                                                                      
        Channel2: SIP/104-00000059                                                                                                                                                                      
        Uniqueid1: 1309443548.88                                                                                                                                                                        
        Uniqueid2: 1309443548.89                                                                                                                                                                        
        CallerID1: 101                                                                                                                                                                                  
        CallerID2: 104

        {'Uniqueid2': '1309506586.133', 'Uniqueid1': '1309506586.132', 'CallerID2': '104', 'Bridgestate': 'Link', 'CallerID1': '101', 'Channel2': 'SIP/104-00000085', 'Channel1': 'SIP/101-00000084', 'Bridgetype': 'core', 'Privilege': 'call,all', 'Event': 'Bridge'}

        """

        message = ChannelMessage()

        message.set_event(ChannelMessage.EVENT_LINK)
        message.set_id(event[Asterisk11.HEADER_UNIQUEID2])
        message.set_extension(event[Asterisk11.HEADER_CALLERID2])
        message.set_caller(event[Asterisk11.HEADER_CALLERID1])

        send_message(manager.destination, message.dump_data_json(), get_local_number(event[Asterisk11.HEADER_CHANNEL2]))


    def handle_Shutdown(self, event, manager):
        print AsteriskCommandHandler.SHUTDOWN_MESSAGE
        manager.close()

    def _handle_newstate_ringing(self, event, destination):
        print "handle_newstate_ringing"
        channel = event[Asterisk11.HEADER_CHANNEL]

        if channel == None:
            return None

        message = ChannelMessage()

        message.set_event(ChannelMessage.EVENT_RINGING)
        message.set_id(event[Asterisk11.HEADER_UNIQUEID])

        try:
            parent_event = AsteriskEvent.selectBy(event = Asterisk11.EVENT_DIAL, uniqueid = event[Asterisk11.HEADER_UNIQUEID])[0]
        except Exception as e:
            print e
            parent_event = None

        if parent_event != None:
            raw = eval(parent_event.raw)
        else:
            raw = None

        if raw != None:
            caller = raw[Asterisk11.HEADER_CALLERIDNUM]
            extension = event[Asterisk11.HEADER_CALLERIDNUM]
        else:
            caller = AsteriskCommandHandler.CALLERID_UNKNOWN
            extension = AsteriskCommandHandler.CALLERID_UNKNOWN

        message.set_extension(extension)
        message.set_caller(caller)

        send_message(destination, message.dump_data_json(), get_local_number(channel))

    def _handle_hangup_clearing(self, event, destination):
        print "handle_hangup_clearing"
        channel = event[Asterisk11.HEADER_CHANNEL]

        if channel == None:
            return None

        message = ChannelMessage()

        message.set_event(ChannelMessage.EVENT_HANGUP_CLEANUP)
        message.set_id(event[Asterisk11.HEADER_UNIQUEID])

        send_message(destination, message.dump_data_json(), get_local_number(channel))


    def _is_hangup_clearing(self, event):
        # TODO: Ignore hangup cause for now
        # if event[Asterisk10.HEADER_CAUSE] == Asterisk10.CAUSE_NORMAL_CLEARING:
        return True
            
        # return False

    def _is_newstate_ringing(self, event):
        if event[Asterisk11.HEADER_CHANNEL_STATE_DESC] == Asterisk11.STATE_RINGING:
            return True

        return False
