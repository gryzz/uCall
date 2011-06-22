import simplejson as json

class ChannelMessage:

    EVENT_RINGING = 'ringing'
    EVENT_HANGUP_CLEANUP = 'cleanup'
    EVENT_LINK = 'link'

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

        return json.dumps(data, separators=(',',':'))

    def  form_json_schema(self):
        data = (
            self.CALLER_KEY,
            self.EVENT_KEY,
            self.EXTENTION_KEY,
            self.ID_KEY
        )

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
