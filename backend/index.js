import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import { connectDB } from "./data/database.js";
import mongoose from "mongoose";
const PORT = process.env.port || 5000;
config({
  path: "./data/config.env",
});
const app = express();
// Using Middlewares

// app.use(
//   cors({
//     origin: "", // Your frontend URL
//     credentials: true, // Allow credentials (cookies) to be sent
//   })
// );
app.use(
  cors({
    origin: "https://todo-rtk-query-blush.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Using routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome to todoApp");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((c) => {
    console.log(`Database Connected with ${c.connection.host}`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
// Using Error Middleware
app.use(errorMiddleware);

// Export the Express app
export default app;
