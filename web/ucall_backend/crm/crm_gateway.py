from crm.models import CrmCustomerNumber
from crm.models import CrmAdapterOption
from crm.adapters.vtiger import VtigerAdapter
import pprint

class CrmGateway:
    crm_adapter = None
    crm_adapter_parameters = {}

    def  __init__(self, extention):
        #TODO: phone_number=extention fix it
        crm_customer_number = CrmCustomerNumber.objects.get(phone_number=extention)
        crm_adapter_options = CrmAdapterOption.objects.filter(adapter=crm_customer_number.crm_adapter)

        for option in crm_adapter_options:
            self.crm_adapter_parameters[option.key] = option.value

        type = crm_customer_number.crm_adapter.type


        if type.title == 'VTiger':
            self.crm_adapter = VtigerAdapter(self.crm_adapter_parameters)

        elif type is 'Django CRM':
            pass
            
        else:
    	    #TODO rise exception
    	    pass



    def findUserByPhoneNumber(self, phone_number):

        self.crm_adapter.findUserByPhone(phone_number)
