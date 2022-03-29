const express = require("express");
const claimController = require("../controller/claimController");

const claimRouter = express.Router();

claimRouter.post("/claim", claimController.claimDoccument);

exports.claimRouter = claimRouter;
