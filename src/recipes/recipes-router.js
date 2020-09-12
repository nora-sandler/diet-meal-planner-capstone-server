const path = require("path");
const express = require("express");
const xss = require("xss");
const RecipeService = require("./recipes-service");

const recipeRouter = express.Router();
const jsonParser = express.json();

const serializeRecipe = (recipe) => ({
    user_id: recipe.user_id,
    spoonacular_id: recipe.spoonacular_id,
    recipe_name: xss(recipe.recipe_name),
    recipe_img: xss(recipe.recipe_img),
});

recipeRouter
    .route("/")
    //relevant
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        RecipeService.getRecipes(knexInstance)
            .then((recipes) => {
                res.json(recipes.map(serializeRecipe));
            })
            .catch(next);
    })
    //relevant
    .post(jsonParser, (req, res, next) => {
        const { user_id, spoonacular_id, recipe_name, recipe_img } = req.body;
        const newRecipe = {
            user_id,
            spoonacular_id,
            recipe_name,
            recipe_img,
        };

        for (const [key, value] of Object.entries(newRecipe))
            if (value == null)
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`,
                    },
                });

        RecipeService.insertRecipe(req.app.get("db"), newRecipe)
            .then((recipe) => {
                res.status(201)
                    //.location(path.posix.join(req.originalUrl, `/${recipe.id}`))
                    .json(serializeRecipe(recipe));
            })
            .catch(next);
    });

recipeRouter
    .route("/:recipe_id")
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.recipe_id))) {
            return res.status(404).json({
                error: {
                    message: `Invalid id`,
                },
            });
        }
        RecipeService.getRecipeById(req.app.get("db"), req.params.recipe_id)
            .then((recipe) => {
                if (!recipe) {
                    return res.status(404).json({
                        error: {
                            message: `Recipe doesn't exist`,
                        },
                    });
                }
                res.recipe = recipe;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(serializeRecipe(res.recipe));
    })
    //relevant
    .patch(jsonParser, (req, res, next) => {
        const { user_id, spoonacular_id, recipe_name, recipe_img } = req.body;
        const recipeToUpdate = {
            user_id,
            spoonacular_id,
            recipe_name,
            recipe_img,
        };

        const numberOfValues = Object.values(recipeToUpdate).filter(Boolean)
            .length;
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must content either 'title' or 'completed'`,
                },
            });

        RecipeService.updateRecipe(
            req.app.get("db"),
            req.params.recipe_id,
            recipeToUpdate
        )
            .then((updatedRecipe) => {
                res.status(200).json(serializeRecipe(updatedRecipe[0]));
            })
            .catch(next);
    })
    //relevant
    .delete((req, res, next) => {
        RecipeService.deleteRecipe(req.app.get("db"), req.params.recipe_id)
            .then((numRowsAffected) => {
                res.status(204).end();
            })
            .catch(next);
    });

module.exports = recipeRouter;
