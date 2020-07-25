//module imports
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
// const path = require('path');

const app = express();

// const uri = "mongodb+srv://abigod:bubbles@cluster0.zetfo.mongodb.net/edfusion?retryWrites=true&w=majority";

// MongoClient.connect(uri)
// .then((mongo) => {
//     console.log('Connected to database');

//     const collection = mongo.db("edfusion").collection("classrooms");
//     const changeStream = collection.watch();

//     changeStream.on('change', function(change) {
//         console.log(change);
//     });
// })
// .catch(function (err) {console.log(err)})

//port
const PORT = 8080;

//middlewares
app.use(cors());
app.use(bodyparser.json());

//routes
const route_api = require('./routes/api');
app.use('/api', route_api);

app.listen(PORT, () => {
    console.log('Server started at port: '+ PORT);
});

