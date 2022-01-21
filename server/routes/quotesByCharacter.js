const router = require("express").Router();
const axios = require("axios");
const response = require("../errors/errors").responseFactory;
const chalk = require("chalk");
const cacheGet = async (req, res, next) => {
  const key = req.params.chrtr.toLowerCase().replace(/\s/g, "+") + "_quotes";
  await res.locals.client.get(key, (err, reply) => {
    if (err) {
      console.error(chalk.yellow(err));
      // Fallback to fetching from API
      next();
    }
    if (reply !== null) {
      let rep = JSON.parse(reply);
      let totalPages = Math.ceil(rep.length / 10);
      res
        .status(200)
        .send(
          response(
            "Operation Succedded in fetching from cache",
            totalPages,
            rep
          )
        );
    } else {
      next();
    }
  });
};
const fetchInfoAPI = async (req, res, next) => {
  try {
    const param = req.params.chrtr.replace(/\s/g, "+");
    console.log("Character name: ", param);
    const resp = await axios.get(
      `${process.env.API_URL}/quote?author=${param}`
    );
    let totalPages = Math.ceil(resp.data.length / 10);
    res.locals.pages = totalPages;
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
  const key = req.params.chrtr.toLowerCase().replace(/\s/g, "+") + "_quotes";
  console.log("Key: ", key);
  if (res.locals.data !== undefined) {
    //setting cache
    // key should be in lower case the name of the character seperated by +
    await res.locals.client.set(
      key,
      JSON.stringify(res.locals.data),
      (err, reply) => {
        if (err) {
          console.error(chalk.yellow(err));
        }
        console.log(chalk.green(reply));
      }
    );
  }
  console.log("Data: ", res.locals.data);
  res
    .status(200)
    .send(
      response(
        "Operation Succedded in fetching from API",
        res.locals.pages,
        res.locals.data
      )
    );
};
router.get("/:chrtr", cacheGet, fetchInfoAPI, cacheSet);
module.exports = router;
