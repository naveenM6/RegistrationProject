const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const dbPath = path.join(__dirname, 'registrations.db');

const app = express();
app.use(express.json());

let db = "";

const intializingDatabase = async (req, res) =>{
    try{
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database
        });
        app.listen(5004,() => {
            console.log("Server started at http://localhost:5004/");
        })
    }catch(e){
        console.log(`error ${e.message}`);
        process.exit(1);
    }
}

intializingDatabase();

app.get("/", async (req, res) => {
    const query = "select * from registration";
    const allRegistrations = await db.all(query);
    res.send(allRegistrations)
})

app.post("/",async (req, res) => {
    const {Name,Email,Mobile,DOB,JobType} = req.body;
    const selectUserQuery = `SELECT * FROM registration WHERE Name = '${Name}' and Mobile = '${Mobile}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        const query = `INSERT INTO 
        registration (Name,Email,Mobile,DOB,JobType)
        VALUES ('${Name}',
            '${Email}',
            '${Mobile}',
            '${DOB}',
            '${JobType}')`;
        const response = await db.run(query);
        response.send("user created successfully");
    }else{
        res.status(400);
        res.send("User already exists");

    }
})