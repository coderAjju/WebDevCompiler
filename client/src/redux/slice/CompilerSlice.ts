import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
  currentCode: string;
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<html>
  <body>
    <h1>Made by Ajay Upadhyay</h1>
  </body>
</html>
    `,
    css: `
body{
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:darkslategray;
  color:white;
  font-family:monospace
}
    `,
    javascript: `//console.log("hello world")`,
  },
  currentLanguage: "html",
  currentCode: "",
};
const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateCurrentCode: (state, action: PayloadAction<string>) => {
      state.currentCode = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue, updateFullCode } =
  compilerSlice.actions;
