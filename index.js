// IMPORT LIBRARY EXPRESS
const express = require('express');
// IMPORT LIBRARY CORS
const cors = require('cors');
// IMPORT LIBRARY SQL DATABASE
const mysql = require('mysql');
// INSTANCE OBJECTS FROM EXPRESS
const app = express();
app.use(express.json());
app.use(cors());
// CONNECT WITH DATABASE
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'student',
})
app.get("/" , (req, res) => {
    res.send("Welcome to the Student")
})
app.post('/create', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const age = req.body.age
    const gender = req.body.gender
    const query = 'INSERT INTO info (name, email, age, gender) VALUES (?, ?, ?, ?)';
    const values = [
        name,
        email,
        age,
        gender
    ];
    db.query(query, values, (err) => {
        if (err) return res.status(404).json({ message: `Error creating student ${err}` });
        return res.status(200).json({ success: "Success adding student" });
    })
})
app.get("/getAll", (req, res) => {
    const query = 'SELECT * FROM `info`';
    db.query(query, (err, result) => {
        if (err) return res.status(404).json({ message: `Error get student ${err}` });
        return res.status(200).json(result);
    })
})
app.get("/getSingle/:id", (req, res) => {
    const query = 'SELECT * FROM `info` WHERE id = ?';
    const id = req.params.id;
    const value = [id];
    db.query(query, value, (err, result) => {
        if (err) return res.status(404).json({ message: `Error get student ${err}` });
        return res.status(200).json(result);
    })
})
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM info WHERE id = ?";
    const value = [id];
    db.query(query, value, (err, result) => {
        if (err) return res.status(404).json({ message: `Error deleted student ${err}` });
        return res.status(200).json({ success: "Success deleted student" });
    });
})
app.put("/edit/:id", (req, res) => {
    const query = 'UPDATE info SET name = ? , email = ? , age = ? , gender = ? WHERE id = ?';
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.params.id
    ];
    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(404).json({ message: `Error Editing student: ${err}` });
        }
        return res.status(200).json({ success: "Success Editing student" });
    });
});



// LISTEN TO SERVER
app.listen(5000, () => {
    console.log("listening on port" + 5000)
})
