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
describe("PATCH /api/articles/:article_id", () => {
  describe("happy paths", () => {
    test("patch object with the key of 'inc_votes' will update the 'votes' property by incrementing/decrementing the current value stored", () => {
      const updatedVotes = { inc_votes: 10 };
      return request(app)
        .patch("/api/articles/1")
        .send(updatedVotes)
        .expect(201)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 110,
          });
        });
    });
  });
  describe("Errors", () => {
    test("Invalid article_id with typeof number returns a 404 error message", () => {
      const updatedVotes = { inc_votes: 10 };
      return request(app)
        .patch("/api/articles/9999")
        .send(updatedVotes)
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual("404 Error: Invalid article_id");
        });
    });
  });
});
