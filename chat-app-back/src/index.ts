import express, { Request, Response } from "express";

const app = express();


app.get("/", (req : Request , res : Response) => {
    res.status(202).send("Hello World!")
})


app.listen(2345, ()=> {
    console.log("Server On : http://localhost:2345")
})
