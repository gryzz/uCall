#!/usr/bin/python

import sys, os
import asterisk.manager
import simplejson as json
from stompy.simple import Client
import ConfigParser

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from channel.channel_message import ChannelMessage

def queue_add(manager, agent):
    cdict = {'Action':'QueueAdd'}
    cdict['Interface'] = agent
    cdict['Queue'] = 'test'
    cdict['Penalty'] = 1
    cdict['Paused'] = False

    return manager.send_action(cdict)

def queue_remove(manager, agent):
    cdict = {'Action':'QueueRemove'}
    cdict['Interface'] = agent
    cdict['Queue'] = 'test'

    return manager.send_action(cdict)

def queue_pause(manager, agent):
    cdict = {'Action':'QueuePause'}
    cdict['Interface'] = agent
    cdict['Queue'] = 'test'
    cdict['Paused'] = True

    return manager.send_action(cdict)

config = ConfigParser.ConfigParser()
devel_config = ConfigParser.ConfigParser()

config.read('/opt/ucall/etc/config.ini')
devel_config.read('/opt/ucall/etc/devel_config.ini')

stomp_host = config.get('STOMP', 'host')
stomp_username = config.get('STOMP', 'username')
stomp_password = config.get('STOMP', 'password')
stomp_queue = "/queue/ctrl"

ami_host = config.get('AMI', 'host')
ami_username = config.get('AMI', 'username')
ami_password = config.get('AMI', 'password')

stomp = Client(stomp_host)
stomp.connect(stomp_username, stomp_password)
stomp.subscribe(stomp_queue)


while True:
    message = stomp.get()

    channel_message = ChannelMessage()

    print message.body

    data = channel_message.load_data_json(message.body)

    if data['type'] == channel_message.TYPE_AGENT_STATUS:
        manager = asterisk.manager.Manager()
        manager.connect(ami_host)
        manager.login(ami_username, ami_password)

        if data['statusId'] == 'available':
            response = queue_add(manager, data['agent'])
        elif data['statusId'] == 'offline':
            response = queue_remove(manager, data['agent'])
        elif data['statusId'] == 'away':
            response = queue_pause(manager, data['agent'])

        print response.headers['Message']

        manager.logoff()
    elif data['type'] == channel_message.TYPE_PING:
        print "ping-pong!"


