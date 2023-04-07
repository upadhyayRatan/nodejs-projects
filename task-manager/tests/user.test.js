const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/users");

const userOne = {
  name: "rocky",
  email: "rocky@example.com",
  password: "what123",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andrew@example.com",
      password: "1234567",
    })
    .expect(201);
});

test("should login anew user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "rocky@example.com",
      password: "what123",
    })
    .expect(200);
});

test("login failure", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "rocky@example.com",
      password: "what124",
    })
    .expect(400);
});
