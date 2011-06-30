import abc

class AbstractAdapter:
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def findUserByPhone(self, phone_number):
        """Find user in CRM by phone number"""
        pass
