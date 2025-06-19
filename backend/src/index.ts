const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfparse = require("pdf-parse")
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
import { ai_generate_roast } from './aigenerate';
dotenv.config();

const app = express();

// allow requests from everywhere to hit this backend server
app.use(cors());

// allow json type data in the backend api post request
app.use(express.json());


// multer is used to handle file uploads 
/*all the upoloaded files will be stored in localStorage RAM and the filesize would be 8MB */
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:8*1024*1024, //file size is of 8 MB
    }
})


//simple get endpoint to know whether the server is running
app.get("/",(req:Request , res: Response)=>{
    res.status(200).json({message:"Server is running"});
})


app.post("/resume/roast",upload.single("resume"),async(req:Request,res:Response, next:NextFunction) : Promise <void>=>
    {
    try{
        if(!req.file){
            res.status(400).json({error:"No file uploaded"});
            return ;
        }

        // the pdf file should be parsed
        const pdfData = await pdfparse(req.file.buffer);
        const resumeContent = pdfData.text;

        const roast  = await ai_generate_roast(resumeContent);

        res.status(200).json({
            message: "Resume has been received successfully",
            roast
        })
    }
    catch(error)
    {
        console.log("error processing the resume file")
        res.status(500).json({
            message:"Resume processing error"
        })
    }
    }
)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

