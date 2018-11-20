# TicketXchnge [![Build Status](https://travis-ci.com/ethanmnrd/TicketXchnge.svg?branch=master)](https://travis-ci.com/ethanmnrd/TicketXchnge)

## About
This project was made by students for the purpose of a software engineering class. It is a Ticketmaster clone enhanced with the ability to deliver items via Uber.

## Running The Project

### 0) Installing the Required Tools
- Python@3.7.0
- pipenv (version shouldn't matter): Python dependency manager
- node@8.12.0: JavaScript runtime environment
- yarn@1.10.1: JavaScript dependency manager
- mysql@8.0.13: Database

Notes
- If you're on Mac, consider installing dependencies using [brew](https://brew.sh/)

### 1) Clone and Install Node and Python Dependencies
```
git clone git@github.com:ethanmnrd/TicketXchnge.git
cd TicketXchnge/
pipenv install # Installs Python dependencies
yarn install # Installs JavaScript dependencies
```

### 2) Set Environment Variables Variables (Follow `.env.example`s)
```
# In newly created file at ./server/project/.env (Used for back-end)
SECRETKEY= # Random string Django uses for encryption
DBNAME= # Name of MySQL database containing Django model contents
DBUSER= # Username to access MySQL database
DBPW= # Password for above user
DBHOST= # URI to database
DBPORT= # Port to access database
GOOGLE_API_KEY= # Google maps API key

# In newly created file at ./env (Used for front-end)
GOOGLE_API_KEY= # Google maps API key
UBER_API_KEY= # Uber API key
```

### 3a) Run in development environment
```
# In one terminal
yarn dev:wds # Creates development front-end code in-memory to be served by back end

# In another terminal
pipenv shell # Run this within project root
cd server
python manage.py runserver --settings=project.settings.dev # Creates development build of back-end server code

# See application at http://localhost:8000/
```

### 3b) Run in production environment
```
yarn prod:build # Creates optimized production front-end code to be served by back end
pipenv shell # Run this within project root
cd server
python server/manage.py collectstatic --settings=project.settings.prod --noinput # Collects all static files into a folder for Django to use
python manage.py runserver --settings=project.settings.prod # Creates production build of back-end server code

# See application at http://localhost:8000/ (Should be more responsive and have a smaller download size)
```

## Frequently Used Commands

### Units Tests
```
pipenv shell # run this within project root
cd server
python manage.py test --settings=project.settings.prod # Should be 'OK'
```

### Back-end Migrations
```
# Used to migrate SQL database to new Django schema
pipenv shell # run this within project root
cd server
python manage.py makemigrations --settings=project.settings.prod
python manage.py migrate --settings=project.settings.prod
```
