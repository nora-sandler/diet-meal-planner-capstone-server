# Diet Meal Planner 
For people who are following diets restrictions and need new ideas on recipes.

## Working Prototype 
(Example) You can access a working prototype of the React app here: https://diet-meal-planner.vercel.app/ and Node app here: https://diet-meal-planner.herokuapp.com/


## User Stories 
This app is for two types of users: a visitor and a logged-in user

#### Landing Page
* As a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it


### Register page
* As visitor 
* I want to register to the web site 
* So that I can use it.

### Login page
* As a registered user 
* I want to login to the web site 
* So that I can use it.

### Search diet page 
* As a registered user 
* I want to find the diet I am following and see what recipes are available and their details (not the whole list which is available for registered users).
* So I can decide if I want to register.

### Add recipe page
* As a registered user
* I want to find the recipes available in accordance with my diet plan  and their details.
* So I can save them in my account.

### Recipe details page
* As a registered user
* I want to see details of the recipe including cooking process, necessary ingredients and equipment.
* So I can save them in my account.


<!-- ### User calendar page
* As a registered user
* I want to add chosen recipes into the '7-day calendar' inside the app.
* So that I can plan my weekly meal.
 -->


### Wireframes 
(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/wireframes/landing_page.jpg)
Sign up Page 
![Register Page](/github-images/wireframes/sign_up_page.jpg)
Login Page
![Login Page](/github-images/wireframes/sign_up_page.jpg)
How it works 1 Page
![How it works 1 Page](/github-images/wireframes/how_it_works_1.jpg)
How it works 2 Page
![How it works 2 Page](/github-images/wireframes/how_it_works_2.jpg)
How it works  3 Page
![How it works page 3 Page](/github-images/wireframes/how_it_works_3.jpg)
How it works  4 Page
![How it works  4 Page](/github-images/wireframes/how_it_works_4.jpg)
Add recipes Page 
![Add recipes Page](/github-images/wireframes/add_recipes_page.jpg)
Recipe_details Page
![Recipe_details Page](/github-images/wireframes/recipe_detail_page.jpg)
Weekly calendar Page
![Weekly calendar Page](/github-images/wireframes/weekly_calendar_page.jpg)


## Screenshots 
Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/Landing_page.png)
Register Page
![Register Page](/github-images/screenshots/Signup.png)
Login Page
![Login Page](/github-images/screenshots/Login.png)
Recipes list Page
![Recipes list Page](/github-images/screenshots/Recipes.png)
Recipe details Page
![Recipe details Page](/github-images/screenshots/Recipe_details.png)
Added recipes Page
![Added recipes Page](/github-images/screenshots/Added_recipes.png)



## Functionality 
The app's functionality includes:
* Every User has the ability to create an account
* Every User has the ability to login into the account
* Every User has the ability to search for diet recipes
* Every User has the ability to save recipes in the account
* Every User has the ability to layout recipes on weekly calendar 


## Technology 
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver


## Front-end Structure - React Components Map 
*  __Index.js__ 
    * __App.js__ 
        * __LandingPage.js__ 
            * __Login.js__ 
            * __Register.js__ 
            * __Footer.js__ 
        * __ListOfDiets.js__
        * __AddRecipesPage.js__
        * __RecipesForsDiets.js__



## Back-end Structure - Business Objects 
* Users (database table)
    * id (auto-generated)
    * username (email validation)
    * password (at least 8 chars, at least one alpha and a special character validation)

* Recipes (database table)
    * id (auto-generated)
    * recipe_name (varchar 255)
    * recipe_img 

* Recipe_Detail (database table)  
    * id (auto-generated)
    * diet_name (varchar 255)
    * recipe_name (varchar 255)
    * recipe_img 
    * recipe_ingredients (varchar 255)
    * nutrition_info (varchar 255)
    * recipe_equipment (varchar 255) 
    * recipe_instruction (varchar 255)


## API Documentation 
API Documentation details:
API TOKEN Authorization required
* local API search recipes 
    * http://localhost:8000/api/recipe-by-diet-api-data/keto
* get recipe details 
    * http://localhost:8000/api/recipe-details/
* register user
    * http://localhost:8000/api/users
* login user
    * http://localhost:8000/api/auth/login
* post recipe
    * http://localhost:8000/api/recipes
* post recipe details
    * http://localhost:8000/api/auth/login
* delete recipe details
    * http://localhost:8000/api/recipe-details/3
* delete recipe
    * http://localhost:8000/api/recipes/2
* get recipe
    * http://localhost:8000/api/recipes
* get diets by user id
    * http://localhost:8000/api/recipes/diets-by-user-id/1
* get recipes by  diet and  by user id
    * http://localhost:8000/api/recipes/recipes-by-user-id/1


## Responsive 
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap 
This is v1.0 of the app, but future enhancements are expected to include:
* Weekly calendar - in order to map recipes based on the calendar.
* Add more specialized diets (dairy free, )
* Add screenshots of the app for explanatory purpose on the dashboard.

## How to run it 
Use command line to navigate into the project folder and run the following in terminal

Local React scripts

To install the react project ===> npm install
To run react (on port 3000) ===> npm start
To run tests ===> npm run test

Local Node scripts

To install the node project ===> npm install
To migrate the database ===> npm run migrate -- 1
To run Node server (on port 8000) ===> npm run dev
To run tests ===> npm run test


### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test