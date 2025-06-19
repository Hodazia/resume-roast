"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfparse = require("pdf-parse");
const dotenv_1 = __importDefault(require("dotenv"));
const aigenerate_1 = require("./aigenerate");
dotenv_1.default.config();
const app = express();
// allow requests from everywhere to hit this backend server
app.use(cors());
// allow json type data in the backend api post request
app.use(express.json());
// multer is used to handle file uploads 
/*all the upoloaded files will be stored in localStorage RAM and the filesize would be 8MB */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 8 * 1024 * 1024, //file size is of 8 MB
    }
});
//simple get endpoint to know whether the server is running
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});
app.post("/resume/roast", upload.single("resume"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        // the pdf file should be parsed
        const pdfData = yield pdfparse(req.file.buffer);
        const resumeContent = pdfData.text;
        const roast = yield (0, aigenerate_1.ai_generate_roast)(resumeContent);
        res.status(200).json({
            message: "Resume has been received successfully",
            roast
        });
    }
    catch (error) {
        console.log("error processing the resume file");
        res.status(500).json({
            message: "Resume processing error"
        });
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
