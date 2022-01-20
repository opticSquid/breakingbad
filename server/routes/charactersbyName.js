const router = require("express").Router();
const axios = require("axios");
const response = require("../errors/errors").responseFactory;
const chalk = require("chalk");
const cacheGet = async (req, res, next) => {
  const params = req.query.name.toLowerCase().replace(/\s/g, "+");
  //   let search_regex = `^(${params}).*`;
  await res.locals.client.get(params, (err, reply) => {
    if (err) {
      console.error(chalk.yellow(err));
      // Fallback to fetching from API
      next();
    }
    if (reply !== null) {
      res
        .status(200)
        .send(
          response(
            "Operation Succedded in fetching from cache",
            JSON.parse(reply)
          )
        );
    } else {
      next();
    }
  });
};
const fetchInfoAPI = async (req, res, next) => {
  try {
    const params = req.query.name.replace(/\s/g, "+");
    const resp = await axios.get(
      `${process.env.API_URL}/characters?name=${params}`
    );
    res.locals.data = resp.data;
    next();
  } catch (err) {
    console.error(chalk.red(err));
    res
      .status(500)
      .send(response("Error occoured while fetching data from API", null));
  }
};
const cacheSet = async (req, res, next) => {
  if (res.locals.data !== undefined) {
    //setting cache
    // key should be in lower case the name of the character seperated by +
    await res.locals.client.set(
      req.query.name.toLowerCase().replace(/\s/g, "+"),
      JSON.stringify(res.locals.data),
      (err, reply) => {
        if (err) {
          console.error(chalk.yellow(err));
        }
        console.log(chalk.green(reply));
      }
    );
  }
  res
    .status(200)
    .send(
      response("Operation Succedded in fetching from API", res.locals.data)
    );
};
router.get("/", cacheGet, fetchInfoAPI, cacheSet);
module.exports = router;
