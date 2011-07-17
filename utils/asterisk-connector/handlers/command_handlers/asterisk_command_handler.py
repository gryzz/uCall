import abc
from command_handler import CommandHandler
from command_constants import Asterisk
from channel.channel_message import ChannelMessage

from handler_utils import check_event
from handler_utils import send_message
from handler_utils import get_local_number

class AsteriskCommandHandler(CommandHandler):
    """Abstract asterisk command handler"""
    __metaclass__ = abc.ABCMeta

    PAUSED_FLAG = 1

    @abc.abstractmethod
    def _handle_newstate_ringing(self, event, destination):
        pass

    @abc.abstractmethod
    def _handle_hangup_clearing(self, event, destination):
        pass

    @abc.abstractmethod
    def _is_hangup_clearing(self, event):
        pass

    @abc.abstractmethod
    def _is_newstate_ringing(self, event):
        pass

    def handle_Dial(self, event, manager):
        """Default implementation"""
        pass

    def handle_Bridge(self, event, manager):
        """Default implementation. Used in Asterisk 1.1"""
        pass

    def handle_Link(self, event, manager):
        """Default implementation. Used in Asterisk 1.0"""
        pass

    @check_event
    def handle_Hangup(self, event, manager):
        if self._is_hangup_clearing(event):
            return self._handle_hangup_clearing(event, manager.destination)

        return None

    @check_event
    def handle_Newstate(self, event, manager):

        if self._is_newstate_ringing(event):
            return self._handle_newstate_ringing(event, manager.destination)

        return None

    @check_event
    def handle_QueueMemberAdded(self, event, manager):
        location = event[Asterisk.HEADER_LOCATION]

        if location == None:
            return None

        message = ChannelMessage()
        message.set_event(ChannelMessage.EVENT_QUEUE_MEMBER_ADDED)
        send_message(manager.destination, message.dump_data_json(), get_local_number(location))

    @check_event
    def handle_QueueMemberRemoved(self, event, manager):
        location = event[Asterisk.HEADER_LOCATION]

        if location == None:
            return None

        message = ChannelMessage()
        message.set_event(ChannelMessage.EVENT_QUEUE_MEMBER_REMOVED)
        send_message(manager.destination, message.dump_data_json(), get_local_number(location))

    @check_event
    def handle_QueueMemberPaused(self, event, manager):
        location = event[Asterisk.HEADER_LOCATION]

        if location == None:
            return None

        message = ChannelMessage()
        message.set_event(ChannelMessage.EVENT_QUEUE_MEMBER_PAUSED)
        send_message(manager.destination, message.dump_data_json(), get_local_number(location))

    @check_event
    def handle_QueueMember(self, event, manager):
        location = event[Asterisk.HEADER_LOCATION]

        if location == None:
            return None

        if int(event['Paused']) == self.PAUSED_FLAG:
            self.handle_QueueMemberPaused(event, manager)
        else:
            self.handle_QueueMemberAdded(event, manager)

