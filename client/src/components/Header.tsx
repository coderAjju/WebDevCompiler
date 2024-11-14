import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <h2 className="font-bold select-none cursor-pointer">Web Dev Compiler</h2>
      <ul className=" flex gap-2">
        <li>
          <Link to={"/compiler"}>
            <Button variant={"secondary"}>Compiler</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
