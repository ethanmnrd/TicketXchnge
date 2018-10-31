# TicketXchnge

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
pipenv shell # Run this within project root
yarn dev # Then go to localhost:8000 to see results
```

## Back-end Testing
```
pipenv shell # run this within project root
pipenv install # to verify required modules are installed
cd server
python manage.py runserver # Then go to localhost:8000 to see results (currently blank page)
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
yarn prod:build # Should create necessary static files in `./server/frontend/static/dist/main.js`
python ./server/manage.py runserver # Starts Django server. Then go go to localhost:8000 to see results
```
