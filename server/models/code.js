import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
});

export const codeModel = mongoose.model("code", CodeSchema);
