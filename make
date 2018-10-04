init: 
    @echo 'Install python dependencies'
    pip install pipenv
    pipenv Install

test:
    @echo 'Run tests'
    pipenv python manage.py runserver