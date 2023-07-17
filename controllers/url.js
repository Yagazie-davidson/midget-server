const validateUrl = require("../config/regex");
const URL = require("../models/UrlSchema");
// const { nanoid } = require("nanoid");

module.exports = {
  url: async (req, res) => {
    // * Generate a unique URL ID with nanoid
    // const urlId = nanoid();
    // Get original url from request body
    try {
      const { originalUrl } = req.body;
      // Check if the URL is Valid Using Regex
      const isURLValid = validateUrl(originalUrl);
      if (isURLValid) {
        // Check if the url is already in the Database
        const urlInTheDatabase = await URL.find({ originalUrl: originalUrl });
        if (urlInTheDatabase.length > 0) {
          // respond with the already created document
          res.json({ orignal: urlInTheDatabase });
        } else {
          // Create a new document
          try {
            await URL.create({
              originalUrl: originalUrl,
              // shortUrl
              // urlId
              clicks: 0,
              date: new Date(),
            });
            // Respond with the same object
            res.json({
              originalUrl: originalUrl,
              // shortUrl
              // urlId
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
      res.json(err);
    }
  },
};
