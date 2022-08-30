const route = require("express").Router();
const db = require("../shared/mongo");
const { MongoClient, ObjectId } = require("mongodb");

// Students Route

route.get("/", async (req, res) => {
    try {

        const student = await db.students.find().limit(4).toArray()

        res.json({ message: "fetched students data successfully", student });
    } catch (error) {
        console.log(error)
        res.json({ error: "Cannot fetch students data" })
    }

});


// 2) Write an API to create a Students


route.post("/", async (req, res) => {

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