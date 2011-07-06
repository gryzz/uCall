import abc

class CommandHandler:
    """Abstract command handler"""
    __metaclass__ = abc.ABCMeta
    
    SHUTDOWN_MESSAGE = "Recieved shutdown event"
    CALLERID_UNKNOWN = "unknown"
    
    @abc.abstractmethod
    def handle_Dial(self, event, manager):
        pass

    @abc.abstractmethod
    def handle_Hangup(self, event, manager):
        pass
        
    @abc.abstractmethod
    def handle_Link(self, event, manager):
        pass

    @abc.abstractmethod
    def handle_Bridge(self, event, manager):
        pass

    @abc.abstractmethod
    def handle_QueueMemberAdded(self, event, manager):
        pass

    @abc.abstractmethod
    def handle_Newstate(self, event, manager):
        pass

    @abc.abstractmethod
    def handle_Shutdown(self, event, manager):
        pass
