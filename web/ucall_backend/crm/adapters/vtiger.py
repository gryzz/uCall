import MySQLdb

class VtigerAdapter:
    db = None

    def __init__(self, params):
        self.db = MySQLdb.connect(host=params['db_host'], user=params['db_user'], passwd=params['db_password'], db=params['db_name'])

    def findUserByPhone(self, phone_number):
        cursor = self.db.cursor();

        cursor.execute("select firstname, lastname, title from vtiger_contactdetails where phone=%s", phone_number)
        data = cursor.fetchone()
        cursor.close()

        #TODO: Fix it
        result = {'firstname': data[0], 'lastname': data[1], 'title': data[2]}

        return result
