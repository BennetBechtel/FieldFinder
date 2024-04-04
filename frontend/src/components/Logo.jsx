import FieldFinderLogo from "../assets/FieldFinderLogo.png";
import { Link } from "react-router-dom";

const Logo = ({ closeNavbar }) => {
  return (
    <div className="flex items-center gap-2">
      <Link to={"/"} onClick={closeNavbar}>
        <img src={FieldFinderLogo} className="size-10" />
      </Link>
      <Link to={"/"} onClick={closeNavbar}>
        <h1 className="text-2xl font-bold">FieldFinder</h1>
      </Link>
    </div>
  );
};

export default Logo;
