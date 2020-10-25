const knex = require('knex')
const app = require('../src/app');
const { makeRecipesDetailsArray, makeMaliciousRecipeDetails } = require('./recipes-details.fixtures')

describe('Recipe_Details API:', function () {
    let db;


    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    });

    before('cleanup', () => db.raw('TRUNCATE TABLE recipe_details RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE recipe_details RESTART IDENTITY;'));

    after('disconnect from the database', () => db.destroy());

    describe('GET all recipe details', () => {

        beforeEach('insert some recipe details', () => {
            return db('recipe_details').insert(recipe_details);
        })
        //relevant
        it('should respond to GET `/api/recipe_details` with an array of recipe_details and status 200', function () {
            return supertest(app)
                .get('/api/recipe_details')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.be.a('array');
                    expect(res.body).to.have.length(recipe_details.length);
                    res.body.forEach((item) => {
                        expect(item).to.be.a('object');
                        expect(item).to.include.keys('id', 'recipe_id', 'spoonacular_id', 'diet_name', 'recipe_name', 'recipe_img', 'recipe_ingredients', 'nutrition_info', 'recipe_equipment', 'recipe_instruction');
                    });
                });
        });

    });

    describe('GET recipe_details by id', () => {

        beforeEach('insert some recipe_details', () => {
            return db('recipe_details').insert(recipe_details);
        })

        it('should return correct recipe_details when given an id', () => {
            let doc;
            return db('recipe_details')
                .first()
                .then(_doc => {
                    doc = _doc
                    return supertest(app)
                        .get(`/api/recipe_details/${doc.id}`)
                        .expect(200);
                })
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.include.keys('id', 'recipe_id', 'spoonacular_id', 'diet_name', 'recipe_name', 'recipe_img', 'recipe_ingredients', 'nutrition_info', 'recipe_equipment', 'recipe_instruction');
                    expect(res.body.id).to.equal(doc.id);
                    expect(res.body.recipe_id).to.equal(doc.recipe_id);
                    expect(res.body.spoonacular_id).to.equal(doc.spoonacular_id);
                    expect(res.body.diet_name).to.equal(doc.diet_name);
                    expect(res.body.recipe_name).to.equal(doc.recipe_name);
                    expect(res.body.recipe_img).to.equal(doc.recipe_img);
                    expect(res.body.recipe_ingredients).to.equal(doc.recipe_ingredients);
                    expect(res.body.nutrition_info).to.equal(doc.nutrition_info);
                    expect(res.body.recipe_equipment).to.equal(doc.recipe_equipment);
                    expect(res.body.recipe_instruction).to.equal(doc.recipe_instruction);

                });
        });

        it('should respond with a 404 when given an invalid id', () => {
            return supertest(app)
                .get('/api/recipe_details/aaaaaaaaaaaa')
                .expect(404);
        });

    });


    describe('POST (create) new recipe_details', function () {

        //relevant
        it('should create and return a new recipe_details when provided valid data', function () {
            const newRecipe = {
                "recipe_id": "undefined",
                "spoonacular_id": 15955,
                "diet_name": "dairy free",
                "recipe_name": "Crown Lamb Rack with Green Herb Couscous",
                "recipe_img": "https://spoonacular.com/recipeImages/15955-556x370.jpg",
                "recipe_ingredients": "hey",
                "nutrition_info": "{ percentProtein: 16.04, percentFat: 70.51, percentCarbs: 13.45 }",
                "recipe_equipment": "world",
                "recipe_instruction":"bake"
            };

            return supertest(app)
                .post('/api/recipe_details')
                .send(newRecipe)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('id', 'recipe_id', 'spoonacular_id', 'diet_name', 'recipe_name', 'recipe_img', 'recipe_ingredients', 'nutrition_info', 'recipe_equipment', 'recipe_instruction');
                    expect(res.body.id).to.equal(newRecipe.id);
                    expect(res.body.recipe_id).to.equal(newRecipe.recipe_id);
                    expect(res.body.spoonacular_id).to.equal(newRecipe.spoonacular_id);
                    expect(res.body.diet_name).to.equal(newRecipe.diet_name);
                    expect(res.body.recipe_name).to.equal(newRecipe.recipe_name);
                    expect(res.body.recipe_img).to.equal(newRecipe.recipe_img);
                    expect(res.body.recipe_ingredients).to.equal(newRecipe.recipe_ingredients);
                    expect(res.body.nutrition_info).to.equal(newRecipe.nutrition_info);
                    expect(res.body.recipe_equipment).to.equal(newRecipe.recipe_equipment);
                    expect(res.body.recipe_instruction).to.equal(newRecipe.recipe_instruction);
                    expect(res.headers.location).to.equal(`/api/recipe_details/${res.body.id}`)
                });
        });

        it('should respond with 400 status when given bad data', function () {
            const badItem = {
                foobar: 'broken item'
            };
            return supertest(app)
                .post('/api/recipe_details')
                .send(badItem)
                .expect(400);
        });

    });


    describe('PATCH (update) recipe_details by id', () => {

        beforeEach('insert some recipe details', () => {
            return db('recipe').insert(recipe_details);
        })

        //relevant
        it('should update item when given valid data and an id', function () {
            const item = {
                "recipe_id": "undefined",
                "spoonacular_id": 15955,
                "diet_name": "dairy free",
                "recipe_name": "Crown Lamb Rack with Green Herb Couscous",
                "recipe_img": "https://spoonacular.com/recipeImages/15955-556x370.jpg",
                "recipe_ingredients": "hey",
                "nutrition_info": "{ percentProtein: 16.04, percentFat: 70.51, percentCarbs: 13.45 }",
                "recipe_equipment": "world",
                "recipe_instruction":"bake"
            };

            let doc;
            return db('recipe_details')
                .first()
                .then(_doc => {
                    doc = _doc
                    return supertest(app)
                        .patch(`/api/recipe_details/${doc.id}`)
                        .send(item)
                        .expect(200);
                })
                .then(res => {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('id', 'recipe_id', 'spoonacular_id', 'diet_name', 'recipe_name', 'recipe_img', 'recipe_ingredients', 'nutrition_info', 'recipe_equipment', 'recipe_instruction');
                    expect(res.body.id).to.equal(newRecipe.id);
                    expect(res.body.recipe_id).to.equal(newRecipe.recipe_id);
                    expect(res.body.spoonacular_id).to.equal(newRecipe.spoonacular_id);
                    expect(res.body.diet_name).to.equal(newRecipe.diet_name);
                    expect(res.body.recipe_name).to.equal(newRecipe.recipe_name);
                    expect(res.body.recipe_img).to.equal(newRecipe.recipe_img);
                    expect(res.body.recipe_ingredients).to.equal(newRecipe.recipe_ingredients);
                    expect(res.body.nutrition_info).to.equal(newRecipe.nutrition_info);
                    expect(res.body.recipe_equipment).to.equal(newRecipe.recipe_equipment);
                    expect(res.body.recipe_instruction).to.equal(newRecipe.recipe_instruction);
                    expect(res.headers.location).to.equal(`/api/recipe_details/${res.body.id}`)

                });
        });

        it('should respond with 400 status when given bad data', function () {
            const badItem = {
                foobar: 'broken item'
            };

            return db('recipe_details')
                .first()
                .then(doc => {
                    return supertest(app)
                        .patch(`/api/recipe_details/${doc.id}`)
                        .send(badItem)
                        .expect(400);
                })
        });

        it('should respond with a 404 for an invalid id', () => {
            const item = {
                "recipe_id": "undefined",
                "spoonacular_id": 15955,
                "diet_name": "gluten free",
                "recipe_name": "Salmon",
                "recipe_img": "https://spoonacular.com/recipeImages/15955-556x370.jpg",
                "recipe_ingredients": "hey",
                "nutrition_info": "{ percentProtein: 16.04, percentFat: 70.51, percentCarbs: 13.45 }",
                "recipe_equipment": "world",
                "recipe_instruction":"bake"
            };
            return supertest(app)
                .patch('/api/recipe_details/aaaaaaaaaaaaaaaaaaaaaaaa')
                .send(item)
                .expect(404);
        });

    });

    describe('DELETE a recipe_details by id', () => {

        beforeEach('insert some recipe_details', () => {
            return db('recipe_details').insert(recipe_details);
        })

        //relevant
        it('should delete an item by id', () => {
            return db('recipe_details')
                .first()
                .then(doc => {
                    return supertest(app)
                        .delete(`/api/recipe_details/${doc.id}`)
                        .expect(204);
                })
        });

        it('should respond with a 404 for an invalid id', function () {

            return supertest(app)
                .delete('/api/recipe_details/aaaaaaaaaaaaaaaaaaaaaaaa')
                .expect(404);
        });
    });
});
