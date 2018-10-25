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
pipenv install pymysql # Install database connector
pipenv install django_location_field 
cd server/
python3 manage.py makemigrations # transforms model changes into python code to make them deployable to database
python3 manage.py migrate
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
```

admin Landing page:
```
localhost:8000/admin
```

## Set Up Database and Connect to Database
### For windows: 
1. Run command prompt as an administrator.
2. Go MySql server 8.0 installation directory (for example: C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin) copy that location. (8.0 is the MySql server version that you installed, it may varies if you have other version)
3. In Command prompt run "cd C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin"
4. run "mysql -u root"
5. Type password when prompt
If successful, your command prompt should look like
```
mysql>
```

### For mac:
1. Run your terminal
2. Type the following command to start the MySql server.
``` 
sudo launchctl start com.mysql.mysqld # start the MySql server
sudo launchctl stop com.mysql.mysqld # stop the MySql server
```
3. Type the following command to connect to the MySql server.
```
mysql -u root -p
```
4. Type password when prompt
If successful, your command prompt should look like
```
mysql>
```

### Create database
Afterall, when you are inside of mysql, do
```
CREATE DATABASE ticketx;
```
This will create a database called ticketx that will store data needed.

## Creating Production Build
```
pipenv shell # Run this within project root
yarn prod:build # Should create necessary static files in `./server/frontend/static/dist/main.js`
python ./server/manage.py runserver # Starts Django server. Then go go to localhost:8000 to see results
```
