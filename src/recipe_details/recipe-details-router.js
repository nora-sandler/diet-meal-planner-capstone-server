const path = require('path')
const express = require('express')
const xss = require('xss')
const Recipe_detailService = require('./recipe-details-service')

const recipe_detailRouter = express.Router()
const jsonParser = express.json()

const serializeRecipe_detail = recipe_detail => ({
    id: recipe_detail.id,
    title: xss(recipe_detail.title),
    completed: recipe_detail.completed
})

recipe_detailRouter
    .route('/')
    //relevant
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        Recipe_detailService.getRecipe_details(knexInstance)
            .then(recipe_details => {
                res.json(recipe_details.map(serializeRecipe_detail))
            })
            .catch(next)
    })
    //relevant
    .post(jsonParser, (req, res, next) => {
        const {
            title,
            completed = false
        } = req.body
        const newRecipe_detail = {
            title
        }

        for (const [key, value] of Object.entries(newRecipe_detail))
            if (value == null)
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })

        newRecipe_detail.completed = completed;

        Recipe_detailService.insertRecipe_detail(
                req.app.get('db'),
                newRecipe_detail
            )
            .then(recipe_detail => {
                res
                    .status(201)
                    //.location(path.posix.join(req.originalUrl, `/${recipe_detail.id}`))
                    .json(serializeRecipe_detail(recipe_detail))
            })
            .catch(next)
    })

recipe_detailRouter
    .route('/:recipe_detail_id')
    .all((req, res, next) => {
        if (isNaN(parseInt(req.params.recipe_detail_id))) {
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }
        Recipe_detailService.getRecipe_detailById(
                req.app.get('db'),
                req.params.recipe_detail_id
            )
            .then(recipe_detail => {
                if (!recipe_detail) {
                    return res.status(404).json({
                        error: {
                            message: `Recipe_detail doesn't exist`
                        }
                    })
                }
                res.recipe_detail = recipe_detail
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeRecipe_detail(res.recipe_detail))
    })
    //relevant
    .patch(jsonParser, (req, res, next) => {
        const {
            title,
            completed
        } = req.body
        const recipe_detailToUpdate = {
            title,
            completed
        }

        const numberOfValues = Object.values(recipe_detailToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must content either 'title' or 'completed'`
                }
            })

        Recipe_detailService.updateRecipe_detail(
                req.app.get('db'),
                req.params.recipe_detail_id,
                recipe_detailToUpdate
            )
            .then(updatedRecipe_detail => {
                res.status(200).json(serializeRecipe_detail(updatedRecipe_detail[0]))
            })
            .catch(next)
    })
    //relevant
    .delete((req, res, next) => {
        Recipe_detailService.deleteRecipe_detail(
                req.app.get('db'),
                req.params.recipe_detail_id
            )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = recipe_detailRouter
