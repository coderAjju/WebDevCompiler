import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { tags as t } from "@lezer/highlight";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useCallback } from "react";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateCodeValue } from "../redux/slice/CompilerSlice";

const CodeEditor = () => {
  const dispatch = useDispatch();

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const defaultLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const onChange = useCallback((value: string) => {
    dispatch(updateCodeValue(value));
  }, []);
  return (
    <ReactCodeMirror
      value={fullCode[defaultLanguage]}
      height="calc(100vh - 110px)"
      extensions={[loadLanguage(defaultLanguage)]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
};
export default CodeEditor;
