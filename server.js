if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  console.log("POST cmd executed");
});

app.listen(3000, () => console.log("Server runs on Port 3000"));
