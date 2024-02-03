const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS 설정
app.use(cors({ origin: "http://localhost:3000" }));

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "ezteam2",
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// 라우트 설정
app.get("/api/carbonFootprint", (req, res) => {
  // MySQL에서 데이터를 가져와 JSON 형식으로 응답
  connection.query("select * from carbon_footprint;", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json(results);
  });
});

app.get("/", (req, res) => res.send(`Hell'o World!`));

app.listen(port, () => console.log(`port${port}`));
