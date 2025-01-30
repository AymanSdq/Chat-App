import express, { Request ,Response } from "express";

const router = express.Router();

router.get("/conversation", ( request : Request, response : Response) => {
    response.status(202).send("conversation Route")
})  


export default router