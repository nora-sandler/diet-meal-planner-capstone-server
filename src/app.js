require("dotenv").config()
let bodyParser = require("body-parser")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
//API middlewares 

//equivalent of fetch in node
const unirest = require("unirest");

//helping unirest to make secure or unsecure connection
const https = require("https");
const http = require("http");
//events is helping node to store the data
const events = require("events");

const { NODE_ENV, apiKey } = require("./config");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const recipesRouter = require("./recipes/recipes-router");
const recipeDetailsRouter = require("./recipe_details/recipe-details-router");

const app = express();

const morganOption = (NODE_ENV === 'development')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet());


app.use(bodyParser.json());

/////////////////////////////////////////////////////////////////////////////////////////
//external API calls
/////////////////////////////////////////////////////////////////////////////////////////



let getApiRecipesByDiet = function (query) {
    let emitter = new events.EventEmitter();
	let requestString = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&diet=${query}`
    unirest
        .get(requestString)
        .header("Authorization", apiKey)
        .end(function (result) {
            if (result.status === 200) {
				console.log(result.body);
				emitter.emit("end", result.body);
			}
			else {
				emitter.emit("error", result.status);
			}
        });
    return emitter;
};


let getApiRecipeDetailsById = function (recipeSponacularId) {
    let emitter = new events.EventEmitter();
	let requestString = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeSponacularId}&includeNutrition=true&apiKey=${apiKey}`
    unirest
        .get(requestString)
        .header("Authorization", apiKey)
        .end(function (result) {
            if (result.status === 200) {
				console.log(result.body);
				emitter.emit("end", result.body);
			}
			else {
				emitter.emit("error", result.status);
			}
        });
    return emitter;
};







/////////////////////////////////////////////////////////////////////////////////////////
// local API endpoints
/////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/recipe-by-diet-api-data/:recipe_diet_name", function (req, res) {
    //external api function call and response
    let searchReq = getApiRecipesByDiet(req.params.recipe_diet_name);

    //get the data from the first api call
    searchReq.on("end", function (recipeByDietResults) {
        console.log("recipeByDietResults", recipeByDietResults);
       
        res.json(recipeByDietResults);
    });

    //error handling
    searchReq.on("error", function (code) {
        res.sendStatus(code);
    });
});




app.get("/api/recipe-by-spoonacular-id-api-data/:recipe_spoonacular_id", function (req, res) {
    //external api function call and response
    let searchReq = getApiRecipeDetailsById(req.params.recipe_spoonacular_id);

    //get the data from the first api call
    searchReq.on("end", function (recipeByIdResults) {
        console.log("recipeByIdResults", recipeByIdResults);
       
        res.json(recipeByIdResults);
    });

    //error handling
    searchReq.on("error", function (code) {
        res.sendStatus(code);
    });
});





//Load user login router
app.use("/api/auth", authRouter);
//Load user registration router
app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/recipe-details", recipeDetailsRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!')
})


//log errors for production
app.use(errorHandler);

//log errors for development

// app.use(function errorHandler(error, req, res, next) {
//     let response
//     if (NODE_ENV != 'production') {
//         response = { error: { message: 'server error' } }
//     } else {
//         console.error(error)
//         response = { message: error.message, error }
//     }
//     res.status(500).json(response)
// })

module.exports = app;
