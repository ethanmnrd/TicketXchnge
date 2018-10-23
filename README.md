# TicketXchnge

## Required Tools
- Python@3.7.0
- pipenv (version shouldn't matter): Python dependency manager
- node@8.12.0: JavaScript runtime environment
- yarn@1.10.1: JavaScript dependency manager

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
pipenv shell # Run this within project root
yarn dev # Then go to localhost:8000 to see results
```

## Back-end Testing
```
pipenv shell # run this within project root
cd server
python manage.py runserver # Then go to localhost:8000 to see results (currently blank page)

admin Landing page:
localhost:8000/admin

Default API POST/GET pages for constructed models:
User List Create page: localhost:8000/api/v1/users
Ticket List Create page: localhost:8000/api/v1/tickets
Event List Create page: localhost:8000/api/v1/events
```

## Creating Production Build
```
pipenv shell # Run this within project root
yarn prod:build # Should create necessary static files in `./server/frontend/static/dist/main.js`
python ./server/manage.py runserver # Starts Django server. Then go go to localhost:8000 to see results
```
