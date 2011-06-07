from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response

@login_required()
def main(request):
    return render_to_response('ucall_ui/main.html', {'agent': 'SIP/1113', 'username': 'Andrew Kornilov'})
