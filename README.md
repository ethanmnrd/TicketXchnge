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

admin Landing page:
```
localhost:8000/admin
```

## Start Server and Initialize Database
### For Windows: 
Run cmd.exe as administrator.
```
cd C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin 
mysql -u root -p
password
```
If successful, your command prompt should look like:
```
mysql>
```
Enter the following:
```
CREATE DATABASE ticketx;
USE ticketx;
```

To initialize database tables:
```
pipenv shell # run this within project root
pipenv install # to verify modules are installed
cd server
python manage.py makemigrations # preps models to be added to database as tables
python manage.py migrate # initializes tables
```

To verify tables were created, in mysql cmd:
```
SHOW TABLES;
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
