const express = require('express');

const professionalController = require("../controllers/professional");

const router = express.Router();

router.get("/contacts", professionalController.getData);

module.exports = router;