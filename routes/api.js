const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://abigod:bubbles@cluster0.zetfo.mongodb.net/edfusion?retryWrites=true&w=majority";

//get if student is muted
router.get('/muted', (req, res, next) => {
    MongoClient.connect(uri)
    .then((mongo) => {
        console.log('Connected to database');
        console.log('Checking if student is muted');
        console.log(req.body);

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            // console.log(classroom)
            var students = classroom[0].students;
            for(let i = 0; i< students.length; i++){
                if(students[i].student_id === req.body.student_id){
                    res.send(students[i].muted);
                    break;
                }
            }
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
});


//add the student to classroom
router.post('/student', (req, res, next) => {
    
    MongoClient.connect(uri)
    .then((mongo) => {
        console.log('Connected to database');
        console.log('Adding Student to DB');

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            // console.log(classroom);
            // res.send(classroom[0]._id);
            var id = classroom[0]._id;
            var student_id = Math.floor(100000 + Math.random() * 900000);
            classroom[0].students.push({
                student_id: student_id,
                muted: false,
                confusion: 50
            })
            var update = {$set: {students: classroom[0].students}};
            collection.updateOne({_id: id}, update)
            .then(data => {
                var output = {
                    code: req.body.code,
                    student_id: student_id,
                }
                res.json(output);
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
            
    })
    .catch(function (err) {console.log(err)})
});


//asks question to classroom
router.post('/question', (req, res, next) => {
    
    MongoClient.connect(uri)
    .then((mongo) => {
        console.log('Connected to database');
        console.log('Asking a question');

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            // console.log(classroom);
            // res.send(classroom[0]._id);
            var id = classroom[0]._id;
            classroom[0].questions.push({
                student_id: req.body.student_id,
                question: req.body.question
            })
            var update = {$set: {questions: classroom[0].questions}};
            collection.updateOne({_id: id}, update)
            .then(data => {
                res.send("Sent question successfully");
                // res.json(data)
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
            
    })
    .catch(function (err) {console.log(err)})
});

//add reviews to classroom
router.post('/rating', (req, res, next) => {
    MongoClient.connect(uri)
    .then((mongo) => {
        console.log("Add the rating");
        console.log('Asking a question');

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            console.log(classroom);
            // res.send(classroom[0]._id);
            var id = classroom[0]._id;
            classroom[0].ratings.push(req.body.rating)
            var update = {$set: {ratings: classroom[0].ratings}};
            collection.updateOne({_id: id}, update)
            .then(data => {
                res.send("Sent rating successfully");
                // res.json(data)
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
            
    })
    .catch(function (err) {console.log(err)})
    
});

//update confusion
router.post('/confusion', (req, res, next) => {
  
    MongoClient.connect(uri)
    .then((mongo) => {
        console.log('Connected to database');
        console.log('Updating confusion');
        console.log(req.body);

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            var id = classroom[0]._id;
            var students = classroom[0].students;
            for(let i = 0; i< students.length; i++){
                if(students[i].student_id === req.body.student_id){
                    students[i].confusion = req.body.confusion;
                }
            }
            console.log(students);
            var update = {$set: {students: classroom[0].students}};
            collection.updateOne({_id: id}, update)
            .then(data => {
                res.send("Successfully updated confusion");
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
    
});



module.exports = router;