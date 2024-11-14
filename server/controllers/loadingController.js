import { codeModel } from "../models/code.js";

const getCode = async (req, res) => {
  const { url } = req.body;
  try {
    const existingCode = await codeModel.findOne({ _id: url });
    if (!existingCode) {
      return res.json({ message: "code not found" });
    }
    return res.json({ fullCode: existingCode.fullCode });
  } catch (error) {
    return res.status(500).send({ message: "error saving code", error });
  }
};

export default getCode;
