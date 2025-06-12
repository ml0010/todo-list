const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Successfully connected to MongoDB")).catch((error)=>console.log("Couldn't connect to MongoDB"));

const todosSchema = new mongoose.Schema({
    todo: String,
    date: Date,
    completed: Boolean
});

const Todos = mongoose.model('Todos', todosSchema);

const cors = require('cors');
app.use(cors());

// test
app.get('/', async(req, res) => {
    res.json("SERVER CONNECTED");
});

app.post("/add", async(req, res) => {
    let todo = new Todos(req.body);
    let result = await todo.save();
    res.send(result);
    console.log("TODO SUBMIT");
    console.log(result);
});

app.listen(4000, () => {
    console.log("Console is running on port 6000");
});


