const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
require("jest-sorted");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("GET /api/topics", () => {
  describe("Happy paths", () => {
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
  test("responds with correct article_id object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          comment_count: "11",
        });
      });
  });
  test("responds with correct article_id object for an article with zero comments", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual({
          article_id: 2,
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: "2020-10-16T05:03:00.000Z",
          votes: 0,
          comment_count: "0",
        });
      });
  });
  describe("Errors", () => {
    test("Invalid article_id returns 404", () => {
      return request(app)
        .get("/api/articles/29991")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual("404 Error: Article Not Found");
        });
    });
    test("Invalid typeof article_id. When passed a string should return a 400 bad request message", () => {
      return request(app)
        .get("/api/articles/badrequest")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual("400 Error: Bad Request");
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
describe("GET /api/users", () => {
  describe("Happy paths", () => {
    test("responds with an array of user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          users.forEach((user) => {
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("avatar_url");
            expect(Object.keys(user).length).toBe(3);
          });
        });
    });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  describe("Happy paths", () => {
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
          expect(message).toEqual("404 Error: Article Not Found");
        });
    });
    test("Invalid typeof article_id. When passed a string should return a 400 bad request message", () => {
      const updatedVotes = { inc_votes: 10 };
      return request(app)
        .patch("/api/articles/9bah")
        .send(updatedVotes)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual("400 Error: Bad Request");
        });
    });
    test("Invalid typeof inc_vote. When passed a string should return a 400 bad request message", () => {
      const updatedVotes = { inc_votes: "wrong" };
      return request(app)
        .patch("/api/articles/1")
        .send(updatedVotes)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual("400 Error: Bad Request");
        });
    });
    test("inc_vote key missing, return a 200 with vote key unchanged", () => {
      const updatedVotes = { wrongKey: 10 };
      return request(app)
        .patch("/api/articles/1")
        .send(updatedVotes)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
          });
        });
    });
  });
});
describe("GET /api/articles", () => {
  describe("Happy paths", () => {
    test("200: returns an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toHaveLength(12);
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                author: expect.any(String),
                comment_count: expect.any(Number),
                created_at: expect.any(String),
                title: expect.any(String),
                topic: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
    test("200: article objects are sorted by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toBeSorted({ key: "created_at", descending: true });
        });
    });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  describe("Happy paths", () => {
    test("accepts an object with username and body properties", () => {
      const postedObj = {
        body: "New comment",
        username: "butter_bridge",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(postedObj)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(Object.keys(comment)).toHaveLength(6);
          expect(comment).toEqual(
            expect.objectContaining({
              body: "New comment",
              votes: 0,
              author: "butter_bridge",
              article_id: 2,
              created_at: expect.any(String),
              comment_id: 19,
            })
          );
        });
    });
  });
  describe("Errors", () => {
    test("404: article not found", () => {
      const postedObj = {
        body: "New comment",
        username: "butter_bridge",
      };
      return request(app)
        .post("/api/articles/9898/comments")
        .send(postedObj)
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("404 Error: Article Not Found");
        });
    });
  });
});
