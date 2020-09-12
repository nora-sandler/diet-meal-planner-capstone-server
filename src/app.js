require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {
    NODE_ENV
} = require('./config')
const errorHandler = require('./middleware/error-handler')
const pancakeRouter = require('./pancake/pancake-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const recipesRouter = require('./recipes/recipes-router')
const recipeDetailsRouter = require('./recipe_details/recipe-details-router')


const app = express()

const morganOption = (NODE_ENV === 'production') ?
    'tiny' :
    'common';

app.use(morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use(express.static('public'))

//Load user login router
app.use('/api/auth', authRouter)
//Load user registration router
app.use('/api/users', usersRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/recipe-details', recipeDetailsRouter)

app.use('/api/pancakes', pancakeRouter)
app.use(errorHandler)

module.exports = app
