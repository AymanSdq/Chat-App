import express from "express";
import authRoutes from "./routes/auth.route";
import messagesRoutes from "./routes/messages.route";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);


const PORT = process.env.PORT || 2345;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});