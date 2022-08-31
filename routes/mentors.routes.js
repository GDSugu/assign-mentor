const route = require("express").Router();

const db = require("../shared/mongo");

const { ObjectId } = require("mongodb");


// 1) write an API to create a Mentor 

route.post("/postmentors", async (req, res) => {
    try {
        const insertingData = await db.mentors.insertOne(req.body);
        res.json({ message: "Inserted data successfully", insertingData })
    } catch (err) {
        console.log(err);
        res.json({ error: "Cannot post mentors data" })
    }

});


// 3) write an API to assign student to mentor a Mentor 

route.put("/assignstudents/:name", async (req, res) => {
    try {

        const insertingData = await db.mentors.findOneAndUpdate({ name: (req.params.name) }, { $set: req.body })

        res.json({ message: "Inserted data successfully", insertingData })
    } catch (err) {
        console.log(err);
        res.json({ error: "cannot assign students to mentors" })
    }

});


// 5) Find all students for particular mentor

route.get("/list/:name", async (req, res) => {

    try {
        const users = await db.mentors.findOne({ name: (req.params.name) })
        res.json(users.students);
    } catch (error) {
        console.log(error)
        res.json({ error: "Cannot fetch students data for a particular mentor" })
    }

});





module.exports = route;