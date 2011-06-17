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

    #TODO:refactor this
    def updateBasicInfo(self, fake, request):
        if not self._ifEmailIsBusy(request):
            change_password = False
            if 'password' in request.POST and request.POST['password'] :
                if request.POST['password'] != request.POST['password_confirmation']:
                    return {
                        "errors":{
                            "password": "Password and confirmation are not equal",
                            "password_confirmation": "Password and confirmation are not equal"
                        },
                        "success":False
                    }
                else:
                    change_password = True

            #TODO: WTF? Why do we need take it from DB?
            user = User.objects.get(username=request.user.username)
            user.first_name = request.POST['firstname']
            user.last_name = request.POST['lastname']
            user.email = request.POST['email']
            if change_password is True:
                user.set_password(request.POST['password'])

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
