require("dotenv").config();
let bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
//API middlewares
const https = require("https");
const http = require("http");
const unirest = require("unirest");
const events = require("events");

const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const pancakeRouter = require("./pancake/pancake-router");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const recipesRouter = require("./recipes/recipes-router");
const recipeDetailsRouter = require("./recipe_details/recipe-details-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(
    morgan(morganOption, {
        skip: () => NODE_ENV === "test",
    })
);
app.use(cors());
app.use(helmet());

app.use(express.static("public"));
app.use(bodyParser.json());

/////////////////////////////////////////////////////////////////////////////////////////
//external API calls
/////////////////////////////////////////////////////////////////////////////////////////

// let getApiRecipesByDiet = function (query) {
// 	let emitter = new events.EventEmitter();
// 	let options = {
//         host: 'api.spoonacular.com',
//        // https://api.spoonacular.com/recipes/search?apiKey=6a8f8872dfcd40a3801e7a331e543a53&diet=keto
// 		path: '/recipes/search?apiKey=6a8f8872dfcd40a3801e7a331e543a53&diet=' + query,
// 		method: 'GET',
// 		headers: {
// 			'Authorization': "6a8f8872dfcd40a3801e7a331e543a53",
// 			'Content-Type': "application/json",
// 			'Port': 443,
// 		}
// 	};

// 	https.get(options, function (res) {
//         let resultsString = ""
// 		res.on('data', function (chunk) {
//             console.log('hello',chunk )
//             console.log('testing',JSON.stringify(chunk))
//             resultsString +=chunk
//            // emitter.emit('end', JSON.parse(resultsString));
//             emitter.emit('end', resultsString)
//             //emitter.emit('end', chunk)
// 		});
// 	}).on('error', function (e) {
// 		emitter.emit('error', e);
// 	});
// 	return emitter;
// };

// unirest.get(requestString)
// .header("X-RapidAPI - KEY", API_KEY)
// .end(function(result) {
// 	if (result.status === 200) {
// 		getRecipeData(result.body);
// 	}
// })

let getApiRecipesByDiet = function (query) {
    let emitter = new events.EventEmitter();
	let requestString = `https://api.spoonacular.com/recipes/search?apiKey=6a8f8872dfcd40a3801e7a331e543a53&diet=${query}`
    unirest
        .get(requestString)
        .header("Authorization", "6a8f8872dfcd40a3801e7a331e543a53")
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
	let requestString = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeSponacularId}&includeNutrition=true&apiKey=6a8f8872dfcd40a3801e7a331e543a53`
    unirest
        .get(requestString)
        .header("Authorization", "6a8f8872dfcd40a3801e7a331e543a53")
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

app.get("/recipe-by-diet-api-data/:recipe_diet_name", function (req, res) {
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




app.get("/recipe-by-spoonacular-id-api-data/:recipe_spoonacular_id", function (req, res) {
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

app.use("/api/pancakes", pancakeRouter);
app.use(errorHandler);

module.exports = app;
