const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("GET /api/topics", () => {
  describe("happy paths", () => {
    test("responds with an array of topic objects, having the 'slug' and 'description' properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
            expect(Object.keys(topic).length).toBe(2);
          });
        });
    });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("should ", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(Object.keys(article).length).toBe(7);
      });
  });
  describe("Error handling", () => {
    test.only("Invalid article_id returns 404", () => {
      return request(app)
        .get("/api/articles/29991")
        .expect(404)
        .then(({ body: { message } }) => {
          console.log(message);
          expect(message).toEqual("404 Error: Invalid Path");
        });
    });
  });
});
describe("404 errors handled", () => {
  test("when given an invalid url path, responds with a 404 error message", () => {
    return request(app)
      .get("/api/tops")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toEqual("404 Error: Invalid Path");
      });
  });
});
