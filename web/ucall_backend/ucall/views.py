from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
from config.models import Config
from channel_message import ChannelMessage

@login_required()
def main(request):
    return render_to_response('ucall/profile.html', {'user': request.user})

@login_required()
def config_stomp(request):
    config = Config.objects.filter(section=u"stomp")
    #TODO is it possible to gzip/cache???
    return render_to_response('config/stomp.json', {'config': config}, mimetype = 'text/javascript')

@login_required()
def config_current_user(request):
    #TODO is it possible to gzip/cache???
    return render_to_response('config/current_user.json', {'user': request.user}, mimetype = 'text/javascript')

@login_required()
def config_channel_event_schema(request):
    #TODO is it possible to gzip/cache???
    message = ChannelMessage()
    return render_to_response('config/channel_event_schema.json', {'schema': message.dump_schema_json()}, mimetype = 'text/javascript')

@login_required()
def config_urls(request):
    #TODO is it possible to gzip/cache???
    return render_to_response('config/urls.json', {'user': request.user}, mimetype = 'text/javascript')

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

