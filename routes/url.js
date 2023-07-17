const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url");

router.post("/urlshort", urlController.postUrl);
router.get("/:urlId", urlController.getUrl);

module.exports = router;
