import express, { Request ,Response } from "express";
import { login, logOut, signUp, getMe } from "../controllers/auth.controller";
import protectedRoute from "../middlewares/protectRoute";

const router = express.Router();


// Profile Route To check if connected or not
router.get("/getme",protectedRoute ,getMe)
// Login Route
router.post("/login", login);  
// Log out  Route
router.post("/logout", logOut);
// Register
router.post("/signup", signUp);  

export default router