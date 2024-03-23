import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-zinc-300 p-2 shadow-md">
      <div className="flex items-center gap-2">
        <img src={Logo} className="size-12 hidden md:inline" />
        <h1 className="font-bold text-2xl">FieldFinder</h1>
      </div>

      <form className="flex bg-zinc-100 py-3 px-4 rounded-2xl items-center">
        <input
          type="text"
          placeholder="Suchen..."
          className="bg-transparent focus:outline-none"
        />
        <FaSearch />
      </form>

      <ul className="flex gap-4 text-xl font-semibold">
        <li className="hidden md:inline hover:underline">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="hidden md:inline hover:underline">
          <Link to={"/about"}>Über uns</Link>
        </li>
        <li>
          <Link to={"/sign-in"}>Anmelden</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
