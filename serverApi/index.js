"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
// require("dotenv").config();
const session = require("express-session");
const helmet = require("helmet");
const ExpressRateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");
const connectDB = require("./config/database");
const usersRoute = require("./routes/users");
const waterSourceRoute = require("./routes/water-sources");
const meetingsRouter = require("./routes/meetings");
const requiredAuthentication = require("./middlewares/authenticateUser");
const loadUser = require("./middlewares/loadUser");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 8000;
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ "Access-Control-Allow-Origin": "*" }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "session",
    keys: ["key1", "key2"],
    secret: "youhavethatkindnessofhearttogive",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    maxAge: new Date(Date.now() + 60 * 60 * 1000),
  })
);

// app.use(helmet()) || app.disable("x-powered-by");

let apiLimiter = new ExpressRateLimit({
  store: new MongoStore({
    uri: "mongodb://localhost:27017/myApi",
    // user: "mongodbuser",
    // password: "mongodbpassword",
    expireTimeMs: 15 * 60 * 1000,
    errorHandler: console.error.bind(null, "rate-limit-mongo"),
  }),
  max: 100,
  // should match expireTimeMs
  windowMs: 15 * 60 * 1000,
});

app.use(apiLimiter);
// app.use(loadUser);
//Only users that have aunthentication can access routes with '/users/*'
// app.all("/users/*", requiredAuthentication(loadUser), loadUser);

app.use("/water-management-users/api/v1", usersRoute);
app.use("/water-management/api/v1", waterSourceRoute);
app.use("/water-management-meetings/api/v1", meetingsRouter);

app.get("/", (req, res) => {
  console.log("SERVER IS UP!!");
  res.send("Hello to from the Homepage");
});

//Connect and start the database
const start = async () => {
  try {
    // await connectDB();
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  } catch (error) {
    console.error(error, "CONNECTION TROUBLE TO THE DATABASE");
  }
};

start();
