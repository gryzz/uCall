#rpc.py
from utils.extjs import RpcRouter

class MainApiClass(object):

    def getBasicInfo(self, id, email, user):
        return {
            "foo":"bar","name":"Aaron Conran","company":"Sencha Inc.","email":"aaron@sencha.com"
        }

    getBasicInfo._args_len = 2

    def updateBasicInfo(self, user):
        return {
            'msg': 'Cool!!'
        }

    updateBasicInfo._args_len = 0


class Router(RpcRouter):


    def __init__(self):

        self.url = 'router'

        self.actions = {
            'Profile': MainApiClass()
        }

        self.enable_buffer = 50
