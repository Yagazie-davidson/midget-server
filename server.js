const express = require("express");
const app = express();
const connectDB = require("./config/database");
// const homeRoutes = require("./routes/home");
const urlRoutes = require("./routes/url");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Run function to connect to the Database
//! connectDB();

// app.use("/", homeRoutes);
app.use("/api", urlRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
