import express, { Request ,Response } from "express";
import protectedRoute from "../middlewares/protectRoute";
import { sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage)


export default router