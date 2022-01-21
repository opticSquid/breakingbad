const router = require("express").Router();
const axios = require("axios");
const response = require("../errors/errors").responseFactory;
const chalk = require("chalk");
// Fetching from cache
const cacheGet = async (req, res, next) => {
  await res.locals.client.get("characters", (err, reply) => {
    if (err) {
      console.error(chalk.yellow(err));
      // Fallback to fetching from API
      next();
    }
    if (reply !== null) {
      let rep = JSON.parse(reply);
      let totalPages = Math.ceil(rep.length / 10);
      //paginating resposne from cache
      if (req.params.pgno !== "all") {
        //pgno starting from 0
        let from = parseInt(req.params.pgno) * 10;
        let to = (parseInt(req.params.pgno) + 1) * 10;
        rep = rep.slice(from, to);
      }
      rep = rep.map((i) => {
        return {
          char_id: i.char_id,
          name: i.name,
          occupation: i.occupation,
          birthday: i.birthday,
          status: i.status,
          img: i.img,
        };
      });
      console.log("rep: ", rep);
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
      // If cache is empty, fetch from API
      next();
    }
  });
};
const fetchInfoAPI = async (req, res, next) => {
  try {
    const resp = await axios.get(`${process.env.API_URL}/characters`);
    let totalPages = Math.ceil(resp.data.length / 10);
    res.locals.pages = totalPages;
    res.locals.data = resp.data;
    next();
  } catch (err) {
    console.error(chalk.red(err));
    res
      .status(500)
      .send(
        response("Error occoured while fetching data from API", null, null)
      );
  }
};
const cacheSet = async (req, res, next) => {
  if (res.locals.data !== undefined) {
    //setting cache
    await res.locals.client.set(
      "characters",
      JSON.stringify(res.locals.data),
      (err, reply) => {
        if (err) {
          console.error(chalk.yellow(err));
        }
        console.log(chalk.green(reply));
      }
    );
  }
  let rep = res.locals.data;
  //paginating resposne from API
  if (req.params.pgno !== "all") {
    //pgno starting from 0
    let from = parseInt(req.params.pgno) * 10;
    let to = (parseInt(req.params.pgno) + 1) * 10;
    rep = rep.slice(from, to);
  }
  rep = rep.map((i) => {
    return {
      char_id: i.char_id,
      name: i.name,
      occupation: i.occupation,
      birthday: i.birthday,
      status: i.status,
      img: i.img,
    };
  });
  console.log("rep: ", rep);
  res
    .status(200)
    .send(
      response(
        "Operation Succedded in fetching from API",
        res.locals.pages,
        rep
      )
    );
};
router.get("/:pgno", cacheGet, fetchInfoAPI, cacheSet);
module.exports = router;
