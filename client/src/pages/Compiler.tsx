import { useDispatch } from "react-redux";
import CodeEditor from "../components/CodeEditor";
import CodeHelpers from "../components/CodeHelpers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import RenderCode from "../components/RenderCode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { updateFullCode } from "../redux/slice/CompilerSlice";
import { toast } from "sonner";
const Compiler = () => {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const fetchCode = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/compiler/code`, {
        url: urlId,
      });
      dispatch(updateFullCode(response.data.fullCode));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 500) {
          toast("Invalid URL, Default code loaded");
        }
      }
    }
  };

  useEffect(() => {
    if (urlId) {
      fetchCode();
    }
  }, [urlId]);

  // const html = useSelector((state: RootState) => state.compilerSlice.html);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="h-[calc(100vh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <CodeHelpers />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-calc(100vh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;
