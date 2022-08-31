const { MongoClient } = require("mongodb");
const log = require("./log");

const mongo = {
    db: null,  //DB connection string
    students: null,  //students connection
    mentors: null,      // mentorss connection

    async connect() {
        try {
            //Connecting to Mongo( server)
            const client = new MongoClient(process.env.MONGO_URL);
            await client.connect();

            // using await in order to wait utill it get response
            log("Mongo Connected Successfully");

            // Selecting the DB
            this.db = await client.db(process.env.MONGO_NAME);
            log(` Mongo database selected - ${process.env.MONGO_NAME}`);


            this.students = await this.db.collection("students");

            this.mentors = await this.db.collection("mentors");

            log("Mongo collections Initialized");

        } catch (err) {


            throw new Error(err);

        }
    }
}

module.exports = mongo;


