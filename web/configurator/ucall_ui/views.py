from django.shortcuts import render_to_response

def main(request):
    return render_to_response('ucall_ui/main.html', {'agent': 'SIP/1113', 'username': 'Andrew Kornilov'})
