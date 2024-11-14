import express from "express";
import saveCode from "../controllers/compilerController.js";
import getCode from "../controllers/loadingController.js";

const compilerRouter = express.Router();

compilerRouter.post("/save", saveCode);
compilerRouter.post("/code", getCode);

export default compilerRouter;
