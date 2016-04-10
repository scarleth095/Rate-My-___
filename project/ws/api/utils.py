from dateutil import tz, relativedelta
import datetime

def request_args_with_list(request_args):
    """
    need to do this to pull lists out of request.args otherwise only 1 list object will be parsed from the request
    http://192.168.59.103/api/threats?count=10&page=1&tags=HTML&tags=Spotfire would only be evaluated to one tag
    argument LINK: http://stackoverflow.com/questions/7940085/getting-the-array-of-get-params-in-python
    """
    full_request = {}
    for key in request_args.keys():
        value_as_list = request_args.getlist(key)
        if len(value_as_list) > 1:
            full_request[key] = value_as_list
        else:
            full_request[key] = value_as_list[0]
    return full_request

def time_now():
    """
    return utc time now
    """
    return datetime.datetime.utcnow().replace(tzinfo=tz.tzutc())

def today():
    return time_now().replace(hour=0, minute=0, second=0, microsecond=0)

def tomorrow():
    return today() + relativedelta.relativedelta(days=1)

def this_month():
    return today().replace(day=1)

def next_month():
    return this_month() + relativedelta.relativedelta(months=1)

