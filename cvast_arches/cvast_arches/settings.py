"""
Django settings for cvast_arches project.
"""

import os
import arches
import inspect

try:
    from arches.settings import *
except ImportError:
    pass

APP_ROOT = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
STATICFILES_DIRS =  (os.path.join(APP_ROOT, 'media'),) + STATICFILES_DIRS

FUNCTION_TEMPLATES = os.path.join(APP_ROOT, 'functions', 'templates')
PROJECT_TEMPLATES = os.path.join(APP_ROOT, 'templates')
TEMPLATES[0]['DIRS'].append(FUNCTION_TEMPLATES)
TEMPLATES[0]['DIRS'].insert(0, PROJECT_TEMPLATES)
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '5xp6px1(3zu@de!cyw_(&l*l!zaha#a5&$3g$xk6#&0)5eri!$'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

ROOT_URLCONF = 'cvast_arches.urls'
WSGI_APPLICATION = 'cvast_arches.wsgi.application'
STATIC_ROOT = '/var/www/media'

# ROOT_DIR = ''
# PACKAGE_NAME = ''
# SEARCH_BACKEND = ''

# DATABASES = {
#    'default': {
#        'ENGINE': 'django.contrib.gis.db.backends.postgis',
#        'NAME': 'arches',
#        'USER': 'postgres',
#        'PASSWORD': 'postgis',
#        'HOST': 'localhost',
#        'PORT': '5432',
#        'POSTGIS_TEMPLATE': 'template_postgis_20',
#    }
#}

# ELASTICSEARCH_HTTP_PORT = 9200 # this should be in increments of 200, eg: 9400, 9600, 9800
# SEARCH_BACKEND = 'arches.app.search.search.SearchEngine'
# # see http://elasticsearch-py.readthedocs.org/en/master/api.html#elasticsearch.Elasticsearch
# ELASTICSEARCH_HOSTS = [
#     {'host': 'localhost', 'port': ELASTICSEARCH_HTTP_PORT}
# ]
# ELASTICSEARCH_CONNECTION_OPTIONS = {'timeout': 30}


# SEARCH_ITEMS_PER_PAGE = 5
# SEARCH_EXPORT_ITEMS_PER_PAGE = 100000
# SEARCH_DROPDOWN_LENGTH = 100
# WORDS_PER_SEARCH_TERM = 10 # set to None for unlimited number of words allowed for search terms

# ONTOLOGY_PATH = os.path.join(ROOT_DIR, 'db', 'ontologies', 'cidoc_crm')
# ONTOLOGY_BASE = 'cidoc_crm_v6.2.xml'
# ONTOLOGY_BASE_VERSION = '6.2'
# ONTOLOGY_BASE_NAME = 'CIDOC CRM v6.2'
# ONTOLOGY_BASE_ID = 'e6e8db47-2ccf-11e6-927e-b8f6b115d7dd'
# ONTOLOGY_EXT = [
#     'CRMsci_v1.2.3.rdfs.xml',
#     'CRMarchaeo_v1.4.rdfs.xml',
#     'CRMgeo_v1.2.rdfs.xml',
#     'CRMdig_v3.2.1.rdfs.xml',
#     'CRMinf_v0.7.rdfs.xml'
# ]


# ADMINS = (
    # ('Your Name', 'your_email@example.com'),
# )
# MANAGERS = ADMINS

# DATA_VALIDATION_BBOX = [(-180,-90), (-180,90), (180,90), (180,-90), (-180,-90)]
# Bounding box for geometry data validation. By default set to coordinate system bounding box.
# NOTE: This is not used by the front end of the application.

RESOURCE_GRAPH_LOCATIONS = (
    # Put strings here, like "/home/data/resource_graphs" or "C:/data/resource_graphs".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(APP_ROOT, 'db', 'graphs', 'branches'),
    os.path.join(APP_ROOT, 'db', 'graphs', 'resource_models'),
)

# BUSINESS_DATA_FILES = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
#)

# If you are manually managing your resource tile cache, you may want to "seed"
# the cache (or prerender some tiles) for low zoom levels.  You can do this by
# running:
# python manage.py packages -o seed_resource_tile_cache

# The following settings control the extent and max zoom level to which tiles
# will be seeded.  Be aware, seeding tiles at high zoom levels (more zoomed in)
# will take a long time

# CACHE_SEED_BOUNDS = (-89.99, 179.99, 89.99, -179.99)
# CACHE_SEED_MAX_ZOOM = 5

# configure where the tileserver should store its cache

# TILE_CACHE_CONFIG = {
#     "name": "Disk",
#     "path": os.path.join(ROOT_DIR, 'tileserver', 'cache')

    #  to reconfigure to use S3 (recommended for production), use the following
    #  template:

    #  "name": "S3",
    #  "bucket": "<bucket name>",
    #  "access": "<access key>",
    #  "secret": "<secret key>"
#}

# MAPBOX_API_KEY = '' # Put your Mapbox key here!

# links to sprites and glyphs for use on map
# MAPBOX_SPRITES = "mapbox://sprites/mapbox/basic-v9"
# MAPBOX_GLYPHS = "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"

# Default map settings for search and map layer manager pages
# DEFAULT_MAP_X = 0
# DEFAULT_MAP_Y = 0
# DEFAULT_MAP_ZOOM = 0
# MAP_MIN_ZOOM = 0
# MAP_MAX_ZOOM = 20
# DEFAULT_SEARCH_GEOCODER = "MapzenGeocoder"

# bounds for search results hex binning fabric
# a smaller bbox will give you less distortion in hexes and better performance
# HEX_BIN_BOUNDS = (-122, -52, 128, 69)

# size to use for hex binning search results on map (in km)
# HEX_BIN_SIZE = 100

# binning uses elasticsearch GeoHash grid aggregation.
# precision for binning is set based on GeoHash precision, see this table:
# https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html#_cell_dimensions_at_the_equator
# high precision binning may result in performance issues.
# HEX_BIN_PRECISION = 4

# BULK_IMPORT_BATCH_SIZE = 2000

try:
    from settings_local import *
except ImportError:
    pass