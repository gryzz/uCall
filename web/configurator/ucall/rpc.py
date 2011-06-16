#rpc.py
from utils.extjs import RpcRouter
from django.contrib.auth.models import User
import traceback

class MainApiClass(object):

    def getBasicInfo(self, request):
        return {
            "success":"true",
            "data": {"firstname": request.user.first_name, "lastname":request.user.last_name, "email":request.user.email}
        }

    getBasicInfo._args_len = 0

    def updateBasicInfo(self, fake, request):
        #TODO: WTF? Why do we need take it from DB?
         user = User.objects.get(username=request.user.username)
         user.first_name = request.POST['firstname']
         user.last_name = request.POST['lastname']
         user.email = request.POST['email']
         user.save()
         return {
            "errors":{"email":"already taken"},
            "success":"false"
         }

    #{"errors":{"email":"already taken"},"success":false,"debug_formPacket":{"extTID":"6","extAction":"Profile","extMethod":"updateBasicInfo","extType":"rpc","extUpload":"false","foo":"bar","uid":"34","name":"Aaron Conran","email":"aaron@sencha.com","company":"Sencha Inc."}

    updateBasicInfo._args_len = 1
    updateBasicInfo._form_handler = True


class Router(RpcRouter):


    def __init__(self):

        self.url = 'router'

        self.actions = {
            'Profile': MainApiClass()
        }

        self.enable_buffer = 50
