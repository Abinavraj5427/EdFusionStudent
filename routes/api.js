const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://abigod:bubbles@cluster0.zetfo.mongodb.net/edfusion?retryWrites=true&w=majority";

//get if student is muted
router.post('/status', async (req, res, next) => {
    MongoClient.connect(uri)
    .then(async (mongo) => {
        console.log('Connected to database');
        console.log('Checking if status of student and class');
        // console.log(req.body);

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        await collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            if(classroom.length == 0) res.json({msg:'ended'});
            else if(classroom[0].finished) res.json({msg:'ended'});
            else{
                // console.log(classroom)
                var students = classroom[0].students;
                for(let i = 0; i< students.length; i++){
                    if(students[i].student_id === req.body.student_id){
                        res.json({msg:students[i].muted});
                        break;
                    }
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.json({msg:'ended'});
        });
        mongo.close();
    }).catch(err => {
        console.log(err)
        res.json({msg:'ended'});
    })
});


//add the student to classroom
router.post('/student', async (req, res, next) => {
    // console.log(req.body);
    MongoClient.connect(uri)
    .then(async (mongo) => {
        console.log('Adding Student to DB');

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        await collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            // console.log(classroom);
            // res.send(classroom[0]._id);
            var id = classroom[0]._id;
            var student_id = Math.floor(100000 + Math.random() * 900000);
            classroom[0].students.push({
                student_id: student_id,
                muted: true,
                confusion: 50
            })
            var update = {$set: {students: classroom[0].students}};
            collection.updateOne({_id: id}, update)
            .then(data => {
                var output = {
                    success: true,
                    code: req.body.code,
                    student_id: student_id,
                }
                res.json(output);
            }).catch(err => {console.log(err); res.json({success: false})})
        })
        .catch(err => {console.log(err); res.json({success: false})});
        mongo.close();   
    })
    .catch(function (err) {console.log(err); res.json({success: false})})
});


//asks question to classroom
router.post('/question', async (req, res, next) => {
    
    MongoClient.connect(uri)
    .then(async (mongo) => {
        console.log('Asking a question');

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        await collection.find({code: req.body.code}).toArray()
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
        mongo.close();  
    })
    .catch(function (err) {console.log(err)})
});

//add reviews to classroom
router.post('/rating', async (req, res, next) => {
    MongoClient.connect(uri)
    .then(async (mongo) => {
        console.log("Add the rating");

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        await collection.find({code: req.body.code}).toArray()
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
        mongo.close();
    })
    .catch(function (err) {console.log(err)})
});

//update confusion
router.post('/confusion', async (req, res, next) => {
    MongoClient.connect(uri)
    .then(async (mongo) => {
        console.log('Updating confusion');
        // console.log(req.body);

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        await collection.find({code: req.body.code}).toArray()
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
        mongo.close()
    }).catch(err => console.log(err))
});

//add reviews to classroom
router.post('/review', async (req, res, next) => {
    MongoClient.connect(uri)
    .then(async (mongo) => {
        console.log("Add the review");

        const collection = mongo.db("edfusion").collection("classrooms");
        //get classroom id
        await collection.find({code: req.body.code}).toArray()
        .then((classroom) => {
            console.log(classroom);
            // res.send(classroom[0]._id);
            var id = classroom[0]._id;
            classroom[0].reviews.push(req.body.review)
            var update = {$set: {reviews: classroom[0].reviews}};
            collection.updateOne({_id: id}, update)
            .then(data => {
                res.send("Sent rating successfully");
                // res.json(data)
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
        mongo.close();
    })
    .catch(function (err) {console.log(err)})
});

module.exports = router;