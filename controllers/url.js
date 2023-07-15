const validateUrl = require("../config/regex");
const URLSchema = require("../models/UrlSchema");
// const { nanoid } = require("nanoid");

module.exports = {
  url: async (req, res) => {
    // * Generate a unique URL ID with nanoid
    //! const urlId = nanoid();

    const { originalUrl } = req.body;
    try {
      if (originalUrl) {
        console.log(validateUrl(originalUrl));
      } else {
        console.log("Input a URL");
      }
      console.log(originalUrl);
    } catch (err) {
      console.log(err);
    }
  },
};
