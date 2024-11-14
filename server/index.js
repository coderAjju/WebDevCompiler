import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import compilerRouter from "./routes/compilerRouter.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/compiler", compilerRouter);

app.listen(4000, () => {
  dbConnect();
  console.log("server is listening on port 4000");
});
