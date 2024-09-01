import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import { connectDB } from "./data/database.js";

dotenv.config();

const app = express();
// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  cors({
    origin: [
      "https://todo-rtk-query-blush.vercel.app",
      "http://localhost:5173",
      "*",
    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Using routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
// app.get("/", (req, res) => {
//   res.send("Nice working");
// });
app.get("*", (req, res) => {
  res.send("Welcome to todoApp");
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});

// Using Error Middleware
app.use(errorMiddleware);

// Export the Express app
export default app;
