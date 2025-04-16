const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = require("../server"); // Adjust based on your file structure
const Item = require("../models/Item"); // Adjust based on your file structure
// Before running tests, connect to test DB
beforeAll(async () => {
  const url = "mongodb://localhost:27017/myAppData";
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// After tests, disconnect and clean up
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

// Test GET /api/items
describe("GET /api/items", () => {
  it("should return an array of items", async () => {
    const response = await request(app).get("/api/items");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

// Test POST /api/add-item
describe("POST /api/add-item", () => {
  it("should add a new item to the database", async () => {
    const newItem = {
      name: "Test Item",
      description: "This is a test item",
      details: "Details about the test item",
      image: "https://via.placeholder.com/150",
    };

    const response = await request(app)
      .post("/api/add-item")
      .send(newItem)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/success/i);
  });
});

// Test GET should return the added item
describe("GET /api/items after adding item", () => {
  it("should return the recently added item", async () => {
    await Item.create({
      name: "Item A",
      description: "Item A description",
      details: "Some details",
      image: "https://via.placeholder.com/150",
    });

    const response = await request(app).get("/api/items");
    expect(response.statusCode).toBe(200);
  });
});

// Test POST with missing fields should fail
describe("POST /api/add-item validation", () => {
  it("should fail when required fields are missing", async () => {
    const incompleteItem = {
      name: "No Description",
      // description is missing
      details: "Oops",
      image: "https://via.placeholder.com/150",
    };

    const response = await request(app)
      .post("/api/add-item")
      .send(incompleteItem)
      .set("Accept", "application/json");

    // Expecting a 400 response only if your backend has validation
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/required/i);
  });
});
