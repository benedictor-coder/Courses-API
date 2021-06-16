//import mongoose from 'mongoose';
const MongoClient = require('mongodb').MongoClient;

const dbConnection = async () => {
    const hostURI = "mongodb://localhost:27017/sample-api";

    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };

    const client = new MongoClient(hostURI, options, function (err, db) {

        if (err) throw err;

        db.collection("Users", function (err, collection) {
            collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
            collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
            collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' })

            db.collection('Persons').count(function (err, count) {
                if (err) throw err;

                console.log('Total Rows: ' + count);
            });
        })
    });

    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {

        await client.close();
    }

    return client;
};

module.exports = dbConnection().catch(console.error);