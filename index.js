const axios = require("axios")
const express = require("express");
const { config } = require("dotenv")
const mongo = require("./shared/mongo");

const studentsRoutes = require("./routes/students.routes");
const mentorsRoutes = require("./routes/mentors.routes");

const log = require("./shared/log");


// LOGIC FOR MONGO
const app = express();
config();

(async () => {
    try {
        await mongo.connect();

        // MAINTENANCE MIDDLEWARE

        app.use((_, res, next) => process.env.IS_MAINTENANCE === "true" ? res.send("Site is under Maintenance") : next());


        // PARSE REQUEST BODY AS JSON
        app.use(express.json());

        //LOGGING MIDDLEWARE

        app.use((req, _, next) => {
            log(new Date(), req.url, req.method);
            next();
        });


        // Resource Route
        app.use("/students", studentsRoutes);
        app.use("/mentors", mentorsRoutes);


        //Initialising the port 

        app.listen(process.env.PORT, () => log(`server listening at port ${process.env.PORT}`));


    } catch (err) {
        console.error(err)
    }

})();
