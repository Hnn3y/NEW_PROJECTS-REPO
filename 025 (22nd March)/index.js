import inquirer from "inquirer";
import bodyParser from "body-parser";
import qr from "qr-image";
import express from "express";

import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var qrLocker = "";

app.use(bodyParser.urlencoded({ extended: true}));

function Locker(req, res, next) {
    console.log(req.body);
    qrLocker = req.body["file"] + req.body["expiration"];
    next();
}

app.use(Locker);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/upload", (req, res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
});