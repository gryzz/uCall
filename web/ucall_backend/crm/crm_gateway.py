from crm.models import CrmCustomerNumber
from crm.models import CrmAdapterOption
from crm.adapters.vtiger import VtigerAdapter
import pprint

class CrmGateway:
    VTIGER_CRM = 'VTiger'
    DJANGO_CRM = 'Django CRM'

    def retrieveCrmAdapter(self, extention):
        #TODO: phone_number=extention fix it
        crm_customer_number = CrmCustomerNumber.objects.get(phone_number=extention)

        if crm_customer_number is None:
            raise Exception('Extention is not recognized')

        crm_adapter_options = CrmAdapterOption.objects.filter(adapter=crm_customer_number.crm_adapter)

        crm_adapter_parameters = {}
        for option in crm_adapter_options:
            crm_adapter_parameters[option.key] = option.value

        type = crm_customer_number.crm_adapter.type

        if type.title == self.VTIGER_CRM:
            crm_adapter = VtigerAdapter(crm_adapter_parameters)

            return crm_adapter

        elif type.title == self.DJANGO_CRM:
            pass

        else:
	        raise Exception('CRM adapter not found')
