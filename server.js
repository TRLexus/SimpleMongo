const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

// MongoDB connection string (replace with your MongoDB connection details)
const mongoURI = "mongodb://localhost:27017";
const dbName = "booksdb";

MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }

    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("books");

    // API to get all books
    app.get("/api/books", (req, res) => {
        collection.find().toArray((err, books) => {
            if (err) {
                console.error("Error fetching books:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(books);
        });
    });

    // API to add a book
    app.post("/api/add", (req, res) => {
        const { title, author } = req.body;
        collection.insertOne({ title, author }, (err, result) => {
            if (err) {
                console.error("Error adding book:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json({ success: true });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
