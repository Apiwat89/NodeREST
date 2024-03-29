const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

mongoose.connect(
    "mongodb://admin:QVNbpk99103@node57409-apiwattest.proen.app.ruk-com.cloud",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const Book = mongoose.model('book', {
    id: {
        type: Number,
        unique: true,
        required: true
    },
    title: String,
    author: String
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/books", async (req, res) => {
    try {
        const lastBook = await Book.findOne().sort({ id: -1});
        const nextId = lastBook ? lastBook.id + 1 : 1;

        const book = new Book({
            id: nextId,
            ...req.body,
        });

        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const books = await Book.findOne({id:req.params.id});
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put("/books/:id", async (req, res) => {
    try {
        const books = await Book.findOneAndUpdate({id:req.params.id}, req.body, {
            new: true,
        });
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
        const books = await Book.findOneAndDelete({id:req.params.id});
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});