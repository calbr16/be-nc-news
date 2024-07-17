const request = require("supertest");
const app = require("../app.js");
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');

beforeEach(() => {
    return seed(testData);
});

// !!! ADD ERROR TESTS LATER !!!
describe('GET /api/topics', () => {
    it('gets all topics', () => {
        return request(app).get('/api/topics')
            .expect(200).then((response) => {
                const topics = response.body.topics;
                expect(topics).toHaveLength(3);
                topics.forEach((topic) => {
                    expect(topic).toHaveProperty('slug');
                    expect(topic).toHaveProperty('description');
                });
            })
    })
});

// !!! ADD ERROR TESTS LATER !!!
describe('GET /api', () => {
    it('provides a description of all other endpoints available', () => {
        return request(app).get('/api')
            .expect(200).then((response) => {
                const endpoints = response.body;
                // Expect there to be 3 endpoints
                expect(Object.keys(endpoints)).toHaveLength(3)
                for (const key in endpoints){
                    let properties = Object.keys(endpoints[key]);
                    // Expect the first property of each endpoint to be its description
                    expect(properties[0]).toBe('description');
                };
            });
    });
});

afterAll(() => db.end());