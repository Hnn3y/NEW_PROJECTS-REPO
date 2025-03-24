import multer from "multer";
import bodyParser from "body-parser";
import qr from "qr-image";
import express from "express";
import fs from "fs";

import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var qrLocker = "";

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "uploads");
        if(fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        } 
        cb(null, uploadPath);
    },
    
})

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