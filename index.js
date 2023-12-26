require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || `localhost` || `127.0.0.1`;
const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;
const api = require("./routes/apiRouter")
const database = async() => {
    try{
        await mongoose.connect(dbURL,{
            useNewUrlParser: true,
            dbName: process.env.DB_NAME,
        });
        }        
        catch(error){
            console.log(error)
    }
};

database();

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection error: "));
db.once("open",()=>{
    console.log("Connected to DB Successfully");
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/v1",api);

app.listen(port, hostname, ()=>{
    console.log(`Server is running on port ${port}\n Development on ${hostname}`);
});