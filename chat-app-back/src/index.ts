import express from "express";
import authRoutes from "./routes/auth.route";
import messagesRoutes from "./routes/messages.route";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);


const PORT = process.env.PORT || 2345;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});