import simplejson as json

class ChannelMessage:

    EVENT_RINGING = 'rg'
    EVENT_HANGUP_CLEANUP = 'cl'
    EVENT_LINK = 'ln'
    EVENT_QUEUE_MEMBER_ADDED = 'qma'
    EVENT_QUEUE_MEMBER_REMOVED = 'qmr'
    EVENT_QUEUE_MEMBER_PAUSED = 'qmp'

    EVENT_RINGING_KEY = 'EVENT_RINGING'
    EVENT_HANGUP_CLEANUP_KEY = 'EVENT_HANGUP_CLEANUP'
    EVENT_LINK_KEY = 'EVENT_LINK'
    EVENT_QUEUE_MEMBER_ADDED_KEY = 'EVENT_QUEUE_MEMBER_ADDED'
    EVENT_QUEUE_MEMBER_REMOVED_KEY = 'EVENT_QUEUE_MEMBER_REMOVED'
    EVENT_QUEUE_MEMBER_PAUSED_KEY = 'EVENT_QUEUE_MEMBER_PAUSED'

    message = {'e': 'r', 'ex':407040, 'a':'SIP/1313', 'u':'1234'}

    (ID_KEY, CALLER_KEY, EVENT_KEY, EXTENTION_KEY) = ('i', 'c', 't', 'e')

    caller = None
    event = None
    extension = None
    agent = None
    id = None

    def dump_data_json(self):

        data = {}

        if self.caller:
    	    data[self.CALLER_KEY] = self.caller

        if self.event:
    	    data[self.EVENT_KEY] = self.event

        if self.extension:
	    data[self.EXTENTION_KEY] = self.extension

        if self.id:
    	    data[self.ID_KEY] = self.id

        return self.json_dump(data)

    def dump_schema_json(self):

        data = {
            self.EVENT_RINGING_KEY: self.EVENT_RINGING,
            self.EVENT_HANGUP_CLEANUP_KEY: self.EVENT_HANGUP_CLEANUP,
            self.EVENT_LINK_KEY: self.EVENT_LINK,
            self.EVENT_QUEUE_MEMBER_ADDED_KEY: self.EVENT_QUEUE_MEMBER_ADDED,
            self.EVENT_QUEUE_MEMBER_REMOVED_KEY: self.EVENT_QUEUE_MEMBER_REMOVED,
            self.EVENT_QUEUE_MEMBER_PAUSED_KEY: self.EVENT_QUEUE_MEMBER_PAUSED
        }

        return self.json_dump(data)

    def json_dump(self, data):
        return json.dumps(data, separators=(',',':'))


    def print_message(self):
        print json.dumps(self.message, separators=(',',':'))

    def get_caller(self):
        return self.caller

    def get_event(self):
        return self.event

    def get_extension(self):
        return self.extension

    def get_agent(self):
        return self.agent

    def get_id(self):
        return self.id

    def set_caller(self, caller):
        self.caller = caller

    def set_event(self, event):
        self.event = event

    def set_extension(self, extension):
        self.extension = extension

    def set_agent(self, agent):
        self.agent = agent

    def set_id(self, id):
        self.id = id
