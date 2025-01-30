import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.route";
import messagesRoutes from "./routes/messages.route";
import dotenv from "dotenv";

dotenv.config();
const app = express();


// Routes that I should Use
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);


app.listen(2345, ()=> {
    console.log("Server On : http://localhost:2345")
})
