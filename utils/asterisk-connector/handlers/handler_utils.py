def send_message(stomp, message, agent):
    print '='*80
    print 'Agent:', agent 
    print 'Message:', message 
    print '='*80

    conf = {}
    #TODO: add message expiration
    #conf={"expires":(int(time()) + int(connect(config.get('GENERAL', 'message_ttl'))) * 1000}  
    stomp.put(message, destination=stomp.agent_channel + agent, persistent=False, conf=conf)

def get_local_number(channel):
    return channel.split('-')[0]

def check_event(f):
    """Decorator to check wether even is a dict or object"""

    def wrap_f(*args, **kwargs):
        event = None

        if 'event' in kwargs:
            event = kwargs['event']
        elif len(args) > 1:
            event = args[1]

        if event != None and not isinstance(event, dict):
            event = event.headers

        if 'event' in kwargs:
            kwargs['event'] = event
        elif len(args) > 1:
            arglist = list(args)
            arglist[1] = event
            args = tuple(arglist)

        f(*args, **kwargs)

    return wrap_f
