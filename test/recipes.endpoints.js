const knex = require('knex')
const app = require('../src/app');
const { makeRecipesArray, makeMaliciousRecipe } = require('./recipes.fixtures')

describe(`Users API Endpoints`, () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });
    before('cleanup', () => db.raw('TRUNCATE TABLE recipes RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE recipes RESTART IDENTITY;'));

    after('disconnect from the database', () => db.destroy());

    describe('GET /api/recipes', () => {

        context(`Given there are recipes in the db`, () => {
        
            const testRecipes = makeRecipesArray();
            
            beforeEach('insert recipes into db', () => {
                return db
                .into('recipes')
                .insert(testRecipes)
            })
            
            it('responds with 200 and all of the users', function () {
                return supertest(app)
                .get('/api/recipes')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`) 
                .expect(200)
                .expect(res => {
                    expect(res.body.id).to.eql(testRecipes.id)
                    expect(res.body.recipes).to.eql(testRecipes.recipes)
                })
            });
            
        });

        context('Given an XSS attack recipe', () => {
            const testRecipes = makeRecipesArray();
            const { maliciousRecipe, expectedRecipe} = makeMaliciousRecipe();

            beforeEach('insert malicious recipe into db', () => {
                return db  
                    .into('recipes')
                    .insert(maliciousRecipe)
            });
                
            it(`removes XSS attack content`, () => {
                return supertest(app)
                    .get(`/api/recipes/${maliciousRecipe.id}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.recipe_name).to.eql(expectedRecipe.recipe_name)
                        expect(res.body.recipe_img).to.eql(expectedRecipe.recipe_img)
                        
                    })
            });
        
        });
   
    });

    describe(`POST /api/recipes`, () => {

        it(`creates a recipe, responding with 204`, function () {
            const newRecipe = {
                recipe_name: 'Test new recipe', 
                recipe_img: img_test.jpeg,

            };
            return supertest(app)
                .post(`/api/recipes/`)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .send(newRecipe)
                .expect(204)
        });
    
    });

});