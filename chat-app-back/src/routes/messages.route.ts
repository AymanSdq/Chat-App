import express, { Request ,Response } from "express";
import protectedRoute from "../middlewares/protectRoute";
import { sendMessage, getMessages, getConversations } from "../controllers/message.controller";

const router = express.Router();


router.get("/conversations", protectedRoute, getConversations);
router.get("/:id", protectedRoute, getMessages)
router.post("/send/:id", protectedRoute, sendMessage)

export default router