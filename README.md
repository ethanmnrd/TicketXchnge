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

## Creating Production Build
```
pipenv shell # Run this within project root
yarn prod:build # Should create necessary static files in `./ETES_django/project/frontend/static/dist/main.js`
python ./ETES_django/project/manage.py runserver # Starts Django server. Then go go to localhost:8000 to see results
```