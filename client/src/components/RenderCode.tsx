import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const RenderCode = () => {
  const fullCode = useSelector((state: RootState) => {
    return state.compilerSlice.fullCode;
  });
  const combineCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>`;

  const iframe = `data:text/html;charset=utf-8,${encodeURIComponent(
    combineCode
  )}`;

  return (
    <div className="bg-white border-2 border-gray-500 h-[calc(100vh-60px)]">
      <iframe src={iframe} className="w-full h-full"></iframe>
    </div>
  );
};

export default RenderCode;
