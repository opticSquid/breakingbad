require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const redis = require("ioredis");
//Uses port 6379 if not specified
// other url is for using in heroku

var client = redis.createClient(
  process.env.REDIS_URL || {
    host: "127.0.0.1",
    port: 6379,
    username: "",
    password: "",
  }
);
client.on("connect", () =>
  console.log(chalk.green("Redis dev Client Connected"))
);
client.on("error", (err) => console.log("Redis dev Client Error", err));

const port = process.env.PORT || 5000;
const path = __dirname + "/build";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
app.get("/", (req, res) => {
  res.sendFile(path + "/index.html");
});
app.use(
  "/api",
  (req, res, next) => {
    res.locals.client = client;
    console.log("request made", req.url);
    next();
  },
  require("./routes/index.js")
);
app.listen(port, () => {
  console.log(chalk.blue(`Listening on port ${port}`));
});
