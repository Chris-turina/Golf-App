# Golf-App

### Development Setup 
# Backend 
Current Python Version 3.10.9
Install requirements 
`pip3 install -r requirements.txt` 

Install Vitual Environment Software
- `sudo pip3 install virtualenv`

Create the Virtual Environment
- `virtualenv venv -p python3`
- NOTE: venv is the name of the virtual environment

Activate and Launch the Virtual enviroment:
`source venv/bin/activate`
NOTE: to deactivate the virtual environemnt run:
`deactivate`

Run migrations (first launch)  

- `./manage.py migrate` 

Launch server 
- `./manage.py runserver` 

# Frontend
TODO

Go into the Frontend Folder
`cd frontend`

install dependencies
`npm install`

start local frontend server
`npm start`
