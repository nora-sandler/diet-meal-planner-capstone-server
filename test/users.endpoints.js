const knex = require('knex')
const app = require('../src/app');
const { makeUsersArray, makeMaliciousUser } = require('./users.fixtures')

describe(`Users API Endpoints`, () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });
    before('cleanup', () => db.raw('TRUNCATE TABLE users RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE users RESTART IDENTITY;'));

    after('disconnect from the database', () => db.destroy());

    describe('GET /api/users', () => {

        context(`Given there are users in the db`, () => {
        
            const testUsers = makeUsersArray();
            
            beforeEach('insert users into db', () => {
                return db
                .into('users')
                .insert(testUsers)
            })
            
            it('responds with 200 and all of the users', function () {
                return supertest(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`) 
                .expect(200)
                .expect(res => {
                    expect(res.body.id).to.eql(testUsers.id)
                    expect(res.body.username).to.eql(testUsers.username)
                })
            });
            
        });

        context('Given an XSS attack user', () => {
            const testUsers = makeUsersArray();
            const { maliciousUser, expectedUser} = makeMaliciousUser();

            beforeEach('insert malicious user into db', () => {
                return db  
                    .into('users')
                    .insert(maliciousUser)
            });
                
            it(`removes XSS attack content`, () => {
                return supertest(app)
                    .get(`/api/users/${maliciousUser.id}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.username).to.eql(expectedUser.username)
                        expect(res.body.password).to.eql(expectedUser.password)
                        expect(res.body.email).to.eql(expectedUser.email)
                    })
            });
        
        });
   
    });

    describe(`POST /api/users`, () => {

        it(`creates a user, responding with 204`, function () {
            const newUser = {
                username: 'Test new user', 
                password: 'aaAA11!!',

            };
            return supertest(app)
                .post(`/api/users/`)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .send(newUser)
                .expect(204)
        });
    
    });

});