import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="flex justify-between items-center bg-zinc-300 p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <Link to={"/"}>
          <img src={Logo} className="size-10" />
        </Link>
        <Link to={"/"}>
          <h1 className="font-bold text-2xl">FieldFinder</h1>
        </Link>
      </div>

      <span className="flex gap-5 text-xl font-semibold">
        {isLoggedIn ? (
          <>
            <Link to={"/"} className="hidden sm:inline hover:underline">
              Home
            </Link>
            <Link to={"/bookings"} className="hidden sm:inline hover:underline">
              Meine Buchungen
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to={"/"} className="hidden sm:inline hover:underline">
              Home
            </Link>
            <Link to={"/login"} className="hover:opacity-75 active:opacity-65">
              Anmelden
            </Link>
          </>
        )}
      </span>
    </header>
  );
};

export default Header;
