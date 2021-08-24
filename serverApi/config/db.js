// const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const dbName = "myApiDatabase";
const collection = "Courses";
const dbConnection = async () => {
  const hostURI = `mongodb://localhost:27017/${dbName}`;
  // `mongodb+srv://milimu:amisib</amisib>@apiclusters.tzvxk.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  //   const hostURI = `mongodb+srv://milimu:amisib@apiclusters.tzvxk.mongodb.net/${dbName}`;

  const options = {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  let course = {
    course: "bbit",
    duration: "8 semesters",
    tuition: "60000",
    approval: "iso certified",
    school: "computing and informatics",
    department: "enterprise computing",
    id: "2b597ba9-a151-4879-aad9-90119b941a6f",
  };
  const client = new MongoClient(hostURI, options);

  try {
    await client.connect();

    await client.db(dbName).createCollection(
      collection,
      {
        capped: true,
        size: 1e6,
      },
      (err, collection) => {
        if (err) {
          throw err;
        } else {
          collection.insertOne(course);
          console.log("Course saved");
        }
      }
    );

    console.log("Connected successfully to server");
  } catch (err) {
    console.log(err.stack);
    await client.close();
  } finally {
    return client;
  }
};

module.exports = dbConnection().catch(console.error);

// app.post("/stored", (req, res) => {
//   console.log(req.body);
//   db.collection("quotes").insertOne(req.body, (err, data) => {
//     if (err) return console.log(err);
//     res.send("saved to db: " + data);
//   });
// });

// app.post("/register", function (request, response) {
//   var username = request.body.username;
//   var password = request.body.password;
//   var email = request.body.email;
//   console.log("Post Received: %s %s %s", username, password, email);
// });
