const express = require('express');

const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Successfully connected to MongoDB")).catch((error)=>console.log("Couldn't connect to MongoDB"));

const todosSchema = new mongoose.Schema({
    todo: String,
    date: String,
    completed: Boolean
});

const Todos = mongoose.model('Todos', todosSchema);

const cors = require('cors');
app.use(cors());

// test
app.get('/', async(req, res) => {
    res.json("SERVER CONNECTED");
});

// add new todo
app.post("/add", async(req, res) => {
    let todo = new Todos(req.body);
    let result = await todo.save();
    res.send(result);
    console.log("TODO SUBMIT");
    console.log(result);
});

app.get('/list', async(req, res) => {
    try {
        const todos = await Todos.find({});
        console.log("TODO LIST LOADED");
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Todo
app.get('/delete/:id', async(req, res) => {
    console.log("delete");
    const id = req.params.id;
    try {
        const todo = await Todos.findOneAndDelete({_id: id});
        console.log("BOOKING " + id + " DELETED");
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete All Todo - Selected Date
app.get('/deleteall/:date', async(req, res) => {
    console.log("delete all");
    const date = req.params.date;
    try {
        const todo = await Todos.deleteMany({date: date});
        console.log("BOOKING ON " + date + " DELETED all");
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Edit Todo
app.get('/edit/:id/:todo', async(req, res) => {
    console.log("edit");
    const id = req.params.id;
    const newTodo = req.params.todo;
    try {
        const todo = await Todos.findOneAndUpdate({_id: id}, {todo: newTodo}, {new: true});
        console.log("TODO EDITED");
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Todo Completed - true
app.get('/completed/:id/true', async(req, res) => {
    console.log("completed");
    const id = req.params.id;
    try {
        const todo = await Todos.findOneAndUpdate({_id: id}, {completed: true}, {new: true});
        console.log("COMPLETED");
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Todo Completed - false
app.get('/completed/:id/false', async(req, res) => {
    console.log("completed");
    const id = req.params.id;
    try {
        const todo = await Todos.findOneAndUpdate({_id: id}, {completed: false}, {new: true});
        console.log("COMPLETED");
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(4000, () => {
    console.log("Console is running on port 4000");
});


