from .base import *
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
DEBUG = True # @TODO: Temp fix because of serving static production files. https://docs.djangoproject.com/en/2.1/howto/static-files/
WEBPACK_DEV_SERVER = False