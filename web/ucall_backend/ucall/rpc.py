#rpc.py
from utils.extjs import RpcRouter
from django.contrib.auth.models import User
import traceback

from utils.extjs_form_encoder import ExtJSONEncoder
from formunculous.models import ApplicationDefinition, Application
from formunculous.forms import ApplicationForm
from crm.models import CrmCustomerNumber

class FormsApiClass(object):

    def getForm(self, data, request):

        # get extension from input data
        customer = CrmCustomerNumber.objects.get(phone_number = data['id'])

        # retrieve required data
        application_definition = customer.dialog_form
        application = Application(app_definition = application_definition, user = request.user)
        application_form = ApplicationForm(application_definition, application)

        # remove pk and Company fields from form
        del application_form.fields["pk"]
        del application_form.fields["company"]

        # return extjs-encoded form
        return {
            'id': application_definition.id,
            'slug': application_definition.slug,
            'application_form': ExtJSONEncoder().default(application_form)
        }

    getForm._args_len = 1

    def saveForm(self, fake, request):
        if 'application_definition_id' in request.POST and request.POST['application_definition_id']:
            application_definition = ApplicationDefinition.objects.get(id = request.POST['application_definition_id'])
            user = request.user
            application = Application(app_definition = application_definition, user = user)

            form = ApplicationForm(application_definition, application, False, request.POST, request.FILES)

            if not (form.is_valid() and form.check_required()):
                return {
                    "errors": form.errors,
                    "success": False
                }
            else:
                form.save()

                return {
                    "success": True
                }

    saveForm._args_len = 1
    saveForm._form_handler = True




class ProfileApiClass(object):

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

            user = request.user
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
            'Profile': ProfileApiClass(),
            'Forms': FormsApiClass(),
        }

        self.enable_buffer = 50
