# Golf-App

### Development Setup 
# Backend 
Current Python Version 3.10.9
Install requirements 
`pip3 install -r requirements.txt` 

Install Vitual Environment
- Instals the virtual environemt
`sudo pip3 install virtualenv`

- `virtualenv venv -p python3`
NOTE: venv is the name of the virtual environment and it also creates the vitrual environemt

Activate the Virtual enviroment:
`source venv/bin/activate`
NOTE: to deactivate the virtual environemnt run:
`deactivate`


Launch venv 
`source venv/bin/activate`
Run migrations (first launch)  
`./manage.py migrate` 
Launch server 
`./manage.py runserver` 

# Frontend
TODO

Go into the Frontend Folder
`cd frontend`

install dependencies
`npm install`

start local frontend server
`npm start`
