const validateUrl = require("../config/regex");
const URL = require("../models/UrlSchema");
const shortid = require("shortid");
require("dotenv").config({ path: "./config/.env" });
const base_url = process.env.BASE_URL;
module.exports = {
  // Create short URL function
  postUrl: async (req, res) => {
    try {
      // Get original url from request body
      const { originalUrl } = req.body;
      // Check if the URL is Valid Using Regex
      const isURLValid = validateUrl(originalUrl);
      if (isURLValid) {
        // Check if the url is already in the Database
        const urlInTheDatabase = await URL.find({ originalUrl: originalUrl });
        if (urlInTheDatabase.length > 0) {
          // respond with the already created document
          res.json(urlInTheDatabase[0]);
        } else {
          // Create a new document
          try {
            // Generate a unique URL ID with shortid
            const id = shortid.generate();
            // Create the short URL
            const shortUrl = `${base_url}/${id}`;
            // create new document in the database
            await URL.create({
              originalUrl,
              shortUrl,
              urlId: id,
              clicks: 0,
              date: new Date(),
            });
            // Respond with the same object
            res.json({
              originalUrl,
              shortUrl,
              urlId: id,
              clicks: 0,
              date: new Date(),
            });
          } catch (err) {
            res.json({ message: err });
          }
        }
      } else {
        res.json({ message: "Please check the URL" }); // If the URL is invalid
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get URL function
  getUrl: async (req, res) => {
    const { urlId } = req.params;
    try {
      const urlDocument = await URL.find({ urlId }); // Get the URL document with the same urlId as the Params
      if (urlDocument.length > 0) {
        const originalUrl = urlDocument[0].originalUrl; //Get original url from the found docuemnts
        // Redirect user to the original Link
        res.redirect(originalUrl);
      } else {
        res.status(404).json({ message: "Link not found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
