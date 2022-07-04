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
        .then(({ body: { topics } }) =>
          topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          })
        );
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
