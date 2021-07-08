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