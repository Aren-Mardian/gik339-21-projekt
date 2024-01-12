const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./gik339.db");

const express = require("express");
const server = express();
const PORT = 3000;

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.get("/cars", (req, res) => {
  const sqlQuery = "SELECT * FROM cars";
  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Nu blev det fel", err);
      return;
    } else {
      res.send(rows);
    }
  });
});

server.get("/cars/:id", (req, res) => {
  const id = req.params.id;

  const sqlQuery = `SELECT * FROM cars WHERE id=${id}`;

  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Nu blev det fel", err);
    } else {
      res.send(rows[0]);
    }
  });
});

server.post("/cars", (req, res) => {
  const user = req.body;
  const sql = `INSERT INTO cars(brandmodel, yearmodel, mileage, registrationnumber, color, firstname, lastname, email, phonenumber) VALUES (?,?,?,?,?,?,?,?,?)`;

  db.run(sql, Object.values(user), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Nu blev det fel", err);
    } else {
      res.send("Bilen tilllagd");
    }
  });
});

server.put("/cars", (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const user = {
    brandmodel: bodyData.brandmodel,
    yearmodel: bodyData.yearmodel,
    mileage: bodyData.mileage,
    registrationnumber: bodyData.registrationnumber,
    color: bodyData.color,
    firstname: bodyData.firstname,
    lastname: bodyData.lastname,
    email: bodyData.email,
    phonenumber: bodyData.phonenumber,
  };

  let updateString = "";
  const columnsArray = Object.keys(user);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${user[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ",";
  });
  const sql = `UPDATE cars SET ${updateString} WHERE id=${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Bilen uppdaterades");
    }
  });
});

server.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM cars WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Bilen borttagen");
    }
  });
});
