from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.contrib.auth.models import User

@login_required()
def main(request):
    return render_to_response('ucall/profile.html', {'user': request.user})

@login_required()
def profile_save(request):
    if 'firstname' in request.GET:
        message = 'Your data was succesfully stored.'
    else:
        message = 'You submitted an empty form.'

    user = User.objects.get(username="igorko")
    user.first_name = request.GET['firstname']
    user.save()
    return render_to_response('ucall/profile.html', {'user': user, 'message': message})


