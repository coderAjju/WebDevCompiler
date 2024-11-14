import { codeModel } from "../models/code.js";

const saveCode = async (req, res) => {
  const { fullCode } = req.body;

  try {
    const newCode = await codeModel.create({ fullCode: fullCode });
    return res.status(201).send({ url: newCode._id, status: "saved" });
  } catch (error) {
    return res.status(500).send({ message: "error saving code", error });
  }
};

export default saveCode;
