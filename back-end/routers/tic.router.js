const express = require("express");
const ticRouter = express.Router();
const {
  getArr,
  postNewData,
  resetData,
  checkWinner,
} = require("../controllers/tic.controller");
ticRouter.route("/").get(getArr).post(resetData);
ticRouter.route("/:id").patch(postNewData);
ticRouter.route("/winner").get(checkWinner);

module.exports = ticRouter;
