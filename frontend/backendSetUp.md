## First we need to set up a virtual environment
- pip install virtualenv -- This installs the software for a virtual environment
- virtualenv venv --- this sets up the virtual environment
- source venv/bin/activate _____ this is the activate the virtual environment

## Installing Django
- pip install django ___ inside of the active virtual environment install django
- django-admin startproject {name of project} ___ This comand creates the new django folder for the project

## Start the server
- cd into the {name of backend folder}
- python manage.py runserver ____ this will turn on the server for the backend on port 8000
# go to http://127.0.0.1:8000/ to see the django project
- stop the server with control+c
- python manage.py startapp {name of app} - creates the backend app


## let the backend know that our app exists
- in backend/backend go to settings.py
- find the installed apps section and we want it to point to the apps.py file in the base folder
    'base.apps.BaseConfig' ____ type this in the settings.py folder under the INSTALLED_APPS section
    - know the poject knows about our app

## Configure our Urls to create routing
- go to our app {base} and go to views.py
- {We will be using function based views instead of classes}
# In views.py
    - import JsonResponse
    - create a getRoutes function

## Configure URLS
- we need to create a urls.py file in the {base} app __ this filr is in charge of connecting the views to the urls
- in urls - import the path function & import the views
- in urls - create the urlpattern array, this is just going to be a list of urls
- we need to tell the other urls file in the backend folder to send the 'traffic to the base urls file and let it take care of every thing.
- in backend/urls.py___ add-- path('', include('base.urls')), -- this connects the base app to the server 
- in backend/urls.py add api into the path functions like so-- path('api/',include('base.urls')) --

## Conect our fake golf course data into the backend
- copy the json data set of the golf courses and paste it into the backend/base folder and change the file to .py
- base/golfcourses.py -- turn the json set into a dictonary by getting rid on the const and the export
- base/views.py - import the hard coded golf course dictonary then create another function base view called getGolfCourses
- base/urls.py - add another path in the urls folder so we can use the getGolfCourses view


## Installing the django-rest-framework
- pip install djangorestframework -- this is installing the django-rest-framework
- /backend/settings.py - We need to install it into our INSTALLED_APPS in the settings.py file
- /base/views.py - import the django-rest-framwork view into the views.py folder (see django rest reamwork docs on how to do it
- /base.views.py - also import Response to the views.py folder)
- Then Create your fuction to show the golf courses
- run 'python manage.py migrate' to apply the changes and you should see a different way of looking at the api in the browser


## Fetching the Data
- in the termianl - go to the frontend folder and use these script to install axios
    - 'npm install axios'
- set up the state for the component and create your async await function inside of the react useEffect function to load the data
- Then you will get an error when you open the inspection pannel inside the browser and your will get the CORS error.
- in the backend -> pip install django-cors-headers
- backend/settings.py - add 'corsheaders' in the INSTALLED_APPS
- CorsMiddleware should be placed as high as possible, especially before any middleware that can generate responses such as Djangos CommonMiddleware.
    -- "corsheaders.middleware.CorsMiddleware", --
- /backend/settings.py -  At the bottom of the page add:
    -- CORS_ALLOW_ALL_ORIGINS = True


