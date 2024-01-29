const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send(`Hell'o World!`));

app.listen(port, () => console.log(`port${port}`));
