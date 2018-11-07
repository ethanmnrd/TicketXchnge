# TicketXchnge [![Build Status](https://travis-ci.com/ethanmnrd/TicketXchnge.svg?branch=master)](https://travis-ci.com/ethanmnrd/TicketXchnge)

## Required Tools
- Python@3.7.0
- pipenv (version shouldn't matter): Python dependency manager
- node@8.12.0: JavaScript runtime environment
- yarn@1.10.1: JavaScript dependency manager
- mysql@8.0.13: Database

Notes
- If you're on Mac, consider using [brew](https://brew.sh/)


## Setting Up Project
```
git clone git@github.com:ethanmnrd/TicketXchnge.git
cd TicketXchnge/
pipenv install # Installs Python dependencies
yarn install # Installs JavaScript dependencies
```

## Front-end Testing
```
# In one terminal
yarn dev:wds

# In another terminal
pipenv shell # Run this within project root
cd server
python manage.py runserver --settings=project.settings.dev
```

## Back-end Testing
```
pipenv shell # run this within project root
pipenv install # to verify required modules are installed
cd server
python manage.py runserver --settings=project.settings.dev # Then go to localhost:8000 to see results (currently blank page)
```

### To run unit tests:
```
pipenv shell # run this within project root
cd server
python manage.py test # Should be 'OK'
```

### Back-end Migrations
```
pipenv shell # run this within project root
cd server
python manage.py makemigrations
python manage.py migrate
```

### admin Landing page:
```
localhost:8000/admin
```

## Creating Production Build
```
pipenv shell # Run this within project root
yarn prod:build # Should create necessary static files in `./server/frontend/static/dist/js/bundle.js`
python manage.py runserver --settings=project.settings.prod # Starts Django server. Then go go to localhost:8000 to see results
```

## Django REST API Reference
https://github.com/ethanmnrd/TicketXchnge/wiki/Django-REST-API-Reference
