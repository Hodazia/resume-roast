const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfparse = require("pdf-parse")
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
import { ai_generate_roast } from './aigenerate';
dotenv.config();

const app = express();

// allow requests from frontend to hit this backend server
// app.use(cors({ //  Vercel frontend URL
//     methods: ["GET", "POST"],
//     credentials: false 
//   }));

app.use(cors());

// allow json type data in the backend api post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

        // Get additional options from the form
        const intensity = req.body.intensity || 'medium';
        const persona = req.body.persona || 'hr';
        let sections: string[] = [];
        try {
            sections = JSON.parse(req.body.sections || '[]');
        } catch (e) {
            sections = [];
        }

        // Pass these to the AI roast generator
        const roastResult  = await ai_generate_roast(resumeContent, { intensity, persona, sections });

        res.status(200).json({
            message: "Resume has been received successfully",
            roast: roastResult.content // Only the roast string
        })
    }
    catch(error)
    {
        console.log("error processing the resume file", error)
        res.status(500).json({
            error:"Resume processing error"
        })
    }
    }
)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

