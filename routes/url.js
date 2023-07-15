const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url");

router.post("/urlshort", urlController.url);

module.exports = router;
