if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const OPENWEATHERAPP_API_KEY = process.env.OPENWEATHERAPP_API_KEY;

const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&units=metric&appid=${OPENWEATHERAPP_API_KEY}`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  // .catch(function (err) {
  //   console.log("Unable to fetch -", err);
  // });

  axios({
    url: url,
    responseType: "json",
  }).then((data) => {
    res.json(data.data.current);
  });
});

app.listen(3000, () => console.log("Server runs on Port 3000"));
