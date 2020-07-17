//import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const colors = require("colors");
dotenv.config({ path: "./config/config.env" });
require("./config/db");

// init application
const app = express();

//body Parser
app.use(express.json());

// init file upload
app.use(fileUpload());

// implement req logger for development mood
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// start server Configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `we are in ${process.env.NODE_ENV} mood and port is ${process.env.PORT}`
      .yellow.bold
  )
);

//unhandle process probelm
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
