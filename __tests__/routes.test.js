const request = require("supertest");
const app = require("../app.js");
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');

beforeEach(() => {
    return seed(testData);
});

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
    })

afterAll(() => db.end());