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
        if not self._ifEmailIsBusy(request):
            #TODO: WTF? Why do we need take it from DB?
            user = User.objects.get(username=request.user.username)
            user.first_name = request.POST['firstname']
            user.last_name = request.POST['lastname']
            user.email = request.POST['email']
            user.save()
            return {
                "success":True
            }
        else:
            return {
                "errors":{"email": "Email already exists"},
                "success":False
            }

    updateBasicInfo._args_len = 1
    updateBasicInfo._form_handler = True

    def  _ifEmailIsBusy(self, request):
        users = User.objects.filter(email=request.POST['email'])
        if users is None:
            return False
        else:
            for user in users :
                if user.username != request.user.username:
                    return True

            return False




class Router(RpcRouter):


    def __init__(self):

        self.url = 'router'

        self.actions = {
            'Profile': MainApiClass()
        }

        self.enable_buffer = 50
