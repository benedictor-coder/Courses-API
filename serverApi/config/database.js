"use strict";
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const database = "myApi";

const hostURI = `mongodb://localhost:27017/${database}`;
// `mongodb+srv://milimu:amisib</amisib>@apiclusters.tzvxk.mongodb.net/${dbName}?retryWrites=true&w=majority`;
//   const hostURI = `mongodb+srv://milimu:amisib@apiclusters.tzvxk.mongodb.net/${dbName}`;

const options = {
  keepAlive: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 0,
  keepAliveInitialDelay: 3000,
  writeConcern: 1,
  // auth: {
  //   user: "milimu",
  //   password: "amisib",
  // },
  autoReconnect: false,
  connectTimeoutMS: 10000,
  checkServerIdentity: true,
  heartbeatFrequencyMS: 10000,
  maxPoolSize: 20,
  minPoolSize: 10,
  monitorCommands: true,
  numberOfRetries: 10,
  native_parser: true,
};
const callback = (err) => {
  if (err) {
    console.error(err, "CONNECTION ERROR");
  }
  console.log("Connection Success");
};

const connectionString = `mongodb://localhost:27017/${database}`;

const connectDB = async () => {
  const conn = await mongoose.connect(hostURI, options, callback());
  // console.log(
  //   `MongoDB connected at ${conn.connection.host}: ${conn.connection.id + 1}`
  // );

  // const conn = await mongoose.createConnection(
  //   connectionString,
  //   options,
  //   callback()
  // );

  if (conn) {
    console.log(`Localhost connected`);
    console.log(
      `MongoDB connected at ${mongoose.connection.host}: ${mongoose.connection.id + 1}`
    );
  } else {
    conn.close(() => {
      console.log("CONNECTION CLOSED");
    });
  }

  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error", err);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("\nMongoose disconnected through app termination.\n");
      process.exit(0);
    });
  });
};

module.exports = connectDB;
