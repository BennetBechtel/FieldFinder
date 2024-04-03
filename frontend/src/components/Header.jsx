import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="flex items-center justify-between bg-zinc-300 p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <Link to={"/"}>
          <img src={Logo} className="size-10" />
        </Link>
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">FieldFinder</h1>
        </Link>
      </div>

      <span className="flex gap-5 text-xl font-semibold">
        {isLoggedIn ? (
          <>
            <Link to={"/bookings"} className="hidden hover:underline sm:inline">
              Meine Buchungen
            </Link>
            <Link to={"#"} className="hidden hover:underline sm:inline">
              Meine Hallen
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
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
