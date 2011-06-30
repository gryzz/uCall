from crm.models import CrmCustomerNumber
from crm.models import CrmAdapterOption
from crm.adapters.vtiger import VtigerAdapter
import pprint

class CrmGateway:

    def retrieveCrmAdapter(self, extention):
        #TODO: phone_number=extention fix it
        crm_customer_number = CrmCustomerNumber.objects.get(phone_number=extention)

        if crm_customer_number:
            crm_adapter_options = CrmAdapterOption.objects.filter(adapter=crm_customer_number.crm_adapter)

            crm_adapter_parameters = {}
            for option in crm_adapter_options:
                crm_adapter_parameters[option.key] = option.value

            type = crm_customer_number.crm_adapter.type

            if type.title == 'VTiger':
                crm_adapter = VtigerAdapter(crm_adapter_parameters)

                return crm_adapter

            elif type is 'Django CRM':
                pass

            else:
    	        #TODO rise exception
    	        pass
        else:
			#TODO rise exception
			pass
