require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const redis = require("ioredis");
//Uses port 6379 if not specified
// other url is for using in heroku
if (process.env.node_env === "production") {
  const redisUrl = process.env.REDIS_URL;
  var client = redis.createClient(redisUrl);
  client.on("connect", () =>
    console.log(chalk.green("Redis prod Client Connected"))
  );
  client.on("error", (err) => console.log("Redis Client Error", err));
} else {
  var client = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
    username: "",
    password: "",
  });
  client.on("connect", () =>
    console.log(chalk.green("Redis dev Client Connected"))
  );
  client.on("error", (err) => console.log("Redis Client Error", err));
}
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
