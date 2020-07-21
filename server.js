//import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const path = require("path");
const colors = require("colors");
dotenv.config({ path: "./config/config.env" });
require("./config/db");

//import routes
const accomodation = require("./routes/accomodation-service");
const liposuction = require("./routes/liposuction");
const hairTranspalent = require("./routes/hair-transpalent");
const imageUploading = require("./routes/image");
const popularDestination = require("./routes/popular-destination");
const tourismService = require("./routes/tourism-service");

// init application
const app = express();

// fix access to back-end
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//body Parser
app.use(express.json());

// init file upload
app.use(fileUpload());

// implement req logger for development mood
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// set static folder
app.use(express.static(path.join(__dirname, "/public")));

//mount routes
app.use("/api/upload", imageUploading);
app.use("/api/accomodation", accomodation);
app.use("/api/liposuction", liposuction);
app.use("/api/hair-transplant", hairTranspalent);
app.use("/api/popular-destination", popularDestination);
app.use("/api/tourism-service", tourismService);

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
