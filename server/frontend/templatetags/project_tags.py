import requests
from django import template
from django.conf import settings

register = template.Library()

@register.inclusion_tag('partials/webpack.html')
def webpack(bundle):
    """
    NOTE: the webpack-dev-server host and port are hard-coded here and you
    should probably make this available via a setting.
    Also, I'm using the requests library but you can also use urllib of course.
    """
    use_dev_server = False
    print(settings.WEBPACK_DEV_SERVER)
    if settings.WEBPACK_DEV_SERVER:
        try:
            request = requests.get(
                'http://localhost:7000/dist/js/{}'.format(bundle)
            )
            if request.status_code == 200:
                use_dev_server = True
        except requests.ConnectionError:
            pass

    return {
        'bundle': bundle,
        'use_dev_server': use_dev_server,
    }