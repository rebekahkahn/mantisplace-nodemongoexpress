const express = require("express");
const Mantis = require("../models/mantis");

const mantisRouter = express.Router();

mantisRouter
  .route("/")
  .get((req, res, next) => {
    Mantis.find() //find all mantis documents in Mantis collection; return array of objects
      .then((mantises) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(mantises);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Mantis.create(req.body) //create mantis document from req body; returns new mantis doc as an object
      .then((mantis) => {
        console.log("Mantis Created ", mantis);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(mantis);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    //PUT operation not supported on this endpoint
    res.statusCode = 403;
    res.end("PUT operation not supported on /mantises");
  })
  .delete((req, res, next) => {
    Mantis.deleteMany() //delete every doc in Mantis collection; returns obj w/ data on # docs deleted
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

mantisRouter
  .route("/:mantisId")
  .get((req, res, next) => {
    Mantis.findById(req.params.mantisId) //find a mantis doc by its ID; returns a mantis doc as an object
      .then((mantis) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(mantis);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    //POST not supported on this endpoint
    res.statusCode = 403;
    res.end(`POST operation not supported on /mantises/${req.params.mantisId}`);
  })
  .put((req, res, next) => {
    Mantis.findByIdAndUpdate(
      //update a specific mantis doc by its ID, returns modified mantis doc as an object
      req.params.mantisId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((mantis) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(mantis);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Mantis.findByIdAndDelete(req.params.mantisId) //delete mantis doc by its ID, returns doc that was deleted as an object
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = mantisRouter;
