from asterisk_event import AsteriskEvent
from asterisk_command_handler import AsteriskCommandHandler
from command_constants import Asterisk10
from channel.channel_message import ChannelMessage

from handler_utils import check_event
from handler_utils import send_message
from handler_utils import get_local_number


class Asterisk10CommandHandler(AsteriskCommandHandler):
    """Concrete command handler for Asterisk Call Manager/1.0 protocol"""
    
    @check_event
    def handle_Dial(self, event, manager):
        """
        {'CallerID': '1133', 'SrcUniqueID': '1306919118.7245', 'Destination': 'SIP/214-19bceeb0', 'DestUniqueID': '1306919118.7246', 'Source': 'SIP/1133-19ba80e0', 'CallerIDName': 'tamila', 'Privilege': 'call,all', 'Event': 'Dial'}
        """
        
        AsteriskEvent(event = event[Asterisk10.HEADER_EVENT], raw = str(event), uniqueid = event[Asterisk10.HEADER_DESTUNIQUEID])

    @check_event
    def handle_Link(self, event, manager):
        """
        {'Uniqueid2': '1306914758.6999', 'Uniqueid1': '1306914726.6994', 'Channel1': 'SIP/430913-19be0080', 'Channel2': 'SIP/1313-19ba26d0', 'CallerID2': '380352407040', 'Privilege': 'call,all', 'CallerID1': '430913', 'Event': 'Link'}
        """

        message = ChannelMessage()

        message.set_event(ChannelMessage.EVENT_LINK)
        message.set_id(event[Asterisk10.HEADER_UNIQUEID1])
        message.set_extension(event[Asterisk10.HEADER_CALLERID1])
        message.set_caller(event[Asterisk10.HEADER_CALLERID2])

        send_message(manager.destination, message.dump_data_json(), get_local_number(event[Asterisk10.HEADER_CHANNEL1]))

    @check_event
    def handle_QueueMemberAdded(self, event, manager):
        location = event[Asterisk10.HEADER_LOCATION]

        if location == None:
            return None

        message = ChannelMessage()
        message.set_event(ChannelMessage.EVENT_QUEUE_MEMBER_ADDED)
        send_message(manager.destination, message.dump_data_json(), get_local_number(location))

    def handle_Shutdown(self, event, manager):
        print AsteriskCommandHandler.SHUTDOWN_MESSAGE
        manager.close()

    def _handle_newstate_ringing(self, event, destination):
        channel = event[Asterisk10.HEADER_CHANNEL]

        if channel == None:
            return None

        message = ChannelMessage()

        message.set_event(ChannelMessage.EVENT_RINGING)
        message.set_id(event[Asterisk10.HEADER_UNIQUEID])

        try:
            parent_event = AsteriskEvent.selectBy(event = Asterisk10.EVENT_DIAL, uniqueid = event[Asterisk10.HEADER_UNIQUEID])[0]
        except Exception as e:
            parent_event = None

        if parent_event != None:
            raw = eval(parent_event.raw)
        else:
            raw = None

        if raw != None:
            caller = raw[Asterisk10.HEADER_CALLERID]
        else:
            caller = AsteriskCommandHandler.CALLERID_UNKNOWN

        extension = event[Asterisk10.HEADER_CALLERID]

        message.set_extension(extension)
        message.set_caller(caller)

        send_message(destination, message.dump_data_json(), get_local_number(channel))

    def _handle_hangup_clearing(self, event, destination):
        channel = event[Asterisk10.HEADER_CHANNEL]

        if channel == None:
            return None

        message = ChannelMessage()

        message.set_event(ChannelMessage.EVENT_HANGUP_CLEANUP)
        message.set_id(event[Asterisk10.HEADER_UNIQUEID])

        send_message(destination, message.dump_data_json(), get_local_number(channel))

    def _is_hangup_clearing(self, event):
        # TODO: Ignore hangup cause for now
        # if event[Asterisk10.HEADER_CAUSE] == Asterisk10.CAUSE_NORMAL_CLEARING:
        return True
            
        # return False

    def _is_newstate_ringing(self, event):
        if event[Asterisk10.HEADER_STATE] == Asterisk10.STATE_RINGING:
            return True
        
        return False
