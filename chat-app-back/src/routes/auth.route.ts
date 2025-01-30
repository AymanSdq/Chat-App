import express, { Request ,Response } from "express";
import { login, logOut, signUp } from "../controllers/auth.controller";

const router = express.Router();

// Login Route
router.post("/login", login);  
// Log out  Route
router.post("/logout", logOut);
// Register
router.post("/signup", signUp);  

export default router