import { Code, Copy, Loader2, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "../redux/slice/CompilerSlice";
import { RootState } from "../redux/store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
const CodeHelpers = () => {
  const { urlId } = useParams();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState(false);
  const navigate = useNavigate();
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode,
      });
      navigate(`/compiler/${response.data.url}`, { replace: true });
    } catch (error) {
      toast("something went wrong");
    } finally {
      setSaveLoading(false);
    }
  };

  const dispatch = useDispatch();
  const defaultLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between">
      <div className="__btn_container flex gap-1">
        <Button variant={"success"} onClick={handleSave} disabled={saveLoading}>
          <Save />
          {saveLoading ? (
            <>
              <Loader2 className=" animate-spin" /> Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2">
              <Share2 /> Share
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center gap-1">
                  <Code /> Share your code
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <input
                      type="text"
                      disabled
                      className="w-full px-2 py-2 rounded bg-slate-800 text-slate-400 select-none"
                      value={window.location.href}
                    />
                    <Button
                      variant="outline"
                      className="text-white"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL copied to your clipboard");
                      }}
                    >
                      <Copy />
                    </Button>
                  </div>
                  <p className="text-center">
                    Share this URL with your friend to collaborate
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="__tab_switcher flex justify-center gap-1 items-center">
        <small>Current Langugage:</small>
        <Select
          defaultValue={defaultLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[120px] bg-gray-800 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="javascript">Javascript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CodeHelpers;
