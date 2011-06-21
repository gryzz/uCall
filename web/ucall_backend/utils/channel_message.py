import simplejson as json

class ChannelMessage:
    message = {'e': 'r', 'ex':407040, 'a':'SIP/1313', 'u':'1234'}
    (USER_KEY, EVENT_KEY, EXTENTION_KEY, AGENT_KEY) = ('u', 'e', 'ex', 'a')

    user = None
    event = None
    extention = None
    agent = None


    def form_json_data(self):
        data = {
            self.USER_KEY: self.user,
            self.EVENT_KEY: self.event,
            self.EXTENTION_KEY: self.extention,
            self.AGENT_KEY:  self.agent
        }

        return json.dumps(data, separators=(',',':'))

    def  form_json_schema(self):
        data = {
            self.USER_KEY,
            self.EVENT_KEY,
            self.EXTENTION_KEY,
            self.AGENT_KEY
        }

        return json.dumps(data, separators=(','))


    def print_message(self):
        print json.dumps(self.message, separators=(',',':'))

    def get_user(self):
        return self.user

    def get_event(self):
        return self.event

    def get_extention(self):
        return self.extention

    def get_agent(self):
        return self.agent

    def set_user(self, user):
        self.user = user

    def set_event(self, event):
        self.event = event

    def set_extention(self, extention):
        self.extention = extention

    def set_agent(self, agent):
        self.agent = agent
