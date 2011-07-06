import abc
from command_handler import CommandHandler
from handler_utils import check_event

class AsteriskCommandHandler(CommandHandler):
    """Abstract asterisk command handler"""
    __metaclass__ = abc.ABCMeta
    
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

