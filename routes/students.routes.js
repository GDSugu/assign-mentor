const route = require("express").Router();
const db = require("../shared/mongo");
const { MongoClient, ObjectId } = require("mongodb");


// 2) Write an API to create a Students


route.post("/poststudents", async (req, res) => {

    try {
        // let parsed=JSON.parse(req.body)
        // console.log(parsed);
        const insertingData = await db.students.insertOne(req.body);
        res.json({ message: "Inserted data successfully", insertingData })
    } catch (err) {
        console.log(err);
        res.json({ error: "cannot post the data" })
    }

});



// Assign mentors for particular student


route.post("/assignmentors/:name", async (req, res) => {
    try {

        const insertingData = await db.students.findOneAndUpdate({ name: (req.params.name) }, { $set: { mentors: req.body } })

        res.json({ message: "Inserted data successfully", insertingData })
    } catch (err) {
        console.log(err);
        res.json({ error: "cannot post the data" })
    }

});

module.exports = route;