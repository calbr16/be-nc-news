const request = require("supertest");
const app = require("../app.js");
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');

beforeEach(() => {
    return seed(testData);
});

describe('GET /api', () => {
    it('provides a description of all other endpoints available', () => {
        return request(app).get('/api')
        // Be available on endpoint /api
            .expect(200).then((response) => {
                const endpointsObj = response.body;
                const endpoints = Object.keys(endpointsObj)
                const numOfEndpoints = endpoints.length;

                // Responds with an object
                expect(endpointsObj).toBeObject();
                // Returned object contains all endpoints
                expect(endpoints).toHaveLength(numOfEndpoints);
                // For each endpoint:
                for(const endpoint in endpointsObj){
                    // Access all properties of endpoint
                    let endpointProperties = endpointsObj[endpoint]
                    // All endpoints have properties 'description', 'queries' and 'exampleResponse'
                    expect(endpointProperties).toHaveProperty('description')
                    expect(endpointProperties).toHaveProperty('queries')
                    expect(endpointProperties).toHaveProperty('exampleResponse')
                }
            });
    });
});

describe('GET /api/topics', () => {
    it('gets all topics', () => {
        return request(app).get('/api/topics')
        // Is available on endpoint /api/topics
            .expect(200)
            .then((response) => {
                const topics = response.body.topics;
                // Gets all topics
                expect(topics).toHaveLength(3);
                // For each topic:
                topics.forEach((topic) => {
                    // Each topic has 'slug' and 'description' properties
                    expect(topic).toHaveProperty('slug');
                    expect(topic).toHaveProperty('description');
                });
            });
    });
});

describe('GET /api/articles', () => {
    it('gets all articles', () => {
        return request(app).get('/api/articles')
        // Is available on endpoint /api/articles
            .expect(200).then((response) => {
            const articles = response.body.articles;
            // Gets all articles
            expect(articles).toHaveLength(13);
            // Sorted in descending order by creation date
            expect(articles).toBeSortedBy('created_at', { descending : true })
            // Contains necessary properties
            articles.forEach((article) => {
                expect(article).toHaveProperty('article_id');
                expect(article).toHaveProperty('title');
                expect(article).toHaveProperty('topic');
                expect(article).toHaveProperty('author');
                expect(article).toHaveProperty('created_at');
                expect(article).toHaveProperty('votes');
                expect(article).toHaveProperty('article_img_url');
                expect(article).toHaveProperty('comment_count');
                // Does not contain the 'body' property
                expect(article).not.toHaveProperty('body');
            });
        });
    });
});

describe('GET /api/articles/:article_id', () => {
    it('gets an article by its id', () => {
        return request(app).get('/api/articles/1')
        // Available on /api/articles/1
            .expect(200).then((response) => {
            const article = response.body.article
            // Article has an ID
            expect(article).toHaveProperty('article_id')
            // Returned article has the same ID as request
            expect(article.article_id).toBe(1)
            // Article contains all properties
            expect(article).toHaveProperty('article_id');
            expect(article).toHaveProperty('title');
            expect(article).toHaveProperty('topic');
            expect(article).toHaveProperty('author');
            expect(article).toHaveProperty('body');
            expect(article).toHaveProperty('created_at');
            expect(article).toHaveProperty('votes');
            expect(article).toHaveProperty('article_img_url');
        });
    });
    test('status: 404, responds with an error message when passed a valid article ID that does not exist in the database', () => {
        return request(app)
            .get("/api/articles/99999")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toEqual('No article found for article_id: 99999')
            });
    });
    test('status: 400, responds with an error message when passed an invalid article ID', () => {
        return request(app)
            .get('/api/articles/notAnId')
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toEqual('Bad Request!')
            });
    });
});

// Ticket 6 //
// status 200: array of comments
// status 200: valid id with no comments (empty array)
// status 400: invalid id
// status 404: nonexistent id
// length
// properties


afterAll(() => db.end());