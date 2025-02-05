import express, { Request ,Response } from "express";
import protectedRoute from "../middlewares/protectRoute";
import { sendMessage, getMessages } from "../controllers/message.controller";

const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage)
router.get("/:id", protectedRoute, getMessages)


export default router