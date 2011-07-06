from command_handlers import Asterisk10CommandHandler
from command_handlers import Asterisk11CommandHandler
from command_constants import Protocol

class CommandHandlerFactory:
    """Command handler factory"""
    
    commandProtocol = None  #: Command protocol

    def __init__(self, commandProtocol):
        self.commandProtocol = commandProtocol
        
    def create_command_handler(self):
        """Create concrete command handler based on command protocol"""
        
        if self.commandProtocol == Protocol.ASTERISK_1_0:
            return Asterisk10CommandHandler()
        elif self.commandProtocol == Protocol.ASTERISK_1_1:
            return Asterisk11CommandHandler()
