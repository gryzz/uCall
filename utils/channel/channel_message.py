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

    TYPE_AGENT_STATUS = "agent_status"
    TYPE_PING = "ping"
    TYPE_CHECK_CURRENT_STATUS = "check_current_status"

    (TYPE_KEY, AGENT_KEY, STATUS_KEY, ID_KEY, CALLER_KEY, EVENT_KEY, EXTENTION_KEY) = ('type', 'agent', 'statusId', 'i', 'c', 't', 'e')

    type = None
    caller = None
    event = None
    extension = None
    agent = None
    id = None
    status = None

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

    def load_data_json(self, json):
        data = self.json_load(json)

        self.set_type(data[self.TYPE_KEY])

        if data[self.TYPE_KEY] == self.TYPE_AGENT_STATUS:
            self.set_agent(data[self.AGENT_KEY])
            self.set_status(data[self.STATUS_KEY])

        return data


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

    def json_load(self, string):
        return json.loads(string)


    def print_message(self):
        print json.dumps(self.message, separators=(',',':'))

    def get_type(self):
        return self.type

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

    def get_status(self):
        return self.status_id

    def set_type(self, type):
        self.type = type

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

    def set_status(self, status_id):
        self.status_id = status_id
